import * as React from 'react';
import {
    checkIsMobile,
    getPaddingBySize,
    getMediaInfo,
    getSizeByRange,
    getSlideDirection,
    getTranslateParams,
    decimal2Rounding,
    getSlideIndex,
    getStartPosition,
    getNextPageFirstIndex,
    getNextPage,
    getLastIndex,
    checkActualIndexInRange,
    getLoopResetIndex,
    getNextIndex,
    getMoveDistance, getMovePercentage, calcMoveTranslatePx, checkInRange
} from './utils';
import {ulid} from 'ulid';
import log from './log';
import deepCompare from './deepCompare';
import {EDirection, EHorizontal, IBearCarouselProps, IBreakpointSettingActual, IInfo, ITouchStart} from './types';
import elClassName from './el-class-name';
import {BearCarouselProvider} from './BearCarouselProvider';

import './styles.css';
import {ArrowIcon, CloneIcon} from './Icon';
import Position from './Position';
import RWDMedia from './RWDMedia';



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


enum EDevice {
    mobile,
    desktop,
}

const resizeEvent: Record<EDevice, string> = {
    [EDevice.mobile]: 'orientationchange',
    [EDevice.desktop]:  'resize'
};


class BearCarousel extends React.Component<IBearCarouselProps, IState> {
    static defaultProps = {
        data: undefined,
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
        isDebug: false,
        spaceBetween: 0,
        autoPlayTime: 5000,
        defaultActivePage: 1,
    };
    _device = EDevice.desktop;
    _carouselId = `bear-react-carousel_${ulid().toLowerCase()}`;

    timer?: any;
    resetDurationTimer?: any;
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



    // touchStart: ITouchStart = {
    //     pageX: 0,
    //     pageY: 0,
    //     x: 0,
    //     y: 0,
    //     movePositionX: 0,
    //     movePositionY: 0
    // };
    state = {
        windowSize: 0
    };


    rwdMedia: RWDMedia;
    position: Position;

    // Ref
    rootRef: React.RefObject<HTMLDivElement> = React.createRef();
    containerRef: React.RefObject<HTMLDivElement> = React.createRef();
    slideItemRefs: React.RefObject<Array<HTMLDivElement>> = React.createRef();
    pageRefs: React.RefObject<Array<HTMLDivElement>> = React.createRef();
    pageGroupRef: React.RefObject<HTMLDivElement> = React.createRef();
    navGroupRef: React.RefObject<HTMLDivElement> = React.createRef();
    // syncControlRefs: React.RefObject<BearCarousel> = React.createRef();

    constructor(props: IBearCarouselProps) {
        super(props);

        // @ts-ignore
        this.slideItemRefs['current'] = [];
        // @ts-ignore
        this.pageRefs['current'] = [];

        this._device = checkIsMobile() ? EDevice.mobile : EDevice.desktop;
        const {rwdMedia, info} = getMediaInfo(props);
        this.rwdMedia = new RWDMedia(rwdMedia, props.breakpoints);
        this.position = new Position();

        this.info = info;
        this.state = {
            windowSize: getSizeByRange(window.innerWidth, Object.keys(props.breakpoints).map(Number))
        };

    }


    componentDidMount() {
        if(this.props.isDebug && logEnable.componentDidMount) log.printInText('[componentDidMount]');

        const containerRef = this.containerRef?.current;
        if (containerRef) {
            // Move to the correct position for the first time
            if(this.info.pageTotal > 0){
                this.goToPage(this.props.defaultActivePage ?? 1, false);
            }

            // End of moving animation (Need to return to the position, to be fake)


            window.addEventListener('focus', this._onWindowFocus, false);
            window.addEventListener('blur', this._onWindowBlur, false);

            window.addEventListener(resizeEvent[this._device], this._onResize2, {passive: false});

            if (this._device === EDevice.mobile) {
                // When the window size is changed
                containerRef.addEventListener('touchstart', this._onMobileTouchStart, {passive: false});
            } else {
                // When the window size is changed (through throttling)
                // window.addEventListener('resize', this._onResize, {passive: false});
                containerRef.addEventListener('mousedown', this._onWebMouseStart, {passive: false});
            }
        }

        this._handleSyncCarousel();

    }

    componentWillUnmount() {
        if(this.props.isDebug && logEnable.componentWillUnmount) log.printInText('[componentWillUnmount]');
        if (this.timer) clearTimeout(this.timer);



        const containerRef = this.containerRef?.current;
        window.removeEventListener(resizeEvent[this._device], this._onResize2, false);

        if (containerRef) {
            if (this._device === EDevice.mobile) {
                containerRef.removeEventListener('touchstart', this._onMobileTouchStart, false);
            } else {
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
        const {data, setCarousel, renderNavButton, onElementDone, syncControlRefs, onElementMove, ...otherParams} = this.props;
        const {data: nextData, setCarousel: nextSetCarousel, renderNavButton: nextRenderNavButton, syncControlRefs: nextSyncControlRefs, onElementDone: nextOnElementDone, onElementMove: nextOnElementMove, ...nextOtherProps} = nextProps;

        const oldKey = data?.map((row) => row.key).join('_');
        const nextKey = nextData?.map((row) => row.key).join('_');
        if (oldKey !== nextKey ||
      !deepCompare(otherParams, nextOtherProps) ||
      nextWindowSize !== windowSize
        ) {
            if(this.props.isDebug && logEnable.shouldComponentUpdate) log.printInText('[shouldComponentUpdate] true');

            const {rwdMedia, info} = getMediaInfo(nextProps);
            this.rwdMedia.setSetting(rwdMedia);
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


    _isSyncControl = () => !!this.props.syncControlRefs === false;
    checkActualIndexInRange = (slideIndex: number) => checkActualIndexInRange(slideIndex, {minIndex: this.info.actual.minIndex, maxIndex: this.info.actual.maxIndex});

    getNextPage = () => getNextPage(this.activePage);
    getNextPageFirstIndex = () => getNextPageFirstIndex(this.rwdMedia.setting.isCenteredSlides, this.activeActualIndex, this.rwdMedia.setting.slidesPerGroup, this.rwdMedia.setting.slidesPerViewActual);
    getMaxIndex = () => getLastIndex(this.info.formatElement.length);
    _getLoopResetIndex = () => getLoopResetIndex(this.activeActualIndex, this.info.residue);





    /**
     * browser focus check auto play
     * @private
     */
    _onWindowFocus = (): void => {
        this._checkAndAutoPlay();
    };


    /**
     * browser blur clean auto play timer
     * @private
     */
    _onWindowBlur = (): void => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };



    /**
   * mobile phone finger press start
   * @param event
   */
    _onMobileTouchStart = (event: TouchEvent): void => {
        if(this.props.isDebug && logEnable.onMobileTouchStart) log.printInText('[_onMobileTouchStart]');

        if (this.timer) clearTimeout(this.timer);

        const containerRef = this.containerRef?.current;
        if (containerRef) {
            if(containerRef.style.transitionDuration === '0ms'){
                this._resetPosition();
                const movePosition = getTranslateParams(containerRef);

                // 紀錄位置
                this.position.touchStart({
                    pageX: event.targetTouches[0].pageX,
                    pageY: event.targetTouches[0].pageY,
                    x: event.targetTouches[0].pageX - movePosition.x,
                    y: event.targetTouches[0].pageY - containerRef.offsetTop,
                    moveDirection: undefined,
                });

                containerRef.addEventListener('touchmove', this._onMobileTouchMove, false);
                containerRef.addEventListener('touchend', this._onMobileTouchEnd, false);
            }

        }
    };



    /**
   * Mobile phone finger press and move
   * @param event
   */
    _onMobileTouchMove = (event: TouchEvent): void => {

        event.preventDefault();

        const endX = event.targetTouches[0].clientX;
        const endY = event.targetTouches[0].pageY;


        const direction = getSlideDirection(this.position.startPosition.pageX, this.position.startPosition.pageY, endX, endY);
        if(typeof this.position.startPosition.moveDirection === 'undefined'){
            this.position.startPosition.moveDirection = direction;
        }
        if(this.props.isDebug && logEnable.onMobileTouchMove) log.printInText(`[_onMobileTouchMove] ${this.position.startPosition.moveDirection}`);


        // 判斷一開始的移動方向
        if(this.position.startPosition.moveDirection === EDirection.vertical){
            // 垂直移動

        }else if(this.position.startPosition.moveDirection === EDirection.horizontal){
            // 水平移動
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

            this.position.touchStart({
                pageX: event.clientX,
                pageY: event.clientY,
                x: event.clientX - movePosition.x,
                y: event.clientY - containerRef.offsetTop,
            });


            if(this.resetDurationTimer) clearTimeout(this.resetDurationTimer);

            this._elementMove(this.position.startPosition.pageX);

            const rootRef = this.rootRef.current;
            if(rootRef){
                rootRef.addEventListener('mouseleave', this._onWebMouseEnd, false);
            }
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
            const rootRef = this.rootRef.current;
            if(rootRef){
                rootRef.removeEventListener('mouseleave', this._onWebMouseEnd, false);
            }

            containerRef.removeEventListener('mousemove', this._onWebMouseMove, false);
            containerRef.removeEventListener('mouseup', this._onWebMouseEnd, false);
        }

        this._elementMoveDone();
    };


    /**
     * 加上狀態讓其他元素不會影響滑動
     * @param isEnable
     */
    _setOtherTouch = (isEnable: boolean) => {
        if(this.pageGroupRef.current){
            this.pageGroupRef.current.setAttribute('data-touch', isEnable ? 'true': 'false');
        }
        if(this.navGroupRef.current){
            this.navGroupRef.current.setAttribute('data-touch', isEnable ? 'true': 'false');
        }
    };

    /**
   * final move execution
   * @param moveX Move the X-axis
   */
    _elementMove = (moveX: number): void => {
        if(this.props.isDebug && logEnable.elementMove) log.printInText('[_elementMove]');

        this._setOtherTouch(false);



        const containerRef = this.containerRef?.current;

        if (containerRef && this.rwdMedia.setting.isEnableMouseMove && this.slideItemRefs.current) {
            // console.log('this.position.startPosition.x', this._isSyncControl(), moveX);
            const translateX = calcMoveTranslatePx(this.position.startPosition.x, moveX);
            const percentage = this._getMovePercentage(translateX);


            containerRef.style.transform = `translate(${translateX}px, 0px)`;
            containerRef.style.transitionDuration = '0ms';

            // 取得移動進度
            // if(this.props.onElementMove){
            //     this.props.onElementMove(this.activeActualIndex, percentage);
            // }

            // 同步控制
            this._syncControlMove(percentage);


            // 更改顯示在第幾個 (父元件使用可判定樣式設定)
            const slideItemRefs = this.slideItemRefs?.current;
            if(slideItemRefs){
                const activeActualIndex = Math.round(percentage);
                slideItemRefs
                    .forEach((row, index) => {
                        if(checkInRange(index, activeActualIndex, slideItemRefs.length)){
                            row.setAttribute('data-active', 'true');
                        } else if (row?.dataset.active) {
                            row.removeAttribute('data-active');
                        }
                    });
            }


            // 更改顯示在第幾頁的樣式 (父元件使用可判定樣式設定)
            // const pageRefs = this.pageRefs?.current;
            // if (pageRefs && this.info.isVisiblePagination && this.activePage > 0) {
            //     const activeActualIndex = Math.round(percentage);
            //     pageRefs.forEach((row, index) => {
            //         if(row && row.setAttribute !== null) {
            //             if (checkInRange(index, activeActualIndex, slideItemRefs.length)) {
            //                 row.setAttribute('data-active', 'true');
            //             } else if(row.dataset.active) {
            //                 row.removeAttribute('data-active');
            //             }
            //         }
            //
            //     });
            // }



        }

    };




    _syncControlMove = (percentage: number) => {
        if(this.props.syncControlRefs?.current){
            const syncControl = this.props.syncControlRefs.current;
            // 將進度比例換算成 movePx
            const moveX = syncControl._getPercentageToMovePx(percentage);
            const x = syncControl.slideItemRefs.current[0].clientWidth;
            
            syncControl.position.touchStart({
                pageX: 0,
                pageY: 0,
                x: this.rwdMedia.setting.isEnableLoop ? -x : 0,
                // x: this.rwdMedia.setting.isEnableLoop ? 0 : 0,
                y: 0,
                moveDirection: undefined,
            });

            syncControl._elementMove(moveX);
        }
    };

    _syncControlDone = (targetIndex: number) => {
        if(this.props.syncControlRefs?.current){
            const syncControl = this.props.syncControlRefs.current;
            syncControl.goToActualIndex(targetIndex);
        }
    };


    /**
   * The object movement ends (confirm the stop position and which Index position should be sucked)
   */
    _elementMoveDone = (): void => {
        if(this.props.isDebug && logEnable.elementMoveDone) log.printInText('[_elementMoveDone]');

        const slideItemRefs = this.slideItemRefs?.current;
        if(slideItemRefs){
            const active = slideItemRefs.find(row => row.dataset.active === 'true');
            if(active){
                const activeActualIndex = Number(active.dataset.actual);
                this.goToActualIndex(activeActualIndex);

                const activeSourceIndex = Number(active.dataset.source);
                this._syncControlDone(activeSourceIndex);
            }
        }

        this._setOtherTouch(true);
    };


    /**
     * Move Percentage
     * @param movePx
     */
    _getMovePercentage = (movePx: number) => {
        const slideCurrWidth = this.slideItemRefs.current[this.activeActualIndex].clientWidth;
        const startPosition = this._getStartPosition(slideCurrWidth);
        return getMovePercentage(movePx, startPosition, slideCurrWidth);
    };


    /**
     * Percentage Move Percentage
     * @param translateX
     */
    _getPercentageToMovePx = (percentage: number) => {
        const slideCurrWidth = this.slideItemRefs.current[this.activeActualIndex].clientWidth;

        const initStart = this._getStartPosition(slideCurrWidth);
        return initStart - (slideCurrWidth * percentage);
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

        if (this.rwdMedia.setting.isEnableLoop && this.rwdMedia.setting.isEnableAutoPlay && autoPlayTime > 0 && this.info.pageTotal > 1) {
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

    private _onResize2 = () => {
        const {windowSize} = this.state;
        if (windowSize !== this.rwdMedia.size) {
            if(this.props.isDebug && logEnable.handleResizeDiff) log.printInText(`[_handleResize] diff windowSize: ${windowSize} -> ${this.rwdMedia.size}px`);
            this.setState({windowSize: this.rwdMedia.size});
        }else{
            this.goToPage(1, false);
        }
    }


    /**
   * When dealing with changing screen size
   */
    _onResize = () => {
        const {breakpoints} = this.props;
        const {windowSize} = this.state;
        if(this.props.isDebug && logEnable.handleResize) log.printInText(`[_handleResize] windowSize: ${windowSize}px`);

        const selectSize = getSizeByRange(window.innerWidth, Object.keys(breakpoints).map(Number));

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

        const selectSize = getSizeByRange(window.innerWidth, Object.keys(breakpoints).map(Number));
        if (windowSize !== selectSize) {
            if(this.props.isDebug && logEnable.handleResize) log.printInText('[_onOrientationchange] set windowSize');
            this.setState({windowSize: selectSize});

        }else{
            if(this.props.isDebug && logEnable.handleResize) log.printInText('[_onOrientationchange] goToPage 1');
            setTimeout(() => {
                this.goToPage(1, false);
            }, 400);

        }
    };


    /**
   * go to next page
   */
    toNext = (): void => {

        const nextPage = this.getNextPage();
        const formatElement = this.info?.formatElement ?? [];
        const activeActual = formatElement[this.activeActualIndex];

        getNextIndex(
            activeActual,
            {
                nextPage: nextPage,
                residue: this.info.residue,
                pageTotal: this.info.pageTotal,
                slideTotal: this.info.formatElement.length,
                isOverflowPage: nextPage > this.info.pageTotal,
                isOverflowIndex: this.getNextPageFirstIndex() > this.getMaxIndex(),
            },
            {
                slidesPerGroup: this.rwdMedia.setting.slidesPerGroup,
                slidesPerViewActual: this.rwdMedia.setting.slidesPerViewActual,
                isLoopMode: this.rwdMedia.setting.isEnableLoop,
            }
        )
            .forEach(action => this.goToActualIndex(action.index, action.isUseAnimation));

    };


    /**
   * go to previous
   */
    toPrev = (): void => {
        const formatElement = this.info?.formatElement ? this.info.formatElement : [];

        if (formatElement[this.activeActualIndex].isClone) {

            this.goToActualIndex(formatElement[this.activeActualIndex].matchIndex, false);
            this.goToPage(this.info.pageTotal - 1);

        } else if (this.rwdMedia.setting.isEnableLoop && this.activePage === 1 && this.info.residue > 0) {
            // 檢查若為Loop(第一頁移動不整除的時候, 移動位置需要復歸到第一個)
            this.goToActualIndex(this.activeActualIndex - this.info.residue);

        } else if (this.rwdMedia.setting.slidesPerViewActual < this.info.formatElement.length) {
            // Normal move to prev
            this.goToActualIndex(this.activeActualIndex - this.rwdMedia.setting.slidesPerGroup);
        }
    };


    /**
   * go to page
   * ex: slideView: 2, slideGroup: 2, total: 4
   * page1 -> (1-1) * 2) + 1 + (firstIndex -1) = 1
   */
    goToPage = (page: number, isUseAnimation = true): void => {
        const slideIndex = getSlideIndex(page, this.rwdMedia.setting.slidesPerGroup, this.info.actual.firstIndex);
        this.goToActualIndex(slideIndex, isUseAnimation);
    };

    /**
   * Sync Carousel state
   */
    _handleSyncCarousel = () => {


        // if(this.props.setCarousel){
        //     this.props.setCarousel({
        //         goToPage: this.goToPage,
        //         toNext: this.toNext,
        //         toPrev: this.toPrev,
        //         info: this.info,
        //         activePage: this.activePage,
        //         activeActualIndex: this.activeActualIndex,
        //     });
        // }
    };


    /**
   * Get the target item distance width(px)
   * @param slideIndex
   */
    _getMoveDistance = (slideIndex: number): number => {
        if (this.slideItemRefs.current) {
            const slideItemRef = this.slideItemRefs.current[slideIndex];
            if (slideItemRef) {
                return getMoveDistance(slideItemRef.offsetLeft, this._getStartPosition(slideItemRef.clientWidth));
            }
        }

        return 0;
    };


    /**
     * 取得初始距離
     * @param slideItemWidth
     */
    _getStartPosition = (slideItemWidth: number) => {
        return getStartPosition(this.rwdMedia.setting.isCenteredSlides,
            {
                slidesPerView: this.rwdMedia.setting.slidesPerView,
                slidesPerViewActual: this.rwdMedia.setting.slidesPerViewActual,
            },
            {
                containerWidth: this.rootRef.current.clientWidth,
                currItemWidth: slideItemWidth,
            }
        );
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
                const className = containerRef.classList;
                if(!className.contains(elClassName.containerInit)){
                    className.add(elClassName.containerInit);
                }

                containerRef.style.transform = `translate(${position}px, 0px)`;
                containerRef.style.transitionDuration = isUseAnimation
                    ? `${moveTime}ms`
                    : '0ms';


                if(isUseAnimation){
                    if(this.resetDurationTimer) clearTimeout(this.resetDurationTimer);
                    this.resetDurationTimer = setTimeout(() => {
                        containerRef.style.transitionDuration = '0ms';
                    }, moveTime / 1.5);
                }

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
                slideItemRefs
                    // .filter(row => isNotEmpty(row))
                    .forEach((row, index) => {
                        if (index === this.activeActualIndex) {
                            row.setAttribute('data-active', 'true');
                        } else if (row?.dataset.active) {
                            row.removeAttribute('data-active');
                        }
                    });
            }



            // 更改顯示在第幾頁的樣式 (父元件使用可判定樣式設定)
            const pageRefs = this.pageRefs?.current;
            if (pageRefs && this.info.isVisiblePagination && this.activePage > 0) {
                pageRefs.forEach((row, index) => {
                    if(row && row.setAttribute !== null) {
                        if (this.activePage === index + 1) {
                            row.setAttribute('data-active', 'true');
                        } else if(row?.dataset.active) {
                            row.removeAttribute('data-active');
                        }
                    }

                });
            }

            // 結束移動後再繼續自動模式
            this._checkAndAutoPlay();

            this._handleSyncCarousel();

            if(this.props.onElementDone){
                this.props.onElementDone(slideIndex);
            }
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

        return (<div
            ref={this.navGroupRef}
            className={elClassName.navGroup}
        >
            <button type="button" className={elClassName.navPrevButton} onClick={() => this.toPrev()}>
                <div className={elClassName.navIcon}>
                    <ArrowIcon/>
                </div>
            </button>
            <button type="button" className={elClassName.navNextButton} onClick={() => this.toNext()}>
                <div className={elClassName.navIcon}>
                    <ArrowIcon/>
                </div>
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
        const {style, className, isDebug} = this.props;
        const {windowSize} = this.state;


        // Generate the desired style (note the trailing ;)
        const rootStyle: string = [
            `padding-top: ${this.rwdMedia.setting.aspectRatio && this.rwdMedia.setting.slidesPerView !== 'auto' ? getPaddingBySize(this.rwdMedia.setting.aspectRatio, this.rwdMedia.setting.slidesPerView): '0'};`,
            `height: ${this.rwdMedia.setting.staticHeight ? `${this.rwdMedia.setting.staticHeight}`: 'inherit'};`,
        ].join('');
        const slideItemStyle: string = [
            `flex: ${this.rwdMedia.setting.slidesPerView === 'auto' ? '0 0 auto;-webkit-flex: 0 0 auto;' : `1 0 ${100 / this.rwdMedia.setting.slidesPerViewActual}%`};`,
            `padding-left: ${this.rwdMedia.setting.spaceBetween / 2}px;`,
            `padding-right: ${this.rwdMedia.setting.spaceBetween / 2}px;`,
        ].join('');


        return (
            <BearCarouselProvider
                slidesPerView={this.rwdMedia.setting.slidesPerView}
                staticHeight={this.rwdMedia.setting.staticHeight}
            >
                <div
                    id={this._carouselId}
                    style={style}
                    className={[className, elClassName.root].join(' ').trim()}
                    data-gpu-render={this._device === EDevice.desktop ? 'true': undefined}
                    data-per-view-auto={this.rwdMedia.setting.slidesPerView === 'auto'}
                    data-mouse-move={this.rwdMedia.setting.isEnableMouseMove}
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
                    <>
                        {this.info.isVisibleNavButton && this._renderNavButton()}
                    </>

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
                                                <div className={elClassName.cloneIcon}>
                                                    <CloneIcon/>
                                                </div>
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
                        <div
                            ref={this.pageGroupRef}
                            className={elClassName.paginationGroup}
                        >
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


