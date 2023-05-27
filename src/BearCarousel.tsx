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
import Configurator from './manager/Configurator';
import WindowSizeCalculator from './manager/WindowSizeCalculator';
import Stater from './manager/Stater';
import SlideItem from './components/SlideItem';
import ElManager from './manager/ElManager';
import PositionManager from './manager/PositionManager';
import {DesktopTouchEvent, MobileTouchEvent} from './manager/DragEvent';
import Controller from './manager/Controller';
import AutoPlayer from './manager/AutoPlayer';



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

    resetDurationTimer?: any;
    // activePage = 0;        // real page location
    // activeActualIndex = 0; // real item index location


    state = {
        windowSize: 0
    };

    _stater: Stater;
    _configurator: Configurator;
    sizeManager: WindowSizeCalculator;
    positionManager: PositionManager;
    elManager: ElManager;
    _controller: Controller;
    _autoPlayer: AutoPlayer;


    constructor(props: IBearCarouselProps) {
        super(props);

        // @ts-ignore
        // this._staterRefs['current'] = [];
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

            moveTime,
            defaultActivePage,
            autoPlayTime,
            isDebug
        } = props;
        const slidesPerView = typeof props.slidesPerView === 'number' && props.slidesPerView <= 0 ? 1: props.slidesPerView;
        const setting = {
            slidesPerView, slidesPerGroup, aspectRatio, staticHeight, spaceBetween, isCenteredSlides, isEnableNavButton, isEnablePagination, isEnableMouseMove, isEnableAutoPlay, isEnableLoop,
            moveTime,
            defaultActivePage,
            autoPlayTime,
            isDebug
        };


        this.sizeManager = new WindowSizeCalculator(breakpoints);
        this._configurator = new Configurator(breakpoints, setting);
        this._stater = new Stater(this._configurator, data);
        this.positionManager = new PositionManager();
        this.elManager = new ElManager({
            positionManager: this.positionManager,
            slideSettingManager: this._configurator,
            slideItemManager: this._stater
        });

        this._controller = new Controller({
            positionManager: this.positionManager,
            configurator: this._configurator,
            stater: this._stater,
            elementor: this.elManager
        });

        console.log('this._configurator', this._configurator);
        this._autoPlayer = new AutoPlayer(this._configurator, this._controller);

        // this.info = info;
        this.state = {
            windowSize: getSizeByRange(window.innerWidth, Object.keys(props.breakpoints).map(Number))
        };

    }


    componentDidMount() {
        if(this.props.isDebug && logEnable.componentDidMount) log.printInText('[componentDidMount]');

        const {page} = this._stater.info;

        this._autoPlayer.play();

        const {containerEl} = this.elManager;
        if (containerEl) {
            // Move to the correct position for the first time
            if(page.pageTotal > 0){
                this._controller.slideToPage(this.props.defaultActivePage ?? 1, false);
            }

            // End of moving animation (Need to return to the position, to be fake)

            window.addEventListener('focus', this._autoPlayer.play.bind(this._autoPlayer), false);
            window.addEventListener('blur', this._autoPlayer.pause.bind(this._autoPlayer), false);
            window.addEventListener(resizeEvent[this._device], this._onResize, {passive: false});


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

        this._autoPlayer.pause();
        window.removeEventListener('focus', this._autoPlayer.play.bind(this._autoPlayer), false);
        window.removeEventListener('blur', this._autoPlayer.pause.bind(this._autoPlayer), false);

        const {containerEl} = this.elManager;
        window.removeEventListener(resizeEvent[this._device], this._onResize, false);

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

            this._configurator.init(breakpoints, defaultBreakpoint);
            this._stater.init(data);

            // reset page position
            const $this = this;
            setTimeout(() => {
                $this._controller.slideToPage(1, false);
            }, 0);

            this._handleSyncCarousel();

            return true;
        }

        return false;
    }


    _isSyncControl = () => !!this.props.syncControlRefs === false;


    /**
   * mobile phone finger press start
   * @param event
   */
    _onMobileTouchStart = (event: TouchEvent): void => {
        if(this.props.isDebug && logEnable.onMobileTouchStart) log.printInText('[_onMobileTouchStart]');

        this._autoPlayer.pause();

        const {containerEl} = this.elManager;
        if(containerEl?.style.transitionDuration === '0ms'){
            this._controller.slideResetToMatchIndex();
            this.positionManager.touchStart2(new MobileTouchEvent(event), containerEl);

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

        const movePx = this.positionManager.touchMove(new MobileTouchEvent(event), this.elManager.containerEl);
        this._controller.dragMove(movePx);
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
        this._controller.dragDone();
    };

    /**
   * Web mouse click
   * @param event
   */
    _onWebMouseStart = (event: MouseEvent): void => {
        if(this.props.isDebug && logEnable.onWebMouseStart) log.printInText('[_onWebMouseStart]');

        this._autoPlayer.pause();

        this._controller.slideResetToMatchIndex();
        const {containerEl} = this.elManager;
        if (containerEl) {
            this.positionManager.touchStart2(new DesktopTouchEvent(event), containerEl);

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
        event.preventDefault();
        if(this.props.isDebug && logEnable.onWebMouseMove) log.printInText('[_onWebMouseMove]');

        const movePx = this.positionManager.touchMove(new DesktopTouchEvent(event), this.elManager.containerEl);
        this._controller.dragMove(movePx);
    };

    /**
   * web mouse release
   * @param event
   */
    _onWebMouseEnd = (event: MouseEvent):void => {
        event.preventDefault();
        if(this.props.isDebug && logEnable.onWebMouseEnd) log.printInText('[_onWebMouseEnd]');

        this.elManager.rootEl?.removeEventListener('mouseleave', this._onWebMouseEnd, false);
        this.elManager.containerEl?.removeEventListener('mousemove', this._onWebMouseMove, false);
        this.elManager.containerEl?.removeEventListener('mouseup', this._onWebMouseEnd, false);
        this._controller.dragDone();
    };



    /**
     * When dealing with changing screen size
     */
    private _onResize = () => {
        const {windowSize} = this.state;
        if (windowSize !== this.sizeManager.size) {
            if(this.props.isDebug && logEnable.handleResizeDiff) log.printInText(`[_handleResize] diff windowSize: ${windowSize} -> ${this.sizeManager.size}px`);
            this.setState({windowSize: this.sizeManager.size});
        }else{
            this._controller.slideToPage(1, false);
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
            const $controller = this._controller;
            setTimeout(() => {
                $controller.slideToPage(1, false);
            }, 400);

        }
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
    //             x: this._configurator.setting.isEnableLoop ? -x : 0,
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
   * Render left and right navigation blocks
   */
    _renderNavButton = () => {

        const {renderNavButton} = this.props;

        if (typeof renderNavButton !== 'undefined') {
            return <>
                {renderNavButton(this._controller.slideToPrevPage, this._controller.slideToNextPage)}
            </>;
        }

        return (<div
            ref={this.elManager._navGroupRef}
            className={elClassName.navGroup}
        >
            <button type="button" className={elClassName.navPrevButton} onClick={this._controller.slideToPrevPage}>
                <div className={elClassName.navIcon}>
                    <ArrowIcon/>
                </div>
            </button>
            <button type="button" className={elClassName.navNextButton} onClick={this._controller.slideToNextPage}>
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
        const {page} = this._stater;
        const pageElement = [];

        for (let i = 0; i < page.pageTotal; i++) {
            pageElement.push(
                <div
                    ref={(el) => this.elManager.setPageRefs(el, i)}
                    key={`page_${i}`}
                    role='button'
                    onClick={() => this._controller.slideToPage(i + 1)}
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
        const {actual, formatElement} = this._stater;
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
        const {page} = this._stater;

        return <div
            ref={this.elManager._pageGroupRef}
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
            `padding-top: ${this._configurator.setting.aspectRatio && this._configurator.setting.slidesPerView !== 'auto' ? getPaddingBySize(this._configurator.setting.aspectRatio, this._configurator.setting.slidesPerView): '0'};`,
            `height: ${this._configurator.setting.staticHeight ? `${this._configurator.setting.staticHeight}`: 'inherit'};`,
        ].join('');
        const slideItemStyle: string = [
            `flex: ${this._configurator.setting.slidesPerView === 'auto' ? '0 0 auto;-webkit-flex: 0 0 auto;' : `1 0 ${100 / this._configurator.setting.slidesPerViewActual}%`};`,
            `padding-left: ${this._configurator.setting.spaceBetween / 2}px;`,
            `padding-right: ${this._configurator.setting.spaceBetween / 2}px;`,
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
                slidesPerView={this._configurator.setting.slidesPerView}
                staticHeight={this._configurator.setting.staticHeight}
            >
                <div
                    id={this._carouselId}
                    style={style}
                    className={[className, elClassName.root].join(' ').trim()}
                    data-gpu-render={this._device === EDevice.desktop ? 'true': undefined}
                    data-per-view-auto={this._configurator.setting.slidesPerView === 'auto'}
                    data-mouse-move={this._configurator.setting.isEnableMouseMove}
                    data-actual={`${this._stater.info.actual.minIndex},${this._stater.info.actual.firstIndex}-${this._stater.info.actual.lastIndex},${this._stater.info.actual.maxIndex}`}
                    data-debug={isDebug ? 'true':undefined}
                    ref={this.elManager._rootRef}
                >
                    {this._renderStyle()}

                    {this._stater.info.isVisibleNavButton && this._renderNavButton()}

                    <div className={elClassName.content}>
                        <div ref={this.elManager._containerRef} className={elClassName.container}>
                            {this._renderSlideItems()}
                        </div>
                    </div>

                    {this._stater.info.isVisiblePagination && this.renderPagination()}

                    {isDebug && this._renderWindowSize()}
                </div>
            </BearCarouselProvider>

        );
    }
}


export default BearCarousel;


