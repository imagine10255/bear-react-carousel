import * as React from 'react';
import {throttle} from '@github/mini-throttle';
import {getTranslateParams, getMediaInfo, getMediaRangeSize, getSlideDirection} from './utils';
import {uuid} from 'bear-jsutils/key';
import {checkIsMobile} from 'bear-jsutils/browser';
import log  from 'bear-jsutils/log';
import {deepCompare, isNotEmpty} from 'bear-jsutils/equal';
import {IInfo, ITouchStart, IBreakpointSettingActual, IBearCarouselProps} from './types';
import elClassName from './el-class-name';

import './styles.css';
import {BearCarouselProvider} from './BearCarouselProvider';

// 滑動觸發移動距離
const triggerTouchDistance = 60;

interface IState {
  windowSize: number,
}

const isMobile = checkIsMobile();


class BearCarousel extends React.Component<IBearCarouselProps, IState> {
  static defaultProps = {
      data: [],
      slidesPerView: 1,
      slidesPerGroup: 1, // 不可為小數
      moveTime: 350,
      breakpoints: {},
      isCenteredSlides: false,
      isEnableLoop: false,
      isEnablePagination: false,
      isEnableNavButton: false,
      isEnableMouseMove: true,
      isEnableAutoPlay: false,
      isEnableSideVertical: false,
      isDebug: false,
      spaceBetween: 0,
      autoPlayTime: 3000
  };

  _carouselId = uuid();

  timer?: any;
  activePage = 0;        // 真實頁面位置
  activeActualIndex = 0; // 真實項目索引位置
  info: IInfo = {
      formatElement: [],
      sourceTotal: 0, // 來源總數
      // 從0開始
      element: {
          total: 0,
          firstIndex: 0,
          lastIndex: 0
      },
      // 0為實際一開始的位置(往前為負數), 結束值為最後結束位置
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
      isEnableSideVertical: false,
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
  carouselRef: React.RefObject<HTMLDivElement> = React.createRef();
  slideItemRefs: React.RefObject<Array<HTMLDivElement>> = React.createRef();
  pageRefs: React.RefObject<Array<HTMLDivElement>> = React.createRef();
  _throttleHandleResize = () => {};

  constructor(props: IBearCarouselProps) {
      super(props);

      // @ts-ignore
      this.slideItemRefs['current'] = [];
      // @ts-ignore
      this.pageRefs['current'] = [];

      this._throttleHandleResize = throttle(this._handleResize, 400);

      const {rwdMedia, info} = getMediaInfo(props);
      this.rwdMedia = rwdMedia;
      this.info = info;
      this.state = {
          windowSize: getMediaRangeSize(Object.keys(props.breakpoints))
      };

  }


  componentDidMount() {
      if(this.props.isDebug) log.printInText('[componentDidMount]');

      const carouselRef = this.carouselRef?.current;
      if (carouselRef) {
      // 檢查並開啟自動輪播
          this._checkAndAutoPlay();

          // 首次移動到正確位置
          this.goToActualIndex(this.info.actual.firstIndex, false);

          // 視窗大小變更時(透過節流)
          window.addEventListener('resize', this._throttleHandleResize, false);

          // 移動動畫結束(需要復歸位置, 以假亂真)
          carouselRef.addEventListener('transitionend', this._onTransitionend, false);

          if (isMobile) {
              carouselRef.addEventListener('touchstart', this._onMobileTouchStart, false);
          } else {
              carouselRef.addEventListener('mousedown', this._onWebMouseStart, false);
          }
      }

      this._handleSyncCarousel();

  }

  componentWillUnmount() {
      if(this.props.isDebug) log.printInText('[componentWillUnmount]');
      if (this.timer) clearTimeout(this.timer);

      const carouselRef = this.carouselRef?.current;
      if (carouselRef) {
          carouselRef.removeEventListener('touchstart', this._onMobileTouchStart);
          carouselRef.removeEventListener('transitionend', this._onTransitionend);
      }

      window.removeEventListener('resize', this._throttleHandleResize);

  }


  /***
   * 優化渲染
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
          if(this.props.isDebug) log.printInText('[shouldComponentUpdate] true');

          const {rwdMedia, info} = getMediaInfo(nextProps);
          this.rwdMedia = rwdMedia;
          this.info = info;

          // 重置頁面位置
          const $this = this;
          // setTimeout(() => {
          //     $this.goToPage(1, false);
          // }, 0);

          this._handleSyncCarousel();

          return true;
      }

      return false;
  }


  /**
   * 手機手指按住開始
   * @param event
   */
  _onMobileTouchStart = (event: TouchEvent): void => {
      if(this.props.isDebug) log.printInText('[_onMobileTouchStart]');

      if(!this.rwdMedia.isEnableSideVertical){
          event.preventDefault(); // <~  開啟會導致全屏輪播無法將頁面往下滑
      }

      if (this.timer) clearTimeout(this.timer);

      const carouselRef = this.carouselRef?.current;
      if (carouselRef) {
          const movePosition = getTranslateParams(carouselRef);

          // 紀錄位置
          this.touchStart = {
              pageX: event.touches[0].pageX,
              pageY: event.touches[0].pageY,
              x: event.touches[0].pageX - movePosition.x,
              y: event.touches[0].pageY - carouselRef.offsetTop,
              movePositionX: movePosition.x,
              movePositionY: movePosition.y
          };

          carouselRef.addEventListener('touchmove', this._onMobileTouchMove, false);
          carouselRef.addEventListener('touchend', this._onMobileTouchEnd, false);
      }
  };

  /**
   * 手機手指按住移動中
   * @param event
   */
  _onMobileTouchMove = (event: TouchEvent): void => {
      // if(this.props.isDebug) log.printInText('[_onMobileTouchMove]');

      if(!this.rwdMedia.isEnableSideVertical) {
          event.preventDefault(); // <~  開啟會導致全屏輪播無法將頁面往下滑
      }

      const endX = event.changedTouches[0].pageX;
      const endY = event.changedTouches[0].pageY;
      const direction = getSlideDirection(this.touchStart.pageX, this.touchStart.pageY, endX, endY);
      switch (direction) {
      case 0:
          // console.log('沒有滑動');
          break;
      case 1:
      case 2:
          // console.log('上下滑動');

          break;
      case 3:
      case 4:
          // console.log('左右滑動');
          const moveX = event.touches[0].pageX;
          this._elementMove(moveX);
          break;

      default:
      }
  };

  /**
   * 手機手指按住結束
   * @param event
   */
  _onMobileTouchEnd = (event: TouchEvent): void => {
      if(this.props.isDebug) log.printInText('[_onMobileTouchEnd]');

      event.preventDefault();

      const carouselRef = this.carouselRef?.current;
      if (carouselRef) {
          carouselRef.removeEventListener('touchmove', this._onMobileTouchMove, false);
          carouselRef.removeEventListener('touchend', this._onMobileTouchEnd, false);
      }
      this._elementMoveDone();
  };

  /**
   * 網頁滑鼠按下
   * @param event
   */
  _onWebMouseStart = (event: MouseEvent): void => {
      // if(this.props.isDebug) log.printInText('[_onWebMouseStart]');

      event.preventDefault();

      if (this.timer) clearTimeout(this.timer);

      const carouselRef = this.carouselRef?.current;
      if (carouselRef) {
          const movePosition = getTranslateParams(carouselRef);

          this.touchStart = {
              pageX: event.clientX,
              pageY: event.clientY,
              x: event.clientX - movePosition.x,
              y: event.clientY - carouselRef.offsetTop,
              movePositionX: movePosition.x,
              movePositionY: movePosition.y
          };

          carouselRef.addEventListener('mousemove', this._onWebMouseMove, false);
          carouselRef.addEventListener('mouseup', this._onWebMouseEnd, false);
      }

  };


  /**
   * 網頁滑鼠移動
   * @param event
   */
  _onWebMouseMove = (event: MouseEvent):void => {
      // if(this.props.isDebug) log.printInText('[_onWebMouseMove]');

      event.preventDefault();
      const moveX = event.clientX;

      this._elementMove(moveX);
  };

  /**
   * 網頁滑鼠放開
   * @param event
   */
  _onWebMouseEnd = (event: MouseEvent):void => {
      // if(this.props.isDebug) log.printInText('[_onWebMouseEnd]');

      event.preventDefault();

      const carouselRef = this.carouselRef?.current;
      if (carouselRef) {
          carouselRef.removeEventListener('mousemove', this._onWebMouseMove, false);
          carouselRef.removeEventListener('mouseup', this._onWebMouseEnd, false);
      }

      this._elementMoveDone();
  };


  /**
   * 最後的移動執行
   * @param moveX 移動X軸
   */
  _elementMove = (moveX: number): void => {
      const carouselRef = this.carouselRef?.current;
      if (carouselRef) {
          if (this.rwdMedia.isEnableMouseMove && this.slideItemRefs.current) {
              // 取得移動限制
              const distance = {
                  min: this._getMoveDistance(this.info.actual.minIndex),
                  max: this._getMoveDistance(this.info.actual.lastIndex)
              };

              const translateX = moveX - this.touchStart.x;
              if ((distance.max < translateX && distance.min > translateX) || this.rwdMedia.isEnableLoop) {
                  // 拖動
                  carouselRef.style.transform = `translate3d(${translateX}px, 0px, 0px)`;
                  carouselRef.style.transitionDuration = '0ms';
              }
          }
      }


  };


  /**
   * 物件移動結束 (確認停下位置 應該吸在哪個Index位置)
   */
  _elementMoveDone = (): void => {

      const carouselRef = this.carouselRef?.current;
      if (carouselRef) {

          // 取得移動位置
          const movePosition = getTranslateParams(carouselRef).x;

          // 確認移動距離
          const checkMove = movePosition - this.touchStart.movePositionX;

          if (checkMove <= triggerTouchDistance && checkMove >= -triggerTouchDistance) {
              this.goToActualIndex(this.activeActualIndex);

          } else if (checkMove >= -triggerTouchDistance) {
              this.toPrev();
          } else if (checkMove <= triggerTouchDistance) {
              this.toNext();
          }
      }

  };





  /**
   * 檢查並自動播放功能
   */
  _checkAndAutoPlay = (): void => {
      const {autoPlayTime} = this.props;
      // if(this.props.isDebug) log.printInText(`[_checkAndAutoPlay] autoPlayTime: ${autoPlayTime}`);


      // 清除上一次的計時器
      if (this.timer) {
          clearTimeout(this.timer);
      }

      if (this.rwdMedia.isEnableLoop && this.rwdMedia.isEnableAutoPlay && autoPlayTime > 0) {
          this.timer = setTimeout(() => {
              this.toNext();
          }, autoPlayTime);
      }
  };


  /**
   * 重置頁面位置 (LoopMode)
   * 如果元素內是 isClone 則返回到他應該真實顯示的位置
   */
  _onTransitionend = (): void => {
      if(this.props.isDebug) log.printInText('[_onTransitionend]');

      const formatElement = this.info?.formatElement ? this.info.formatElement : [];

      const $this = this;
      if (formatElement.length > (this.activeActualIndex - 1) && formatElement[this.activeActualIndex].isClone) {
          // setTimeout(() => {
          this.goToActualIndex(formatElement[this.activeActualIndex].matchIndex, false);
          // }, 0);
      }

  };

  /**
   * 處理更改螢幕尺寸時
   */
  _handleResize = () => {
      const {breakpoints} = this.props;
      const {windowSize} = this.state;

      const selectSize = getMediaRangeSize(Object.keys(breakpoints));

      // 只在區間內有設定的值才會 setState

      // 自動導引到目前位置
      if (windowSize !== selectSize) {
          if(this.props.isDebug) log.printInText(`[_handleResize] windowSize: ${windowSize} -> ${selectSize}px`);
          this.setState({
              windowSize: selectSize
          });
      }

  };


  /**
   * 取得下一頁
   */
  getNextPage = (): number => {
      return this.activePage + 1;
  };

  /**
   * 取得下一頁的第一個項目
   */
  getNextPageFirstIndex = (): number => {
      if (this.rwdMedia.isCenteredSlides) {
          return this.activeActualIndex + this.rwdMedia.slidesPerGroup;
      }
      // 避免結尾出現空白
      return this.activeActualIndex + this.rwdMedia.slidesPerViewActual;
  };

  /**
   * 取得最大Index
   */
  getMaxIndex = (): number => {
      return this.info.formatElement.length - 1;
  };

  /**
   * 取得虛擬Index
   */
  checkActualIndexInRange = (slideIndex: number): boolean => {
      return slideIndex <= this.info.actual.maxIndex && slideIndex >= this.info.actual.minIndex;
  };


  /**
   * 前往下一頁
   */
  toNext = (): void => {

      const nextPage = this.getNextPage();
      let index = this.activeActualIndex; // 預設為回到原地 (對滑動移動有用)


      if (this.rwdMedia.isEnableLoop && nextPage > this.info.pageTotal && this.info.residue > 0) {
      // 若為Loop(最後一頁移動在不整除的時候, 移動位置需要復歸到第一個)
          index = this.activeActualIndex + this.info.residue;
      } else if (
          this.rwdMedia.slidesPerViewActual < this.info.formatElement.length &&
      this.getNextPageFirstIndex() <= this.getMaxIndex()
      ) {
      // 正常移動到下一頁
          index = this.activeActualIndex + this.rwdMedia.slidesPerGroup;
      }

      this.goToActualIndex(index);
  };

  /**
   * 前往上一個
   */
  toPrev = (): void => {
      let index = this.activeActualIndex; // 預設為回到原地 (對滑動移動有用)
      if (this.rwdMedia.isEnableLoop && this.activePage === 1 && this.info.residue > 0) {
      // 檢查若為Loop(第一頁移動不整除的時候, 移動位置需要復歸到第一個)
          index = this.activeActualIndex - this.info.residue;
      } else if (this.rwdMedia.slidesPerViewActual < this.info.formatElement.length) {
      // 正常移動到上一個
          index = this.activeActualIndex - this.rwdMedia.slidesPerGroup;
      }
      this.goToActualIndex(index);
  };


  /**
   * 前往頁面
   */
  goToPage = (page: number, isUseAnimation = true): void => {
      this.goToActualIndex(page * this.rwdMedia.slidesPerGroup + (this.info.actual.firstIndex - 1), isUseAnimation);
  };

  /**
   * 同步 Carousel 狀態
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
   * 取得目標項目距離寬度(px)
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
   * 前往實際位置
   */
  goToActualIndex = (slideIndex: number, isUseAnimation = true) => {
      const {moveTime} = this.props;

      if(this.props.isDebug) log.printInText(`[goToActualIndex] slideIndex: ${slideIndex}, isUseAnimation: ${isUseAnimation}`);


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
          const carouselRef = this.carouselRef?.current;
          if (carouselRef) {
              carouselRef.style.visibility = 'visible';
              carouselRef.style.transitionDuration = isUseAnimation
                  ? `${moveTime}ms`
                  : '0ms';
              carouselRef.style.transform = `translate3d(${position}px, 0px, 0px)`;
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
   * 渲染左右導航區塊
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
   * 渲染按鈕區塊
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
      const {style, className, isDebug} = this.props;
      const {windowSize} = this.state;


      // 產生需要的樣式 (注意結尾符號 ;)
      const rootStyle: string = [
          `padding-top: ${isNotEmpty(this.rwdMedia.aspectRatio) ? `calc(100% * (${this.rwdMedia.aspectRatio?.heightRatio} / ${this.rwdMedia.aspectRatio?.widthRatio}));`: '0;'}`,
          `height: ${isNotEmpty(this.rwdMedia.staticHeight) ? `${this.rwdMedia.staticHeight};`: 'inherit;'}`,
      ].join('');

      // 產生需要的樣式 (注意結尾符號 ;)
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
                  data-carousel-id={this._carouselId}
                  style={style}
                  className={[className, elClassName.root].join(' ').trim()}
                  ref={this.rootRef}
              >

                  {/* Item CSS 樣式 */}
                  <style scoped>{`
.${elClassName.root}[data-carousel-id="${this._carouselId}"]{${rootStyle}}
.${elClassName.root}[data-carousel-id="${this._carouselId}"] .${elClassName.slideItem}{${slideItemStyle}}
              `}</style>

                  {/* 左右導航按鈕 */}
                  {this.info.isVisibleNavButton && this._renderNavButton()}

                  <div className={elClassName.content}>
                      <div
                          ref={this.carouselRef}
                          className={elClassName.container}
                          data-is-per-view-auto={this.rwdMedia.slidesPerView === 'auto'}
                          data-is-enable-mouse-move={this.rwdMedia.isEnableMouseMove}
                          data-actual={`${this.info.actual.minIndex},${this.info.actual.firstIndex}-${this.info.actual.lastIndex},${this.info.actual.maxIndex}`}
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
                                  data-is-clone={row.isClone ? true : undefined}
                              >
                                  {row.element}

                                  {isDebug && (<div className={elClassName.testNumber}>
                                      {row.matchIndex}
                                      {row.isClone && (
                                          <div className={elClassName.cloneIconGroup}>
                                              <div className={elClassName.cloneIcon}/>
                                              {i}
                                          </div>
                                      )}
                                  </div>)}
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* 頁數導航按鈕 */}
                  {this.info.isVisiblePagination && (
                      <div className={elClassName.paginationGroup}>
                          {this.info.pageTotal > 0 && this._renderPagination()}
                      </div>
                  )}

                  {/* 顯示目前偵測尺寸(除錯) */}
                  {isDebug && (<div className={elClassName.testWindowSize}>
                      {windowSize}
                  </div>)}

              </div>
          </BearCarouselProvider>


      );
  }
}


export default BearCarousel;


