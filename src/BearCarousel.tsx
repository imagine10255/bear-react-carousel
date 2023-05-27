import * as React from 'react';
import {booleanToDataAttr, checkIsMobile, getPaddingBySize, getSizeByRange} from './utils';
import log from './log';
import deepCompare from './deepCompare';
import {EDevice, IBearCarouselProps} from './types';
import elClassName from './el-class-name';
import {BearCarouselProvider} from './BearCarouselProvider';

import {ArrowIcon} from './Icon';
import Configurator from './manager/Configurator';
import WindowSizer from './manager/WindowSizer';
import Stater from './manager/Stater';
import SlideItem from './components/SlideItem';
import Elementor from './manager/Elementor';
import Locator from './manager/Locator';
import {DesktopTouchEvent, MobileTouchEvent} from './interface/DragEvent';
import Controller from './manager/Controller';
import AutoPlayer from './manager/AutoPlayer';

import './styles.css';
import WindowSize from './components/WindowSize';
import Page from './components/Page';


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

    resetDurationTimer?: any;
    // activePage = 0;        // real page location
    // activeActualIndex = 0; // real item index location


    state = {
        windowSize: 0
    };

    _stater: Stater;
    _configurator: Configurator;
    _windowSizer: WindowSizer;
    _locator: Locator;
    _elementor: Elementor;
    _controller: Controller;
    _autoPlayer: AutoPlayer;


    constructor(props: IBearCarouselProps) {
        super(props);
        this._device = checkIsMobile() ? EDevice.mobile : EDevice.desktop;

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


        this._windowSizer = new WindowSizer(breakpoints, this._device);
        this._configurator = new Configurator(breakpoints, setting);
        this._stater = new Stater(this._configurator, data);
        this._locator = new Locator();
        this._elementor = new Elementor({
            locator: this._locator,
            configurator: this._configurator,
            stater: this._stater
        });

        this._controller = new Controller({
            locator: this._locator,
            configurator: this._configurator,
            stater: this._stater,
            elementor: this._elementor
        });

        this._autoPlayer = new AutoPlayer({
            configurator: this._configurator,
            controller: this._controller,
        });

        // this.info = info;
        this.state = {
            windowSize: this._windowSizer.size
        };

    }


    componentDidMount() {
        if(this.props.isDebug && logEnable.componentDidMount) log.printInText('[componentDidMount]');

        const {page} = this._stater.info;


        const {containerEl} = this._elementor;
        if (containerEl) {
            // Move to the correct position for the first time
            if(page.pageTotal > 0){
                this._controller.slideToPage(this.props.defaultActivePage ?? 1, false);
            }

            // End of moving animation (Need to return to the position, to be fake)

            this._autoPlayer.mount();
            this._windowSizer.mount((windowSize) => {
                if(windowSize !== this.state.windowSize){
                    this.setState({windowSize});
                }else{
                    this._controller.slideToPage(1, false);
                }
            });


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
        const {containerEl} = this._elementor;

        this._autoPlayer.unmount();
        this._windowSizer.unmount();

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

                moveTime,
                defaultActivePage,
                autoPlayTime,
                isDebug
            } = nextProps;

            const slidesPerView = typeof nextProps.slidesPerView === 'number' && nextProps.slidesPerView <= 0 ? 1: nextProps.slidesPerView;
            const setting = {
                slidesPerView, slidesPerGroup, aspectRatio, staticHeight, spaceBetween, isCenteredSlides, isEnableNavButton, isEnablePagination, isEnableMouseMove, isEnableAutoPlay, isEnableLoop,
                moveTime,
                defaultActivePage,
                autoPlayTime,
                isDebug
            };

            this._configurator.init(breakpoints, setting);
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

        const {containerEl} = this._elementor;
        if(containerEl?.style.transitionDuration === '0ms'){
            this._controller.slideResetToMatchIndex();
            this._locator.touchStart2(new MobileTouchEvent(event), containerEl);

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

        const movePx = this._locator.touchMove(new MobileTouchEvent(event), this._elementor.containerEl);
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

        this._elementor.containerEl?.removeEventListener('touchmove', this._onMobileTouchMove, false);
        this._elementor.containerEl?.removeEventListener('touchend', this._onMobileTouchEnd, false);
        this._controller.dragDone();
        this._autoPlayer.play();
    };

    /**
   * Web mouse click
   * @param event
   */
    _onWebMouseStart = (event: MouseEvent): void => {
        if(this.props.isDebug && logEnable.onWebMouseStart) log.printInText('[_onWebMouseStart]');

        this._autoPlayer.pause();
        this._controller.slideResetToMatchIndex();

        const {containerEl} = this._elementor;
        if (containerEl) {
            this._locator.touchStart2(new DesktopTouchEvent(event), containerEl);

            if(this.resetDurationTimer) clearTimeout(this.resetDurationTimer);

            this._elementor.rootEl?.addEventListener('mouseleave', this._onWebMouseEnd, false);
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

        const movePx = this._locator.touchMove(new DesktopTouchEvent(event), this._elementor.containerEl);
        this._controller.dragMove(movePx);
    };

    /**
   * web mouse release
   * @param event
   */
    _onWebMouseEnd = (event: MouseEvent):void => {
        event.preventDefault();
        if(this.props.isDebug && logEnable.onWebMouseEnd) log.printInText('[_onWebMouseEnd]');

        this._elementor.rootEl?.removeEventListener('mouseleave', this._onWebMouseEnd, false);
        this._elementor.containerEl?.removeEventListener('mousemove', this._onWebMouseMove, false);
        this._elementor.containerEl?.removeEventListener('mouseup', this._onWebMouseEnd, false);
        this._controller.dragDone();
        this._autoPlayer.play();
    };


    // _syncControlMove = (percentage: number) => {
    //     if(this.props.syncControlRefs?.current){
    //         const syncControl = this.props.syncControlRefs.current;
    //         // 將進度比例換算成 movePx
    //         const moveX = syncControl._getPercentageToMovePx(percentage);
    //         const {slideItemEls} = syncControl._elementor;
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
            ref={this._elementor._navGroupRef}
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
     * render slide item
     */
    _renderSlideItems(){
        const {isDebug} = this.props;
        const {actual, formatElement} = this._stater;
        return formatElement.map((row, i) => {
            const isActive = row.actualIndex === actual.activeIndex;

            return <SlideItem
                key={`carousel_${i}`}
                ref={(el) => this._elementor.setSlideItemRefs(el, i)}
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
    _renderPagination() {
        const {page} = this._stater;
        const pageElement = [];

        for (let i = 0; i < page.pageTotal; i++) {
            pageElement.push(
                <Page
                    key={`page_${i}`}
                    ref={(el) => this._elementor.setPageRefs(el, i)}
                    onSlideToPage={this._controller.slideToPage}
                    page={i + 1}
                    isActive={page.activePage === i + 1}
                />
            );
        }

        return <div
            ref={this._elementor._pageGroupRef}
            className={elClassName.paginationGroup}
        >
            {pageElement}
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
                    id={this._configurator.carouselId}
                    style={style}
                    className={[className, elClassName.root].join(' ').trim()}
                    data-gpu-render={booleanToDataAttr(this._device === EDevice.desktop)}
                    data-per-view-auto={booleanToDataAttr(this._configurator.setting.slidesPerView === 'auto')}
                    data-mouse-move={this._configurator.setting.isEnableMouseMove}
                    data-actual={`${this._stater.info.actual.minIndex},${this._stater.info.actual.firstIndex}-${this._stater.info.actual.lastIndex},${this._stater.info.actual.maxIndex}`}
                    data-debug={booleanToDataAttr(isDebug)}
                    ref={this._elementor._rootRef}
                >
                    <style scoped dangerouslySetInnerHTML={{__html: this._configurator.style}}/>

                    {this._stater.info.isVisibleNavButton && this._renderNavButton()}

                    <div className={elClassName.content}>
                        <div ref={this._elementor._containerRef} className={elClassName.container}>
                            {this._renderSlideItems()}
                        </div>
                    </div>

                    {this._stater.info.isVisiblePagination && this._renderPagination()}

                    {isDebug && <WindowSize size={this._windowSizer.size}/>}
                </div>
            </BearCarouselProvider>

        );
    }
}


export default BearCarousel;


