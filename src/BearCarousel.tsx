import * as React from 'react';
import {
    checkIsMobile,
    getPaddingBySize,
    // getMediaInfo,
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
import SlideSettingManager from './manager/SlideSettingManager';
import WindowSizeCalculator from './manager/WindowSizeCalculator';
import SlideItemManager from './manager/SlideItemManager';
import SlideItem from './components/SlideItem';
import ElManager from './manager/ElManager';



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
const touchEvent: Record<EDevice, string> = {
    [EDevice.mobile]: 'touchmove',
    [EDevice.desktop]:  'mousedown'
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
    // activePage = 0;        // real page location
    // activeActualIndex = 0; // real item index location

    slideItem: SlideItemManager;

    state = {
        windowSize: 0
    };


    settingManager: SlideSettingManager;
    sizeManager: WindowSizeCalculator;
    position: Position;

    // Ref
    rootRef: React.RefObject<HTMLDivElement> = React.createRef();
    containerRef: React.RefObject<HTMLDivElement> = React.createRef();
    slideItemRefs: React.RefObject<Array<HTMLDivElement>> = React.createRef();
    pageRefs: React.RefObject<Array<HTMLDivElement>> = React.createRef();
    pageGroupRef: React.RefObject<HTMLDivElement> = React.createRef();
    navGroupRef: React.RefObject<HTMLDivElement> = React.createRef();
    // syncControlRefs: React.RefObject<BearCarousel> = React.createRef();
    elManager: ElManager;


    constructor(props: IBearCarouselProps) {
        super(props);

        // @ts-ignore
        this.slideItemRefs['current'] = [];
        // @ts-ignore
        this.pageRefs['current'] = [];

        this._device = checkIsMobile() ? EDevice.mobile : EDevice.desktop;
        // const {rwdMedia, info} = getMediaInfo(props);

        const {
            data,
            slidesPerGroup,
            aspectRatio,
            staticHeight,
            spaceBetween,
            isCenteredSlides,
            isEnableNavButton,
            isEnablePagination,
            isEnableMouseMove,
            isEnableAutoPlay,
            isEnableLoop,

            breakpoints,
        } = props;
        const slidesPerView = typeof props.slidesPerView === 'number' && props.slidesPerView <= 0 ? 1: props.slidesPerView;
        const defaultBreakpoint = {slidesPerView, slidesPerGroup, aspectRatio, staticHeight, spaceBetween, isCenteredSlides, isEnableNavButton, isEnablePagination, isEnableMouseMove, isEnableAutoPlay, isEnableLoop}

        this.sizeManager = new WindowSizeCalculator(breakpoints);
        this.settingManager = new SlideSettingManager(breakpoints, defaultBreakpoint);
        this.slideItem = new SlideItemManager(this.settingManager, data);
        this.position = new Position();
        this.elManager = new ElManager();

        // this.info = info;
        this.state = {
            windowSize: getSizeByRange(window.innerWidth, Object.keys(props.breakpoints).map(Number))
        };

    }


    componentDidMount() {
        if(this.props.isDebug && logEnable.componentDidMount) log.printInText('[componentDidMount]');

        const {page} = this.slideItem.info;

        const containerRef = this.containerRef?.current;
        if (containerRef) {
            // Move to the correct position for the first time
            if(page.pageTotal > 0){
                this.slideItem.slideToPage(this.props.defaultActivePage ?? 1, false);
            }

            // End of moving animation (Need to return to the position, to be fake)


            window.addEventListener('focus', this._onWindowFocus, false);
            window.addEventListener('blur', this._onWindowBlur, false);

            window.addEventListener(resizeEvent[this._device], this._onResize2, {passive: false});

            if (this._device === EDevice.mobile) {
                containerRef.addEventListener('touchstart', this._onMobileTouchStart, {passive: false});
            } else {
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

            const {
                data,
                slidesPerGroup,
                aspectRatio,
                staticHeight,
                spaceBetween,
                isCenteredSlides,
                isEnableNavButton,
                isEnablePagination,
                isEnableMouseMove,
                isEnableAutoPlay,
                isEnableLoop,

                breakpoints,
            } = nextProps;

            // const {rwdMedia, info} = getMediaInfo(nextProps);
            const slidesPerView = typeof nextProps.slidesPerView === 'number' && nextProps.slidesPerView <= 0 ? 1: nextProps.slidesPerView;
            const defaultBreakpoint = {slidesPerView, slidesPerGroup, aspectRatio, staticHeight, spaceBetween, isCenteredSlides, isEnableNavButton, isEnablePagination, isEnableMouseMove, isEnableAutoPlay, isEnableLoop}

            this.settingManager.init(breakpoints, defaultBreakpoint);
            this.slideItem.init(data);

            // reset page position
            const $this = this;
            setTimeout(() => {
                $this.slideItem.slideToPage(1, false);
            }, 0);

            this._handleSyncCarousel();

            return true;
        }

        return false;
    }


    _isSyncControl = () => !!this.props.syncControlRefs === false;
    checkActualIndexInRange = (slideIndex: number) => checkActualIndexInRange(slideIndex, {minIndex: this.slideItem.info.actual.minIndex, maxIndex: this.slideItem.info.actual.maxIndex});

    // getNextPage = () => getNextPage(this.activePage);
    getNextPageFirstIndex = () => getNextPageFirstIndex(this.settingManager.setting.isCenteredSlides, this.slideItem.actual.activeIndex, this.settingManager.setting.slidesPerGroup, this.settingManager.setting.slidesPerViewActual);
    getMaxIndex = () => getLastIndex(this.slideItem.info.formatElement.length);
    _getLoopResetIndex = () => getLoopResetIndex(this.slideItem.actual.activeIndex, this.slideItem.info.residue);





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

            const rootRef = this.elManager.root;
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

        if (containerRef && this.settingManager.setting.isEnableMouseMove && this.slideItemRefs.current) {
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
            // if (pageRefs && this.slideItem.info.isVisiblePagination && this.activePage > 0) {
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
                x: this.settingManager.setting.isEnableLoop ? -x : 0,
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
        const {actual} = this.slideItem;
        const slideCurrWidth = this.slideItemRefs.current[actual.activeIndex].clientWidth;
        const startPosition = this._getStartPosition(slideCurrWidth);
        return getMovePercentage(movePx, startPosition, slideCurrWidth);
    };


    /**
     * Percentage Move Percentage
     * @param translateX
     */
    _getPercentageToMovePx = (percentage: number) => {
        const {actual} = this.slideItem;
        const slideCurrWidth = this.slideItemRefs.current[actual.activeIndex].clientWidth;

        const initStart = this._getStartPosition(slideCurrWidth);
        return initStart - (slideCurrWidth * percentage);
    };


    /**
   * Check and autoplay feature
   */
    _checkAndAutoPlay = (): void => {
        const {autoPlayTime} = this.props;
        if(this.props.isDebug && logEnable.checkAndAutoPlay) log.printInText(`[_checkAndAutoPlay] autoPlayTime: ${autoPlayTime}`);

        const {page} = this.slideItem;

        // Clear the last timer
        if (this.timer) {
            clearTimeout(this.timer);
        }

        if (this.settingManager.setting.isEnableLoop && this.settingManager.setting.isEnableAutoPlay && autoPlayTime > 0 && page.pageTotal > 1) {
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
        const {actual} = this.slideItem;

        const formatElement = this.slideItem.info?.formatElement ? this.slideItem.info.formatElement : [];

        if (formatElement[actual.activeIndex].isClone) {
            this.goToActualIndex(formatElement[actual.activeIndex].matchIndex, false);
        }
    };

    private _onResize2 = () => {
        const {windowSize} = this.state;
        if (windowSize !== this.sizeManager.size) {
            if(this.props.isDebug && logEnable.handleResizeDiff) log.printInText(`[_handleResize] diff windowSize: ${windowSize} -> ${this.sizeManager.size}px`);
            this.setState({windowSize: this.sizeManager.size});
        }else{
            this.slideItem.slideToPage(1, false);
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
            this.slideItem.slideToPage(1, false);
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
            const $slideItem = this.slideItem;
            setTimeout(() => {
                $slideItem.slideToPage(1, false);
            }, 400);

        }
    };


    /**
   * go to next page
   */
    toNext = (): void => {

        const {nextPage, formatElement, page, actual, residue} = this.slideItem;
        const activeActual = formatElement[actual.activeIndex];

        getNextIndex(
            activeActual,
            {
                nextPage: nextPage,
                residue: residue,
                pageTotal: page.pageTotal,
                slideTotal: this.slideItem.info.formatElement.length,
                isOverflowPage: nextPage > page.pageTotal,
                isOverflowIndex: this.getNextPageFirstIndex() > this.getMaxIndex(),
            },
            {
                slidesPerGroup: this.settingManager.setting.slidesPerGroup,
                slidesPerViewActual: this.settingManager.setting.slidesPerViewActual,
                isLoopMode: this.settingManager.setting.isEnableLoop,
            }
        )
            .forEach(action => this.goToActualIndex(action.index, action.isUseAnimation));

    };


    /**
   * go to previous
   */
    toPrev = (): void => {
        const {nextPage, formatElement, page, actual, residue} = this.slideItem;

        const activeSlideItem = formatElement[actual.activeIndex];
        if (activeSlideItem && activeSlideItem.isClone) {

            this.goToActualIndex(activeSlideItem.matchIndex, false);
            this.slideItem.slideToPage(page.pageTotal - 1);

        } else if (this.settingManager.setting.isEnableLoop && page.activePage === 1 && residue > 0) {
            // 檢查若為Loop(第一頁移動不整除的時候, 移動位置需要復歸到第一個)
            this.goToActualIndex(actual.activeIndex - this.slideItem.info.residue);

        } else if (this.settingManager.setting.slidesPerViewActual < this.slideItem.info.formatElement.length) {
            // Normal move to prev
            this.goToActualIndex(actual.activeIndex - this.settingManager.setting.slidesPerGroup);
        }
    };


    /**
   * go to page
   * ex: slideView: 2, slideGroup: 2, total: 4
   * page1 -> (1-1) * 2) + 1 + (firstIndex -1) = 1
   */
    // goToPage = (page: number, isUseAnimation = true): void => {
    //     const slideIndex = getSlideIndex(page, this.settingManager.setting.slidesPerGroup, this.slideItem.info.actual.firstIndex);
    //     this.goToActualIndex(slideIndex, isUseAnimation);
    // };



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
        return getStartPosition(this.settingManager.setting.isCenteredSlides,
            {
                slidesPerView: this.settingManager.setting.slidesPerView,
                slidesPerViewActual: this.settingManager.setting.slidesPerViewActual,
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

            // 計算目前正在第幾頁頁數
            let activePage = 1;
            if (typeof this.slideItem.info.formatElement[slideIndex] !== 'undefined') {
                activePage = this.slideItem.info.formatElement[slideIndex].inPage;
            }
            this.slideItem.setActiveActual(slideIndex, activePage);


            // 移動EL位置
            const position = this._getMoveDistance(slideIndex);
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
            const {page} = this.slideItem;
            if (rootRef) {
                if (page.activePage === 1) {
                    rootRef.setAttribute('data-position', page.activePage === page.pageTotal ? 'hidden' : 'first');

                }else{
                    rootRef.setAttribute('data-position', page.activePage === page.pageTotal ? 'last': '');
                }
            }

            // 更改顯示在第幾個 (父元件使用可判定樣式設定)
            const slideItemRefs = this.slideItemRefs?.current;
            if(slideItemRefs){
                slideItemRefs
                    // .filter(row => isNotEmpty(row))
                    .forEach((row, index) => {
                        if (index === slideIndex) {
                            row.setAttribute('data-active', 'true');
                        } else if (row?.dataset.active) {
                            row.removeAttribute('data-active');
                        }
                    });
            }



            // 更改顯示在第幾頁的樣式 (父元件使用可判定樣式設定)
            const pageRefs = this.pageRefs?.current;
            if (pageRefs && this.slideItem.info.isVisiblePagination && page.activePage > 0) {
                pageRefs.forEach((row, index) => {
                    if(row && row.setAttribute !== null) {
                        if (page.activePage === index + 1) {
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
            return <>
                {renderNavButton(() => this.toPrev(), () => this.toNext())}
            </>;
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
        const {page} = this.slideItem;
        const pageElement = [];

        for (let i = 0; i < page.pageTotal; i++) {
            pageElement.push(
                <div
                    ref={(el: any) => {
                        // @ts-ignore
                        this.pageRefs.current[i] = el;
                        return false;
                    }}
                    key={`page_${i}`}
                    role='button'
                    onClick={() => this.slideItem.slideToPage(i + 1)}
                    className={elClassName.paginationButton}
                    data-active={page.activePage === i + 1 ? true : undefined}
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

    /**
     * render slide item
     */
    renderSlideItems(){
        const {isDebug} = this.props;
        const {actual} = this.slideItem;
        return this.slideItem.info.formatElement.map((row, i) => {
            const isActive = row.actualIndex === actual.activeIndex;

            return <SlideItem
                key={`carousel_${i}`}
                ref={(el: HTMLDivElement) => {
                    this.slideItemRefs.current[i] = el;
                    return false;
                }}
                element={row.element}
                actualIndex={row.actualIndex}
                matchIndex={row.matchIndex}
                inPage={row.inPage}
                sourceIndex={row.sourceIndex}
                isActive={isActive}
                isClone={row.isClone}
                isDebug={isDebug}
                index={i}
            />;
        });
    }

    /**
     * Page number navigation buttons
     */
    renderPagination() {
        const {page} = this.slideItem;

        return <div
            ref={this.pageGroupRef}
            className={elClassName.paginationGroup}
        >
            {page.pageTotal > 0 && this._renderPagination()}
        </div>;
    }

    /**
     * Item CSS style
     */
    renderStyle() {
        // Generate the desired style (note the trailing ;)
        const rootStyle: string = [
            `padding-top: ${this.settingManager.setting.aspectRatio && this.settingManager.setting.slidesPerView !== 'auto' ? getPaddingBySize(this.settingManager.setting.aspectRatio, this.settingManager.setting.slidesPerView): '0'};`,
            `height: ${this.settingManager.setting.staticHeight ? `${this.settingManager.setting.staticHeight}`: 'inherit'};`,
        ].join('');
        const slideItemStyle: string = [
            `flex: ${this.settingManager.setting.slidesPerView === 'auto' ? '0 0 auto;-webkit-flex: 0 0 auto;' : `1 0 ${100 / this.settingManager.setting.slidesPerViewActual}%`};`,
            `padding-left: ${this.settingManager.setting.spaceBetween / 2}px;`,
            `padding-right: ${this.settingManager.setting.spaceBetween / 2}px;`,
        ].join('');

        {/*  */}
        return <style scoped>{`
#${this._carouselId}{${rootStyle}}
#${this._carouselId} .${elClassName.slideItem}{${slideItemStyle}}
              `}</style>;
    }

    /**
     * Display current detection size (debug)
     */
    renderWindowSize() {
        const {windowSize} = this.state;
        return <div className={elClassName.testWindowSize}>
            {windowSize}
        </div>
    }


    render() {
        const {style, className, isDebug} = this.props;
        return (
            <BearCarouselProvider
                slidesPerView={this.settingManager.setting.slidesPerView}
                staticHeight={this.settingManager.setting.staticHeight}
            >
                <div
                    id={this._carouselId}
                    style={style}
                    className={[className, elClassName.root].join(' ').trim()}
                    data-gpu-render={this._device === EDevice.desktop ? 'true': undefined}
                    data-per-view-auto={this.settingManager.setting.slidesPerView === 'auto'}
                    data-mouse-move={this.settingManager.setting.isEnableMouseMove}
                    data-actual={`${this.slideItem.info.actual.minIndex},${this.slideItem.info.actual.firstIndex}-${this.slideItem.info.actual.lastIndex},${this.slideItem.info.actual.maxIndex}`}
                    data-debug={isDebug ? 'true':undefined}
                    ref={this.elManager.rootRef}
                >
                    {this.renderStyle()}

                    {this.slideItem.info.isVisibleNavButton && this._renderNavButton()}

                    <div className={elClassName.content}>
                        <div ref={this.containerRef} className={elClassName.container}>
                            {this.renderSlideItems()}
                        </div>
                    </div>

                    {this.slideItem.info.isVisiblePagination && this.renderPagination()}

                    {isDebug && this.renderWindowSize()}
                </div>
            </BearCarouselProvider>

        );
    }
}


export default BearCarousel;


