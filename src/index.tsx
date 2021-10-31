import * as React from 'react';
import {checkIsMobile, getMediaSetting, getTranslateParams, generateMedia, initDataList} from './library/ImCarousel/utils';
import * as CSS from 'csstype';
import {IData, IBreakpoints, TToNext, TToPrev, IInfo, ITouchStart, TSlidesPerView, IBreakpointSettingActual} from './library/ImCarousel/types';
// import styled, {css} from 'styled-components';
import {elClassName} from './library/ImCarousel/config';

import './styles.css';

// let count = 0;
// 滑動觸發移動距離
const triggerTouchDistance = 60;

interface IState {
  // rwdMedia: IBreakpointSetting,
}

interface IProps {
  style?: CSS.Properties
  className?: string
  data: IData[];
  slidesPerView: TSlidesPerView;
  slidesPerGroup: number
  isEnableLoop: boolean
  isEnableMouseMove: boolean
  isEnablePagination: boolean
  isEnableNavButton: boolean
  moveTime: number
  autoPlayTime: number
  isDebug: boolean
  breakpoints: IBreakpoints
  spaceBetween: number
  renderNavButton: (
    toPrev: TToPrev,
    toNext: TToNext,
    navGroupClassName: string
  ) => void
  isCenteredSlides: boolean,
  // emitSetFunc: (params: ICommonFunc) => void
  onChange?: (index: number, page: number) => void
}


class ImCarousel extends React.Component<IProps, IState> {
  static defaultProps = {
    data: [],
    slidesPerView :1,
    slidesPerGroup :1, // 不可為小數
    isEnableLoop :false,
    moveTime :350,
    breakpoints :{},
    isEnableMouseMove :true,
    isEnablePagination :false,
    isEnableNavButton :false,
    isCenteredSlides :false,
    isDebug :false,
    spaceBetween :0,
    autoPlayTime :0,
    renderNavButton: ( toPrev: TToPrev,  toNext: TToNext, navGroupClassName: string) => {
      return (<div className={navGroupClassName}>
        <button type="button" className={elClassName.navPrevButton} onClick={toPrev}>{'<'}</button>
        <button type="button" className={elClassName.navNextButton} onClick={toNext}>{'>'}</button>
      </div>);
    },
  };

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
    isDivisible: false,
    residue: 1,
    isVisiblePagination: false,
    isVisibleNavButton: false,
  };


  rwdMedia: IBreakpointSettingActual = {
    slidesPerView: 1,
    slidesPerViewActual: 1,
    slidesPerGroup: 1,
    spaceBetween: 0,
    isEnableLoop: false,
    isEnableNavButton: true,
    isEnablePagination: true,
    isCenteredSlides: false,
  };

  touchStart: ITouchStart = {
    pageX: 0,
    pageY: 0,
    x: 0,
    y: 0,
    movePositionX: 0,
    movePositionY: 0,
  };

  // Ref
  rootRef: React.RefObject<HTMLDivElement> = React.createRef();
  slideItemRef: React.RefObject<Array<HTMLDivElement>> = React.createRef();
  carouselRef: React.RefObject<HTMLDivElement> = React.createRef();
  pageRef: React.RefObject<Array<HTMLDivElement>> = React.createRef();


  constructor(props: IProps) {
    super(props);

    const {slidesPerGroup, slidesPerView, spaceBetween, isEnableLoop, isEnableNavButton, isEnablePagination, isCenteredSlides} = props;
    // @ts-ignore
    this.slideItemRef['current'] = [];
    // @ts-ignore
    this.pageRef['current'] = [];

    this.rwdMedia = getMediaSetting({
      slidesPerView: slidesPerView,
      slidesPerGroup: slidesPerGroup,
      spaceBetween: spaceBetween,
      isEnableLoop: isEnableLoop,
      isEnableNavButton: isEnableNavButton,
      isEnablePagination: isEnablePagination,
      isCenteredSlides: isCenteredSlides,
    }, {});

    this.info = this.getInfo();

  }

  componentDidMount() {

    const {isEnableMouseMove} = this.props;
    const element = this.carouselRef.current as HTMLElement;

    // 檢查並開啟自動輪播
    this.checkAndAutoPlay();

    // 首次移動到正確位置
    this.goToActualIndex(this.info.actual.firstIndex, false);

    // 視窗大小變更時
    // window.addEventListener('resize', debounce(handleResize, 200));


    // 移動動畫結束復歸
    element.addEventListener('transitionend', () => this.resetPageByLoop());


    // @ts-ignore
    if (checkIsMobile()) {
      // Mobile 壓住拖動
      element.addEventListener('touchstart', this.mobileTouchStart);

    } else if (isEnableMouseMove) {
      // 電腦網頁滑鼠拖拉
      element.onmousedown = (event) => this.webMouseStart(event);
    }
  }

  componentWillUnmount() {
    if(this.timer){
      clearTimeout(this.timer);
    }
  }

  /***
   * 優化渲染
   * @param nextProps
   * @param nextState
   * @param nextContext
   */
  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    const {data, ...otherParams} = this.props;
    const {data: nextData, ...nextOtherProps} = nextProps;

    if(otherParams !== nextOtherProps){

      const {slidesPerGroup, slidesPerView, spaceBetween, isEnableLoop, isEnableNavButton, isEnablePagination, isCenteredSlides} = nextOtherProps;

      this.rwdMedia = getMediaSetting({
        slidesPerGroup: slidesPerGroup,
        slidesPerView: slidesPerView,
        spaceBetween: spaceBetween,
        isEnableLoop: isEnableLoop,
        isEnableNavButton: isEnableNavButton,
        isEnablePagination: isEnablePagination,
        isCenteredSlides: isCenteredSlides,
      }, {});

      this.info = this.getInfo();


      return true;

    }

    const oldKey = data.map((row) => row.key).join('_');
    const nextKey = nextData.map((row) => row.key).join('_');
    return oldKey !== nextKey;
  }


  /**
   * 手機手指按壓
   * @param event
   */
  mobileTouchStart(event: TouchEvent): void {
    // event.preventDefault();

    const element = this.carouselRef.current as HTMLElement;
    const movePosition = getTranslateParams(element);

    // 紀錄位置
    this.touchStart = {
      pageX: event.touches[0].pageX,
      pageY: event.touches[0].pageY,
      x: event.touches[0].pageX - movePosition.x,
      y: event.touches[0].pageY - element.offsetTop,
      movePositionX: movePosition.x,
      movePositionY: movePosition.y,
    };

    element.addEventListener('touchmove', this.mobileTouchMove);
    element.addEventListener('touchend', this.mobileTouchEnd);

    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  mobileTouchMove(event: TouchEvent): void {
    const endX = event.changedTouches[0].pageX;
    const endY = event.changedTouches[0].pageY;
    const direction = this.getSlideDirection(this.touchStart.pageX, this.touchStart.pageY, endX, endY);
    switch (direction) {
      case 0:
        // // console.log('沒有滑動');
        break;
      case 1:
      case 2:
        // // console.log('上下滑動');

        break;
      case 3:
      case 4:
        // // console.log('左右滑動');

        event.preventDefault();
        const moveX = event.touches[0].pageX;
        this.elementMove(moveX);
        break;

      default:
    }

  };

  /**
   * 手機手指放開
   * @param event
   */
  mobileTouchEnd(event: TouchEvent): void {
    // event.preventDefault();

    const element = this.carouselRef.current as HTMLElement;
    element.removeEventListener('touchmove', this.mobileTouchMove);
    element.removeEventListener('touchend', this.mobileTouchEnd);

    this.elementMoveDone();
  };

  /**
   *
   * @param moveX 移動X軸
   */
  elementMove(moveX: number): void{

    const translateX = moveX - this.touchStart.x;
    const element = this.carouselRef.current as HTMLElement;

    if(this.slideItemRef.current){
      // 取得移動限制
      const distance = {
        min: this.getMoveDistance(this.info.actual.minIndex),
        max: this.getMoveDistance(this.info.actual.lastIndex),
      };

      if ((distance.max < translateX && distance.min > translateX) || this.rwdMedia.isEnableLoop) {
        // 拖動
        element.style.transform = `translate3d(${translateX}px, 0px, 0px)`;
        element.style.transitionDuration = '0ms';
      }
    }

  };


  /**
   * 物件移動結束 (確認停下位置 應該吸在哪個Index位置)
   */
  elementMoveDone(): void {
    const element = this.carouselRef.current;

    // 取得移動位置
    const movePosition = getTranslateParams(element).x;

    // 確認移動距離
    const checkMove = movePosition - this.touchStart.movePositionX;

    if(checkMove <= triggerTouchDistance && checkMove >= -triggerTouchDistance){
      this.goToActualIndex(this.activeActualIndex);
    }else if (checkMove >= -triggerTouchDistance) {
      this.toPrev();
    } else if (checkMove <= triggerTouchDistance) {
      this.toNext();
    }

  };

  /**
   * 網頁滑鼠按下
   * @param event
   */
  webMouseStart(event: MouseEvent): void {
    event.preventDefault();

    const element = this.carouselRef.current as HTMLElement;
    const movePosition = getTranslateParams(element);

    this.touchStart = {
      pageX: event.clientX,
      pageY: event.clientY,
      x: event.clientX - movePosition.x,
      y: event.clientY - element.offsetTop,
      movePositionX: movePosition.x,
      movePositionY: movePosition.y,
    };

    element.onmousemove = this.webMouseMove;
    element.onmouseup = this.webMouseEnd;

    if (this.timer) {
      clearTimeout(this.timer);
    }
  }


  /**
   * 網頁滑鼠移動
   * @param e
   */
  webMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    const moveX = event.clientX;

    this.elementMove(moveX);
  };

  /**
   * 網頁滑鼠放開
   * @param event
   */
  webMouseEnd = (event: MouseEvent) => {
    event.preventDefault();

    const element = this.carouselRef.current as HTMLElement;
    element.onmousemove = null;
    element.onmouseup = null;

    this.elementMoveDone();
  };

  /**
   * 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
   * @param startX
   * @param startY
   * @param endX
   * @param endY
   */
  getSlideDirection = (startX: number, startY: number, endX: number, endY: number) => {
    const dy = startY - endY;
    const dx = endX - startX;
    let result = 0;
    //如果滑动距离太短
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
      return result;
    }
    const angle = this.getSlideAngle(dx, dy);
    if (angle >= -45 && angle < 45) {
      result = 4;
    } else if (angle >= 45 && angle < 135) {
      result = 1;
    } else if (angle >= -135 && angle < -45) {
      result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    }
    return result;
  }


  /**
   * 返回角度
   * @param dx
   * @param dy
   */
  getSlideAngle(dx: number, dy: number): number {
    return Math.atan2(dy, dx) * 180 / Math.PI;
  }

  /**
   * 檢查並自動播放功能
   */
  checkAndAutoPlay(): void {
    const {autoPlayTime} = this.props;

    // 清除上一次的計時器
    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (this.rwdMedia.isEnableLoop && autoPlayTime > 0) {
      this.timer = setTimeout(() => {
        this.toNext();
      }, autoPlayTime);
    }
  }


  getInfo(): IInfo {
    const {data} = this.props;

    // console.log('this.rwdMedia', this.rwdMedia);
    const divisible = data.length % this.rwdMedia.slidesPerGroup; // 餘數
    let sliceData = divisible > 0 ? data.slice(0, data.length - divisible) : data;
    let sourceTotal = sliceData.length;
    const formatElement = initDataList(
      sliceData,
      this.rwdMedia.slidesPerViewActual,
      this.rwdMedia.slidesPerGroup,
      this.rwdMedia.isEnableLoop
    );


    const elementTotal = formatElement.length;
    const cloneBeforeTotal = this.rwdMedia.isEnableLoop ? this.rwdMedia.slidesPerViewActual : 0;
    const cloneAfterTotal = cloneBeforeTotal;
    const actualMinIndex = 0;
    const actualMaxIndex = elementTotal - 1;

    // if (this.rwdMedia.slidesPerGroup > this.rwdMedia.slidesPerViewActual) {
    //     // throw Error(
    //     //     `slidesPerGroup(${this.rwdMedia.slidesPerGroup}) can't > slidesPerView(${this.rwdMedia.slidesPerViewActual})`
    //     // );
    // } else if (Math.ceil(this.rwdMedia.slidesPerGroup) !== this.rwdMedia.slidesPerGroup) {
    //     throw Error(
    //         `slidesPerGroup(${this.rwdMedia.slidesPerGroup}) can't has floating .xx`
    //     );
    // }

    let fakeTotalPage = Math.ceil(sourceTotal / this.rwdMedia.slidesPerGroup);
    if(!this.rwdMedia.isEnableLoop && this.rwdMedia.slidesPerView !== 'auto' && !this.rwdMedia.isCenteredSlides){
      fakeTotalPage = fakeTotalPage - (this.rwdMedia.slidesPerView - this.rwdMedia.slidesPerGroup);
    }

    return {
      formatElement,
      sourceTotal, // 來源總數
      // 從0開始
      element: {
        total: elementTotal,
        firstIndex: 0,
        lastIndex: elementTotal - 1
      },
      // 0為實際一開始的位置(往前為負數), 結束值為最後結束位置
      actual: {
        minIndex: actualMinIndex,
        maxIndex: actualMaxIndex,
        firstIndex: Math.ceil(cloneBeforeTotal),
        lastIndex: Math.ceil(sourceTotal + cloneAfterTotal - 1)
      },
      // 總頁數
      // pageTotal: fakeTotalPage - (this.rwdMedia.slidesPerView - (elementTotal % this.rwdMedia.slidesPerView)),
      pageTotal: fakeTotalPage,
      isDivisible: divisible === 0,
      residue: elementTotal % this.rwdMedia.slidesPerGroup,
      isVisiblePagination: this.rwdMedia.isEnablePagination && formatElement.length > 0,
      isVisibleNavButton: this.rwdMedia.isEnableNavButton && formatElement.length > 0
    };
  }

  /**
   * 重置頁面位置 (LoopMode)
   */
  resetPageByLoop(): void {
    if(this.info.formatElement[this.activeActualIndex].isClone){
      this.goToActualIndex(this.info.formatElement[this.activeActualIndex].matchIndex, false);
    }
  };



  /**
   * 取得下一頁
   */
  getNextPage(): number {
    return this.activePage + 1;
  };

  /**
   * 取得下一頁
   */
  getNextPageFirstIndex(): number {
    if(this.rwdMedia.isCenteredSlides){
      return this.activeActualIndex + this.rwdMedia.slidesPerGroup;
    }
    // 避免結尾出現空白
    return this.activeActualIndex + this.rwdMedia.slidesPerViewActual;
  };

  /**
   * 取得最大Index
   */
  getMaxIndex(): number {
    return this.info.formatElement.length - 1;
  };

  /**
   * 取得虛擬Index
   */
  checkActualIndexInRange(slideIndex: number): boolean {
    return slideIndex <= this.info.actual.maxIndex && slideIndex >= this.info.actual.minIndex;
  }


  /**
   * 前往下一頁
   */
  toNext(): void {

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

  }

  /**
   * 前往上一個
   */
  toPrev(): void {
    let index = this.activeActualIndex; // 預設為回到原地 (對滑動移動有用)
    if (this.rwdMedia.isEnableLoop && this.activePage === 1 && this.info.residue > 0) {
      // 檢查若為Loop(第一頁移動不整除的時候, 移動位置需要復歸到第一個)
      index = this.activeActualIndex - this.info.residue;
    } else if (this.rwdMedia.slidesPerViewActual < this.info.formatElement.length) {
      // 正常移動到上一個
      index = this.activeActualIndex - this.rwdMedia.slidesPerGroup;
    }
    this.goToActualIndex(index);
  }


  /**
   * 前往頁面
   */
  goToPage(page: number): void {
    this.goToActualIndex(page * this.rwdMedia.slidesPerGroup + (this.info.actual.firstIndex - 1));
  }



  /**
   * 取得目標項目距離寬度(px)
   * @param slideIndex
   */
  getMoveDistance(slideIndex: number): number {
    const {spaceBetween} = this.props;

    if(this.slideItemRef.current){
      const dom = this.slideItemRef.current[slideIndex];
      if (dom) {
        // const movePx = -dom.clientWidth * slideIndex;
        const movePx = -dom.offsetLeft;
        if (this.rwdMedia.isCenteredSlides) {
          return movePx + (dom.clientWidth * ((this.rwdMedia.slidesPerViewActual - 1) / 2 ));
        }
        return movePx;
      }
    }

    return 0;
  }

  /**
   * 前往實際位置
   */
  goToActualIndex(slideIndex: number, isUseAnimation = true) {
    const {moveTime, onChange} = this.props;

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
      if(typeof this.info.formatElement[this.activeActualIndex] !== 'undefined'){
        this.activePage = this.info.formatElement[this.activeActualIndex].inPage;
      }


      // 移動EL位置
      const position = this.getMoveDistance(this.activeActualIndex);
      const element = this.carouselRef.current as HTMLElement;
      element.style.visibility = 'visible';
      element.style.transitionDuration = isUseAnimation
        ? `${moveTime}ms`
        : '0ms';
      element.style.transform = `translate3d(${position}px, 0px, 0px)`;

      // 提供是否為第一頁/最後一頁的判斷屬性
      if (this.rootRef?.current) {
        if (this.activePage === 1) {
          if (this.activePage === this.info.pageTotal) {
            this.rootRef.current.setAttribute('data-position', 'hidden');
          } else {
            this.rootRef.current.setAttribute('data-position', 'first');
          }
        } else if (this.activePage === this.info.pageTotal) {
          this.rootRef.current.setAttribute('data-position', 'last');
        } else {
          this.rootRef.current.setAttribute('data-position', '');
        }
      }

      // 更改顯示在第幾個 (父元件使用可判定樣式設定)
      if(this.slideItemRef.current){
        this.slideItemRef.current.forEach((row, index) => {
          if (row) {
            if (index === this.activeActualIndex) {
              row.setAttribute('data-active', 'true');
            } else if (row) {
              row.removeAttribute('data-active');
            }
          }
        });
      }


      // 更改顯示在第幾頁的樣式 (父元件使用可判定樣式設定)
      if (this.pageRef.current && this.info.isVisiblePagination && this.activePage > 0) {
        this.pageRef.current.forEach((row, index) => {
          if (this.activePage === index + 1 ) {
            row.setAttribute('data-active', 'true');
          } else if (row) {
            row.removeAttribute('data-active');
          }
        });
      }

      // 結束移動後再繼續自動模式
      this.checkAndAutoPlay();

      if (onChange) {
        onChange(this.activeActualIndex, this.activePage);
      }
    }
  }


  /**
   * 渲染按鈕區塊
   */
  renderPagination(){
    const {data} = this.props;
    const pageElement = [];

    for (let i = 0; i < this.info.pageTotal; i++) {
      pageElement.push(
        <div
          ref={(el: any) => {
            // @ts-ignore
            this.pageRef.current[i] = el;
            return false;
          }}
          key={`page_${i}`}
          role='button'
          onClick={() => this.goToPage(i + 1)}
          className={elClassName.paginationButton}
          data-active={this.activePage === i + 1 ? true : undefined}
          data-page={i + 1}
          // style={{
          //   backgroundColor: this.activePage ? paginationActiveColor: paginationColor,
          // }}
        >
          <div className={elClassName.paginationContent}>
            {data[i]?.paginationContent}
          </div>
        </div>
      );
    }
    return pageElement;
  }


  render() {
    const {breakpoints, renderNavButton, style, className, isDebug} = this.props;


    // 產生需要的樣式
    const slideItemStyle: any = `
        flex: ${this.rwdMedia.slidesPerView === 'auto'? '0 0 auto' : `1 0 ${100 / this.rwdMedia.slidesPerViewActual}%`};
        padding-left: ${this.rwdMedia.spaceBetween / 2}px;
        padding-right: ${this.rwdMedia.spaceBetween / 2}px;
        
    `;


    // count += 1;
    // console.log(`render: ${count}`, 'this.info.formatElement', this.info.formatElement.length);
    return (
      <div style={style} className={[className, elClassName.root].join(' ')} ref={this.rootRef}>

        <style scoped>{`
          .${elClassName.slideItem}{
             ${slideItemStyle}
          }
          ${generateMedia(breakpoints)}
        `}</style>

        {this.info.isVisibleNavButton && renderNavButton(() => this.toPrev(), () => this.toNext(), elClassName.navGroup)}

        <div className={elClassName.content}>
          <div
            ref={this.carouselRef}
            className={elClassName.carouselContainer}
            // slidesPerView={this.rwdMedia.slidesPerView}
            // slidesPerViewActual={this.rwdMedia.slidesPerViewActual}
            // breakpoints={breakpoints}
            // spaceBetween={this.rwdMedia.spaceBetween}
            data-actual={`${this.info.actual.minIndex},${this.info.actual.firstIndex}-${this.info.actual.lastIndex},${this.info.actual.maxIndex}`}
          >
            {this.info.formatElement.map((row, i) => (
              <div
                key={`carousel_${i}`}
                className={elClassName.slideItem}
                ref={(el: any) => {
                  // @ts-ignore
                  this.slideItemRef.current[i] = el;
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

        {this.info.isVisiblePagination && (
          <div className={elClassName.paginationGroup}>
            {this.info.formatElement.length > 0 && this.renderPagination()}
          </div>
        )}
      </div>
    );
  }
}



export default ImCarousel;

