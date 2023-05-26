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
import SlideSettingManager from './manager/SlideSettingManager';
import WindowSizeCalculator from './manager/WindowSizeCalculator';
import SlideItemManager from './manager/SlideItemManager';
import SlideItem from './components/SlideItem';
import ElManager from './manager/ElManager';
import PositionManager from './manager/PositionManager';
import {DesktopTouchEvent, MobileTouchEvent} from './manager/DragEvent';



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
    positionManager: PositionManager;
    elManager: ElManager;


    constructor(props: IBearCarouselProps) {
        super(props);

        // @ts-ignore
        // this.slideItemRefs['current'] = [];
        // @ts-ignore
        // this.pageRefs['current'] = [];

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
        const defaultBreakpoint = {slidesPerView, slidesPerGroup, aspectRatio, staticHeight, spaceBetween, isCenteredSlides, isEnableNavButton, isEnablePagination, isEnableMouseMove, isEnableAutoPlay, isEnableLoop};

        this.sizeManager = new WindowSizeCalculator(breakpoints);
        this.settingManager = new SlideSettingManager(breakpoints, defaultBreakpoint);
        this.slideItem = new SlideItemManager(this.settingManager, data);
        this.positionManager = new PositionManager();
        this.elManager = new ElManager({
            positionManager: this.positionManager,
            slideSettingManager: this.settingManager,
            slideItemManager: this.slideItem
        });

        // this.info = info;
        this.state = {
            windowSize: getSizeByRange(window.innerWidth, Object.keys(props.breakpoints).map(Number))
        };

    }


    componentDidMount() {
        if(this.props.isDebug && logEnable.componentDidMount) log.printInText('[componentDidMount]');

        const {page} = this.slideItem.info;

        const {containerEl} = this.elManager;
        if (containerEl) {
            // Move to the correct position for the first time
            if(page.pageTotal > 0){
                this.elManager.slideToPage(this.props.defaultActivePage ?? 1, false);
            }

            // End of moving animation (Need to return to the position, to be fake)


            window.addEventListener('focus', this._onWindowFocus, false);
            window.addEventListener('blur', this._onWindowBlur, false);
            window.addEventListener(resizeEvent[this._device], this._onResize2, {passive: false});


            switch (this._device){
            case EDevice.mobile:
                containerEl.addEventListener('touchstart', this._onMobileTouchStart, {passive: false});
                break;
            case EDevice.desktop:
                containerEl.addEventListener('mousedown', this._onWebMouseStart, {passive: false});
                break;

            }
        }

        this._handleSyncCarousel();

    }

    componentWillUnmount() {
        if(this.props.isDebug && logEnable.componentWillUnmount) log.printInText('[componentWillUnmount]');
        if (this.timer) clearTimeout(this.timer);



        const {containerEl} = this.elManager;
        window.removeEventListener(resizeEvent[this._device], this._onResize2, false);

        if (containerEl) {
            if (this._device === EDevice.mobile) {
                containerEl.removeEventListener('touchstart', this._onMobileTouchStart, false);
            } else {
                containerEl.removeEventListener('mousedown', this._onWebMouseStart, false);
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
            const defaultBreakpoint = {slidesPerView, slidesPerGroup, aspectRatio, staticHeight, spaceBetween, isCenteredSlides, isEnableNavButton, isEnablePagination, isEnableMouseMove, isEnableAutoPlay, isEnableLoop};

            this.settingManager.init(breakpoints, defaultBreakpoint);
            this.slideItem.init(data);

            // reset page position
            const $this = this;
            setTimeout(() => {
                $this.elManager.slideToPage(1, false);
            }, 0);

            this._handleSyncCarousel();

            return true;
        }

        return false;
    }


    _isSyncControl = () => !!this.props.syncControlRefs === false;
    checkActualIndexInRange = (slideIndex: number) => checkActualIndexInRange(slideIndex, {minIndex: this.slideItem.info.actual.minIndex, maxIndex: this.slideItem.info.actual.maxIndex});






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

        const {containerEl} = this.elManager;
        if(containerEl?.style.transitionDuration === '0ms'){
            this.elManager.slideResetToMatchIndex();
            this.positionManager.touchStart2(new MobileTouchEvent(event, containerEl));

            containerEl.addEventListener('touchmove', this._onMobileTouchMove, false);
            containerEl.addEventListener('touchend', this._onMobileTouchEnd, false);
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

        const {startPosition} = this.positionManager;

        const direction = getSlideDirection(startPosition.pageX, startPosition.pageY, endX, endY);
        if(typeof startPosition.moveDirection === 'undefined'){
            startPosition.moveDirection = direction;
        }
        if(this.props.isDebug && logEnable.onMobileTouchMove) log.printInText(`[_onMobileTouchMove] ${startPosition.moveDirection}`);


        // 判斷一開始的移動方向
        if(this.positionManager.startPosition.moveDirection === EDirection.vertical){
            // 垂直移動

        }else if(startPosition.moveDirection === EDirection.horizontal){
            // 水平移動
            const {containerEl} = this.elManager;
            if(containerEl){

                const moveX = containerEl.offsetLeft + event.targetTouches[0].pageX;
                this.elManager.dragMove(moveX);
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

        this.elManager.containerEl?.removeEventListener('touchmove', this._onMobileTouchMove, false);
        this.elManager.containerEl?.removeEventListener('touchend', this._onMobileTouchEnd, false);
        this.elManager.dragDone();
    };

    /**
   * Web mouse click
   * @param event
   */
    _onWebMouseStart = (event: MouseEvent): void => {
        if(this.props.isDebug && logEnable.onWebMouseStart) log.printInText('[_onWebMouseStart]');

        if (this.timer) clearTimeout(this.timer);

        this.elManager.slideResetToMatchIndex();
        const {containerEl} = this.elManager;
        if (containerEl) {
            this.positionManager.touchStart2(new DesktopTouchEvent(event, containerEl));

            if(this.resetDurationTimer) clearTimeout(this.resetDurationTimer);

            this.elManager.rootEl?.addEventListener('mouseleave', this._onWebMouseEnd, false);
            containerEl.addEventListener('mousemove', this._onWebMouseMove, false);
            containerEl.addEventListener('mouseup', this._onWebMouseEnd, false);
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

        this.elManager.dragMove(moveX);
    };

    /**
   * web mouse release
   * @param event
   */
    _onWebMouseEnd = (event: MouseEvent):void => {
        if(this.props.isDebug && logEnable.onWebMouseEnd) log.printInText('[_onWebMouseEnd]');

        event.preventDefault();
        this.elManager.rootEl?.removeEventListener('mouseleave', this._onWebMouseEnd, false);
        this.elManager.containerEl?.removeEventListener('mousemove', this._onWebMouseMove, false);
        this.elManager.containerEl?.removeEventListener('mouseup', this._onWebMouseEnd, false);
        this.elManager.dragDone();
    };




    // _syncControlMove = (percentage: number) => {
    //     if(this.props.syncControlRefs?.current){
    //         const syncControl = this.props.syncControlRefs.current;
    //         // 將進度比例換算成 movePx
    //         const moveX = syncControl._getPercentageToMovePx(percentage);
    //         const {slideItemEls} = syncControl.elManager;
    //         const x = slideItemEls[0].clientWidth;
    //
    //         syncControl.positionManager.touchStart({
    //             x: this.settingManager.setting.isEnableLoop ? -x : 0,
    //         });
    //
    //         syncControl._elementMove(moveX);
    //     }
    // };
    //
    // _syncControlDone = (targetIndex: number) => {
    //     if(this.props.syncControlRefs?.current){
    //         const syncControl = this.props.syncControlRefs.current;
    //         syncControl.goToActualIndex(targetIndex);
    //     }
    // };



    /**
     * Move Percentage
     * @param movePx
     */
    _getMovePercentage = (movePx: number) => {
        const {actual} = this.slideItem;
        const {slideItemEls} = this.elManager;
        const slideCurrWidth = slideItemEls[actual.activeIndex].clientWidth;
        const startPosition = this._getStartPosition(slideCurrWidth);
        return getMovePercentage(movePx, startPosition, slideCurrWidth);
    };


    /**
     * Percentage Move Percentage
     * @param translateX
     */
    _getPercentageToMovePx = (percentage: number) => {
        const {actual} = this.slideItem;
        const {slideItemEls} = this.elManager;
        const slideCurrWidth = slideItemEls[actual.activeIndex].clientWidth;

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
                this.elManager.slideToNextPage();
            }, autoPlayTime);
        }
    };


    /**
   * reset page position (LoopMode)
   *
   * PS: If the element is isClone then return to the position where it should actually be displayed
   */
    // _resetPosition = (): void => {
    //     if(this.props.isDebug && logEnable.resetPosition) log.printInText('[_resetPosition]');
    //     const {actual} = this.slideItem;
    //
    //     const formatElement = this.slideItem.info?.formatElement ? this.slideItem.info.formatElement : [];
    //
    //     if (formatElement[actual.activeIndex].isClone) {
    //         this.elManager.slideToActualIndex(formatElement[actual.activeIndex].matchIndex, false);
    //     }
    // };

    private _onResize2 = () => {
        const {windowSize} = this.state;
        if (windowSize !== this.sizeManager.size) {
            if(this.props.isDebug && logEnable.handleResizeDiff) log.printInText(`[_handleResize] diff windowSize: ${windowSize} -> ${this.sizeManager.size}px`);
            this.setState({windowSize: this.sizeManager.size});
        }else{
            this.elManager.slideToPage(1, false);
        }
    };


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
            this.elManager.slideToPage(1, false);
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
            const $elManager = this.elManager;
            setTimeout(() => {
                $elManager.slideToPage(1, false);
            }, 400);

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
        const {slideItemEls} = this.elManager;
        if (slideItemEls) {
            const slideItemRef = slideItemEls[slideIndex];
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
                containerWidth: this.elManager.rootEl.clientWidth,
                currItemWidth: slideItemWidth,
            }
        );
    };


    /**
   * Render left and right navigation blocks
   */
    _renderNavButton = () => {

        const {renderNavButton} = this.props;

        if (typeof renderNavButton !== 'undefined') {
            return <>
                {renderNavButton(this.elManager.slideToPrevPage, this.elManager.slideToNextPage)}
            </>;
        }

        return (<div
            ref={this.elManager.navGroupRef}
            className={elClassName.navGroup}
        >
            <button type="button" className={elClassName.navPrevButton} onClick={this.elManager.slideToPrevPage}>
                <div className={elClassName.navIcon}>
                    <ArrowIcon/>
                </div>
            </button>
            <button type="button" className={elClassName.navNextButton} onClick={this.elManager.slideToNextPage}>
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
                    ref={(el) => this.elManager.setPageRefs(el, i)}
                    key={`page_${i}`}
                    role='button'
                    onClick={() => this.elManager.slideToPage(i + 1)}
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
    _renderSlideItems(){
        const {isDebug} = this.props;
        const {actual, formatElement} = this.slideItem;
        return formatElement.map((row, i) => {
            const isActive = row.actualIndex === actual.activeIndex;

            return <SlideItem
                key={`carousel_${i}`}
                ref={(el) => this.elManager.setSlideItemRefs(el, i)}
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
            ref={this.elManager.pageGroupRef}
            className={elClassName.paginationGroup}
        >
            {page.pageTotal > 0 && this._renderPagination()}
        </div>;
    }

    /**
     * Item CSS style
     */
    private _renderStyle() {
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
    private _renderWindowSize() {
        const {windowSize} = this.state;
        return <div className={elClassName.testWindowSize}>
            {windowSize}
        </div>;
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
                    {this._renderStyle()}

                    {this.slideItem.info.isVisibleNavButton && this._renderNavButton()}

                    <div className={elClassName.content}>
                        <div ref={this.elManager.containerRef} className={elClassName.container}>
                            {this._renderSlideItems()}
                        </div>
                    </div>

                    {this.slideItem.info.isVisiblePagination && this.renderPagination()}

                    {isDebug && this._renderWindowSize()}
                </div>
            </BearCarouselProvider>

        );
    }
}


export default BearCarousel;


