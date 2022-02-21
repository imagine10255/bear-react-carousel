import * as React from 'react';
import {calcSingleAspectRatio, getMediaInfo, getMediaRangeSize, getSlideDirection, getTranslateParams} from './utils';
import {uuid} from 'bear-jsutils/key';
import {checkIsMobile} from 'bear-jsutils/browser';
import log from 'bear-jsutils/log';
import {deepCompare, isNotEmpty} from 'bear-jsutils/equal';
import {EDirection, EHorizontal, IBearCarouselProps, IBreakpointSettingActual, IInfo, ITouchStart} from './types';
import elClassName from './el-class-name';
import {BearCarouselProvider} from './BearCarouselProvider';

import './styles.css';


// Swipe trigger movement distance
const triggerTouchDistance = 60;

// debug log switch
const logEnable = {
    componentDidMount: true,
    componentWillUnmount: true,
    shouldComponentUpdate: true,
    onMobileTouchStart: true,
    onMobileTouchMove: true,
    onMobileTouchEnd: true,
    onWebMouseStart: true,
    onWebMouseMove: false,
    onWebMouseEnd: true,
    elementMove: false,
    elementMoveDone: false,
    checkAndAutoPlay: true,
    resetPosition: true,
    handleResize: true,
    handleResizeDiff: true,
    goToActualIndex: true,
};

interface IState {
  windowSize: number,
}

const isMobile = checkIsMobile();


class BearCarousel extends React.Component<IBearCarouselProps, IState> {
  static defaultProps = {
      data: [],
      slidesPerView: 1,
      slidesPerGroup: 1, // 不可為小數
      moveTime: 500,
      breakpoints: {},
      isCenteredSlides: false,
      isEnableLoop: false,
      isEnablePagination: false,
      isEnableNavButton: false,
      isEnableMouseMove: true,
      isEnableAutoPlay: false,
      isGPURender: true,
      isDebug: false,
      spaceBetween: 0,
      autoPlayTime: 5000
  };

  _carouselId = `bear-react-carousel_${uuid()}`;

  timer?: any;
  activePage = 0;        // real page location
  activeActualIndex = 0; // real item index location
  info: IInfo = {
      formatElement: [],
      sourceTotal: 0, // Total number of sources
      // 從0開始
      element: {
          total: 0,
          firstIndex: 0,
          lastIndex: 0
      },
      // 0 is the actual starting position (a negative number forward), and the ending value is the last ending position
      actual: {
          minIndex: 0,
          maxIndex: 0,
          firstIndex: 1,
          lastIndex: 1
      },
      // 總頁數
      pageTotal: 0,
      residue: 1,
      isVisiblePagination: false,
      isVisibleNavButton: false
  };


  rwdMedia: IBreakpointSettingActual = {
      slidesPerView: 1,
      slidesPerViewActual: 1,
      aspectRatio: undefined,
      slidesPerGroup: 1,
      spaceBetween: 0,
      isCenteredSlides: false,
      isEnableLoop: false,
      isEnablePagination: true,
      isEnableNavButton: true,
      isEnableMouseMove: true,
      isEnableAutoPlay: false,
  };

  touchStart: ITouchStart = {
      pageX: 0,
      pageY: 0,
      x: 0,
      y: 0,
      movePositionX: 0,
      movePositionY: 0
  };
  state = {
      windowSize: 0
  };

  // Ref
  rootRef: React.RefObject<HTMLDivElement> = React.createRef();
  containerRef: React.RefObject<HTMLDivElement> = React.createRef();
  slideItemRefs: React.RefObject<Array<HTMLDivElement>> = React.createRef();
  pageRefs: React.RefObject<Array<HTMLDivElement>> = React.createRef();

  constructor(props: IBearCarouselProps) {
      super(props);

      // @ts-ignore
      this.slideItemRefs['current'] = [];
      // @ts-ignore
      this.pageRefs['current'] = [];

      const {rwdMedia, info} = getMediaInfo(props);
      this.rwdMedia = rwdMedia;
      this.info = info;
      this.state = {
          windowSize: getMediaRangeSize(Object.keys(props.breakpoints))
      };

  }


  componentDidMount() {
      if(this.props.isDebug && logEnable.componentDidMount) log.printInText('[componentDidMount]');

      const containerRef = this.containerRef?.current;
      if (containerRef) {
          // Check and turn on automatic rotation
          this._checkAndAutoPlay();

          // Move to the correct position for the first time
          if(this.info.pageTotal > 0){
              this.goToPage(1, false);
          }

          // End of moving animation (Need to return to the position, to be fake)


          if (isMobile) {
              // When the window size is changed
              window.addEventListener('orientationchange', this._onOrientationchange, {passive: false});
              containerRef.addEventListener('touchstart', this._onMobileTouchStart, {passive: false});
          } else {
              // When the window size is changed (through throttling)
              window.addEventListener('resize', this._onResize, {passive: false});
              containerRef.addEventListener('mousedown', this._onWebMouseStart, {passive: false});
          }
      }

      this._handleSyncCarousel();

  }

  componentWillUnmount() {
      if(this.props.isDebug && logEnable.componentWillUnmount) log.printInText('[componentWillUnmount]');
      if (this.timer) clearTimeout(this.timer);

      const containerRef = this.containerRef?.current;
      if (containerRef) {
          if (isMobile) {
              window.removeEventListener('orientationchange', this._onOrientationchange, false);
              containerRef.removeEventListener('touchstart', this._onMobileTouchStart, false);
          } else {
              window.removeEventListener('resize', this._onResize, false);
              containerRef.removeEventListener('mousedown', this._onWebMouseStart, false);
          }

      }


  }


  /***
   * Optimized rendering
   * @param nextProps
   * @param nextState
   */
  shouldComponentUpdate(nextProps: IBearCarouselProps, nextState: IState) {

      const {windowSize: nextWindowSize} = nextState;
      const {windowSize} = this.state;
      const {data, setCarousel, renderNavButton, ...otherParams} = this.props;
      const {data: nextData, setCarousel: nextSetCarousel, renderNavButton: nextRenderNavButton, ...nextOtherProps} = nextProps;

      const oldKey = data.map((row) => row.key).join('_');
      const nextKey = nextData.map((row) => row.key).join('_');
      if (oldKey !== nextKey ||
      !deepCompare(otherParams, nextOtherProps) ||
      nextWindowSize !== windowSize
      ) {
          if(this.props.isDebug && logEnable.shouldComponentUpdate) log.printInText('[shouldComponentUpdate] true');

          const {rwdMedia, info} = getMediaInfo(nextProps);
          this.rwdMedia = rwdMedia;
          this.info = info;

          // reset page position
          const $this = this;
          setTimeout(() => {
              $this.goToPage(1, false);
          }, 0);

          this._handleSyncCarousel();

          return true;
      }

      return false;
  }


  /**
   * mobile phone finger press start
   * @param event
   */
  _onMobileTouchStart = (event: TouchEvent): void => {
      if(this.props.isDebug && logEnable.onMobileTouchStart) log.printInText('[_onMobileTouchStart]');

      if (this.timer) clearTimeout(this.timer);
      this._resetPosition();

      const containerRef = this.containerRef?.current;
      if (containerRef) {
          const movePosition = getTranslateParams(containerRef);

          // 紀錄位置
          this.touchStart = {
              pageX: event.targetTouches[0].pageX,
              pageY: event.targetTouches[0].pageY,
              x: event.targetTouches[0].pageX - movePosition.x,
              y: event.targetTouches[0].pageY - containerRef.offsetTop,
              movePositionX: movePosition.x,
              movePositionY: movePosition.y,
              moveDirection: undefined,
          };

          containerRef.addEventListener('touchmove', this._onMobileTouchMove, false);
          containerRef.addEventListener('touchend', this._onMobileTouchEnd, false);
      }
  };

  /**
   * Mobile phone finger press and move
   * @param event
   */
  _onMobileTouchMove = (event: TouchEvent): void => {

      const endX = event.targetTouches[0].pageX;
      const endY = event.targetTouches[0].pageY;


      const direction = getSlideDirection(this.touchStart.pageX, this.touchStart.pageY, endX, endY);
      if(typeof this.touchStart.moveDirection === 'undefined'){
          this.touchStart.moveDirection = direction;
      }
      if(this.props.isDebug && logEnable.onMobileTouchMove) log.printInText(`[_onMobileTouchMove] ${this.touchStart.moveDirection}`);


      // 判斷一開始的移動方向
      if(this.touchStart.moveDirection === EDirection.vertical){
          // 垂直移動
          // event.preventDefault();

      }else if(this.touchStart.moveDirection === EDirection.horizontal){
          // 水平移動
          event.preventDefault();

          const containerRef = this.containerRef?.current;
          if(containerRef){

              const moveX = containerRef.offsetLeft + event.targetTouches[0].pageX;
              this._elementMove(moveX);
          }
      }

  };

  /**
   * Mobile phone finger press to end
   * @param event
   *
   * PS: Add event.preventDefault(); will affect the mobile phone click onClick event
   */
  _onMobileTouchEnd = (event: TouchEvent): void => {
      if(this.props.isDebug && logEnable.onMobileTouchEnd) log.printInText('[_onMobileTouchEnd]');

      const containerRef = this.containerRef?.current;
      if (containerRef) {
          containerRef.removeEventListener('touchmove', this._onMobileTouchMove, false);
          containerRef.removeEventListener('touchend', this._onMobileTouchEnd, false);
      }
      this._elementMoveDone();
  };

  /**
   * Web mouse click
   * @param event
   */
  _onWebMouseStart = (event: MouseEvent): void => {
      if(this.props.isDebug && logEnable.onWebMouseStart) log.printInText('[_onWebMouseStart]');


      if (this.timer) clearTimeout(this.timer);
      this._resetPosition();

      const containerRef = this.containerRef?.current;
      if (containerRef) {
          const movePosition = getTranslateParams(containerRef);

          this.touchStart = {
              pageX: event.clientX,
              pageY: event.clientY,
              x: event.clientX - movePosition.x,
              y: event.clientY - containerRef.offsetTop,
              movePositionX: movePosition.x,
              movePositionY: movePosition.y
          };

          containerRef.addEventListener('mousemove', this._onWebMouseMove, false);
          containerRef.addEventListener('mouseup', this._onWebMouseEnd, false);
      }

  };


  /**
   * Web mouse movement
   * @param event
   */
  _onWebMouseMove = (event: MouseEvent):void => {
      if(this.props.isDebug && logEnable.onWebMouseMove) log.printInText('[_onWebMouseMove]');

      event.preventDefault();
      const moveX = event.clientX;

      this._elementMove(moveX);
  };

  /**
   * web mouse release
   * @param event
   */
  _onWebMouseEnd = (event: MouseEvent):void => {
      if(this.props.isDebug && logEnable.onWebMouseEnd) log.printInText('[_onWebMouseEnd]');

      event.preventDefault();

      const containerRef = this.containerRef?.current;
      if (containerRef) {
          containerRef.removeEventListener('mousemove', this._onWebMouseMove, false);
          containerRef.removeEventListener('mouseup', this._onWebMouseEnd, false);
      }

      this._elementMoveDone();
  };


  /**
   * final move execution
   * @param moveX Move the X-axis
   */
  _elementMove = (moveX: number): void => {
      if(this.props.isDebug && logEnable.elementMove) log.printInText('[_elementMove]');

      const containerRef = this.containerRef?.current;
      if (containerRef && this.rwdMedia.isEnableMouseMove && this.slideItemRefs.current) {
          // 取得移動限制
          const distance = {
              min: this._getMoveDistance(this.info.actual.minIndex),
              max: this._getMoveDistance(this.info.actual.lastIndex)
          };

          const translateX = moveX - this.touchStart.x;
          containerRef.style.transitionDuration = '0ms';
          containerRef.style.transform = `translate(${translateX}px, 0px)`;
      }


  };


  /**
   * The object movement ends (confirm the stop position and which Index position should be sucked)
   */
  _elementMoveDone = (): void => {
      if(this.props.isDebug && logEnable.elementMoveDone) log.printInText('[_elementMoveDone]');

      const containerRef = this.containerRef?.current;
      if (containerRef) {

          // get mobile location
          const movePosition = getTranslateParams(containerRef).x;

          // Confirmed travel distance
          const checkMove = movePosition - this.touchStart.movePositionX;

          // 取得移動限制
          const distance = {
              min: this._getMoveDistance(this.info.actual.minIndex),
              max: this._getMoveDistance(this.info.actual.lastIndex)
          };

          if (distance.min < movePosition && !this.rwdMedia.isEnableLoop) {
              this.goToPage(1);

          } else if (distance.max > movePosition && !this.rwdMedia.isEnableLoop) {
              this.goToPage(this.info.pageTotal);

          } else if (checkMove <= triggerTouchDistance && checkMove >= -triggerTouchDistance) {
              this.goToActualIndex(this.activeActualIndex);

          } else if (checkMove >= -triggerTouchDistance) {
              if(this.rwdMedia.slidesPerView === 'auto'){
                  this.toPrev();
              }else{
                  this.goToActualIndex(this._getPageByPosition(movePosition, EHorizontal.left));
              }

          } else if (checkMove <= triggerTouchDistance) {

              if(this.rwdMedia.slidesPerView === 'auto'){
                  this.toNext();
              }else{
                  this.goToActualIndex(this._getPageByPosition(movePosition, EHorizontal.right));
              }

          }

      }

  };





  /**
   * Check and autoplay feature
   */
  _checkAndAutoPlay = (): void => {
      const {autoPlayTime} = this.props;
      if(this.props.isDebug && logEnable.checkAndAutoPlay) log.printInText(`[_checkAndAutoPlay] autoPlayTime: ${autoPlayTime}`);


      // Clear the last timer
      if (this.timer) {
          clearTimeout(this.timer);
      }

      if (this.rwdMedia.isEnableLoop && this.rwdMedia.isEnableAutoPlay && autoPlayTime > 0 && this.info.pageTotal > 1) {
          this.timer = setTimeout(() => {
              this.toNext();
          }, autoPlayTime);
      }
  };


  /**
   * reset page position (LoopMode)
   *
   * PS: If the element is isClone then return to the position where it should actually be displayed
   */
  _resetPosition = (): void => {
      if(this.props.isDebug && logEnable.resetPosition) log.printInText('[_resetPosition]');

      const formatElement = this.info?.formatElement ? this.info.formatElement : [];

      if (formatElement[this.activeActualIndex].isClone) {
          this.goToActualIndex(formatElement[this.activeActualIndex].matchIndex, false);
      }
  };


  /**
   * When dealing with changing screen size
   */
  _onResize = () => {
      const {breakpoints} = this.props;
      const {windowSize} = this.state;
      if(this.props.isDebug && logEnable.handleResize) log.printInText(`[_handleResize] windowSize: ${windowSize}px`);

      const selectSize = getMediaRangeSize(Object.keys(breakpoints));

      // 只在區間內有設定的值才會 setState
      if (windowSize !== selectSize) {
          if(this.props.isDebug && logEnable.handleResizeDiff) log.printInText(`[_handleResize] diff windowSize: ${windowSize} -> ${selectSize}px`);
          this.setState({
              windowSize: selectSize
          });
      }else{
          this.goToPage(1, false);
      }
  };

  /**
   * When dealing with changing screen size
   */
  _onOrientationchange = () => {
      const {breakpoints} = this.props;
      const {windowSize} = this.state;

      // @ts-ignore
      if(this.props.isDebug && logEnable.handleResize) log.printInText('[_onOrientationchange] ');

      const selectSize = getMediaRangeSize(Object.keys(breakpoints));
      if (windowSize !== selectSize) {
          this.setState({
              windowSize: selectSize
          });
          if(this.props.isDebug && logEnable.handleResize) log.printInText('[_onOrientationchange] set windowSize');

      }else{
          if(this.props.isDebug && logEnable.handleResize) log.printInText('[_onOrientationchange] goToPage 1');
          setTimeout(() => {
              this.goToPage(1, false);
          }, 400);

      }


  };

  /**
     * get Page By Position
     * not support auto width
     */
  _getPageByPosition = (position: number, horizontal: EHorizontal):number => {
      const oneSlideItemMoveX = this._getMoveDistance(1);
      let defaultPage = 1;

      if(horizontal === EHorizontal.left){
          defaultPage = Math.floor(position / oneSlideItemMoveX);

      }else{
          defaultPage = Math.ceil(position / oneSlideItemMoveX);
      }

      return defaultPage;
  };

  /**
   * get next page
   */
  getNextPage = (): number => {
      return this.activePage + 1;
  };

  /**
   * Get the first item on the next page
   */
  getNextPageFirstIndex = (): number => {
      if (this.rwdMedia.isCenteredSlides) {
          return this.activeActualIndex + this.rwdMedia.slidesPerGroup;
      }
      // Avoid trailing whitespace
      return this.activeActualIndex + this.rwdMedia.slidesPerViewActual;
  };

  /**
   * Get the maximum Index
   */
  getMaxIndex = (): number => {
      return this.info.formatElement.length - 1;
  };

  /**
   * Get virtual index
   */
  checkActualIndexInRange = (slideIndex: number): boolean => {
      return slideIndex <= this.info.actual.maxIndex && slideIndex >= this.info.actual.minIndex;
  };


  /**
   * go to next page
   */
  toNext = (): void => {

      const nextPage = this.getNextPage();
      let index = this.activeActualIndex; // The default is to return to the original position (useful for swipe movement)



      const formatElement = this.info?.formatElement ? this.info.formatElement : [];

      if (formatElement[this.activeActualIndex].isClone) {
          this.goToActualIndex(formatElement[this.activeActualIndex].matchIndex, false);
          this.goToActualIndex(this.activeActualIndex + this.rwdMedia.slidesPerGroup);

      }else if (this.rwdMedia.isEnableLoop && nextPage > this.info.pageTotal && this.info.residue > 0) {
      // 若為Loop(最後一頁移動在不整除的時候, 移動位置需要復歸到第一個)
          this.goToActualIndex(this.activeActualIndex + this.info.residue);

      } else if (
          this.rwdMedia.slidesPerViewActual < this.info.formatElement.length &&
      this.getNextPageFirstIndex() <= this.getMaxIndex()
      ) {
      // 正常移動到下一頁
          this.goToActualIndex(this.activeActualIndex + this.rwdMedia.slidesPerGroup);

      }


  };

  /**
   * go to previous
   */
  toPrev = (): void => {
      let index = this.activeActualIndex; // 預設為回到原地 (對滑動移動有用)

      const formatElement = this.info?.formatElement ? this.info.formatElement : [];

      if (formatElement[this.activeActualIndex].isClone) {
          this.goToActualIndex(formatElement[this.activeActualIndex].matchIndex, false);
          this.goToActualIndex(this.activeActualIndex + this.rwdMedia.slidesPerGroup);

      } else if (this.rwdMedia.isEnableLoop && this.activePage === 1 && this.info.residue > 0) {
      // 檢查若為Loop(第一頁移動不整除的時候, 移動位置需要復歸到第一個)
          index = this.activeActualIndex - this.info.residue;
      } else if (this.rwdMedia.slidesPerViewActual < this.info.formatElement.length) {
      // 正常移動到上一個
          index = this.activeActualIndex - this.rwdMedia.slidesPerGroup;
      }
      this.goToActualIndex(index);
  };


  /**
   * go to page
   * ex: slideView: 2, slideGroup: 2, total: 4
   * page1 -> (1-1) * 2) + 1 + (firstIndex -1) = 1
   */
  goToPage = (page: number, isUseAnimation = true): void => {
      this.goToActualIndex(((page-1) * this.rwdMedia.slidesPerGroup) + 1 + (this.info.actual.firstIndex - 1), isUseAnimation);
  };

  /**
   * Sync Carousel state
   */
  _handleSyncCarousel = () => {
      if(this.props.setCarousel){
          this.props.setCarousel({
              goToPage: this.goToPage,
              info: this.info,
              activePage: this.activePage,
              activeActualIndex: this.activeActualIndex,
          });
      }
  };


  /**
   * Get the target item distance width(px)
   * @param slideIndex
   */
  _getMoveDistance = (slideIndex: number): number => {

      if (this.slideItemRefs.current) {
          const slideItemRef = this.slideItemRefs.current[slideIndex];
          if (slideItemRef) {
              // const movePx = -dom.clientWidth * slideIndex;
              const movePx = -slideItemRef.offsetLeft;
              if (this.rwdMedia.isCenteredSlides) {
                  return movePx + (slideItemRef.clientWidth * ((this.rwdMedia.slidesPerViewActual - 1) / 2));
              }
              return movePx;
          }
      }

      return 0;
  };

  /**
   * Go to the actual location
   */
  goToActualIndex = (slideIndex: number, isUseAnimation = true) => {
      const {moveTime} = this.props;

      if(this.props.isDebug && logEnable.goToActualIndex) log.printInText(`[goToActualIndex] slideIndex: ${slideIndex}, isUseAnimation: ${isUseAnimation}`);


      if (Math.ceil(slideIndex) !== slideIndex) {
          throw Error(`slideIndex(${slideIndex}) can't has floating .xx`);
      }

      // 檢查:
      // 1. 移動是否在範圍內
      if (this.checkActualIndexInRange(slideIndex)) {
      // 套用目前位置
          this.activeActualIndex = slideIndex;

          // 計算目前正在第幾頁頁數
          this.activePage = 1;
          if (typeof this.info.formatElement[this.activeActualIndex] !== 'undefined') {
              this.activePage = this.info.formatElement[this.activeActualIndex].inPage;
          }


          // 移動EL位置
          const position = this._getMoveDistance(this.activeActualIndex);
          const containerRef = this.containerRef?.current;
          if (containerRef) {
              containerRef.style.visibility = 'visible';
              containerRef.style.transitionDuration = isUseAnimation
                  ? `${moveTime}ms`
                  : '0ms';
              containerRef.style.transform = `translate(${position}px, 0px)`;
          }


          // 提供是否為第一頁/最後一頁的判斷屬性
          const rootRef = this.rootRef?.current;
          if (rootRef) {
              if (this.activePage === 1) {
                  rootRef.setAttribute('data-position', this.activePage === this.info.pageTotal ? 'hidden' : 'first');

              }else{
                  rootRef.setAttribute('data-position', this.activePage === this.info.pageTotal ? 'last': '');
              }
          }

          // 更改顯示在第幾個 (父元件使用可判定樣式設定)
          const slideItemRefs = this.slideItemRefs?.current;
          if(slideItemRefs){
              slideItemRefs.filter(row => isNotEmpty(row)).forEach((row, index) => {
                  if (index === this.activeActualIndex) {
                      row.setAttribute('data-active', 'true');
                  } else if (row) {
                      row.removeAttribute('data-active');
                  }
              });
          }



          // 更改顯示在第幾頁的樣式 (父元件使用可判定樣式設定)
          const pageRefs = this.pageRefs?.current;
          if (pageRefs && this.info.isVisiblePagination && this.activePage > 0) {
              pageRefs.forEach((row, index) => {
                  if (this.activePage === index + 1) {
                      row.setAttribute('data-active', 'true');
                  } else if (row) {
                      row.removeAttribute('data-active');
                  }
              });
          }

          // 結束移動後再繼續自動模式
          this._checkAndAutoPlay();

          this._handleSyncCarousel();
      }
  };

  /**
   * Render left and right navigation blocks
   */
  _renderNavButton = () => {

      const {renderNavButton} = this.props;

      if (typeof renderNavButton !== 'undefined') {
          return renderNavButton(() => this.toPrev(), () => this.toNext());
      }

      return (<div className={elClassName.navGroup}>
          <button type="button" className={elClassName.navPrevButton} onClick={() => this.toPrev()}>
              <div className={elClassName.navIcon}/>
          </button>
          <button type="button" className={elClassName.navNextButton} onClick={() => this.toNext()}>
              <div className={elClassName.navIcon}/>
          </button>
      </div>);
  };

  /**
   * render button block
   */
  _renderPagination = () => {
      const {data} = this.props;
      const pageElement = [];

      for (let i = 0; i < this.info.pageTotal; i++) {
          pageElement.push(
              <div
                  ref={(el: any) => {
                      // @ts-ignore
                      this.pageRefs.current[i] = el;
                      return false;
                  }}
                  key={`page_${i}`}
                  role='button'
                  onClick={() => this.goToPage(i + 1)}
                  className={elClassName.paginationButton}
                  data-active={this.activePage === i + 1 ? true : undefined}
                  data-page={i + 1}
              >
                  <div className={elClassName.paginationContent}>
                      {data[i]?.paginationContent}
                  </div>
              </div>
          );
      }
      return pageElement;
  };


  render() {
      const {style, className, isDebug, isGPURender} = this.props;
      const {windowSize} = this.state;


      // Generate the desired style (note the trailing ;)
      const rootStyle: string = [
          `padding-top: ${this.rwdMedia.aspectRatio && this.rwdMedia.slidesPerView !== 'auto' ? calcSingleAspectRatio(this.rwdMedia.aspectRatio, this.rwdMedia.slidesPerView): '0'};`,
          `height: ${isNotEmpty(this.rwdMedia.staticHeight) ? `${this.rwdMedia.staticHeight}`: 'inherit'};`,
      ].join('');
      const slideItemStyle: string = [
          `flex: ${this.rwdMedia.slidesPerView === 'auto' ? '0 0 auto;-webkit-flex: 0 0 auto;' : `1 0 ${100 / this.rwdMedia.slidesPerViewActual}%`};`,
          `padding-left: ${this.rwdMedia.spaceBetween / 2}px;`,
          `padding-right: ${this.rwdMedia.spaceBetween / 2}px;`,
      ].join('');


      return (
          <BearCarouselProvider
              slidesPerView={this.rwdMedia.slidesPerView}
              staticHeight={this.rwdMedia.staticHeight}
          >
              <div
                  id={this._carouselId}
                  style={style}
                  className={[className, elClassName.root].join(' ').trim()}
                  data-gpu-render={isGPURender ? 'true':undefined}
                  data-per-view-auto={this.rwdMedia.slidesPerView === 'auto'}
                  data-mouse-move={this.rwdMedia.isEnableMouseMove}
                  data-actual={`${this.info.actual.minIndex},${this.info.actual.firstIndex}-${this.info.actual.lastIndex},${this.info.actual.maxIndex}`}
                  data-debug={isDebug ? 'true':undefined}
                  ref={this.rootRef}
              >

                  {/* Item CSS style */}
                  <style scoped>{`
#${this._carouselId}{${rootStyle}}
#${this._carouselId} .${elClassName.slideItem}{${slideItemStyle}}
              `}</style>

                  {/* Left and right navigation buttons */}
                  {this.info.isVisibleNavButton && this._renderNavButton()}

                  <div className={elClassName.content}>
                      <div
                          ref={this.containerRef}
                          className={elClassName.container}
                      >
                          {this.info.formatElement.map((row, i) => (
                              <div
                                  key={`carousel_${i}`}
                                  className={elClassName.slideItem}
                                  ref={(el: any) => {
                                      // @ts-ignore
                                      this.slideItemRefs.current[i] = el;
                                      return false;
                                  }}
                                  data-active={
                                      row.actualIndex === this.activeActualIndex ? true : undefined
                                  }
                                  data-actual={row.actualIndex}
                                  data-match={row.isClone ? row.matchIndex : undefined}
                                  data-page={row.inPage}
                                  data-source={row.sourceIndex}
                                  data-is-clone={row.isClone ? true : undefined}
                              >
                                  {row.element}

                                  <div className={elClassName.testNumber}>
                                      {isDebug && row.sourceIndex}
                                      {isDebug && row.isClone && (
                                          <div className={elClassName.cloneIconGroup}>
                                              <div className={elClassName.cloneIcon}/>
                                              {i}
                                          </div>
                                      )}
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Page number navigation buttons */}
                  {this.info.isVisiblePagination && (
                      <div className={elClassName.paginationGroup}>
                          {this.info.pageTotal > 0 && this._renderPagination()}
                      </div>
                  )}

                  {/* Display current detection size (debug) */}
                  {isDebug && (<div className={elClassName.testWindowSize}>
                      {windowSize}
                  </div>)}

              </div>
          </BearCarouselProvider>


      );
  }
}


export default BearCarousel;


