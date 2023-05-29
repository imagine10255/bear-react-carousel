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
import Controller from './manager/Controller';
import AutoPlayer from './manager/AutoPlayer';

import './styles.css';
import WindowSize from './components/WindowSize';
import Page from './components/Page';
import Dragger from './manager/Dragger';
import SyncCarousel from './manager/SyncCarousel';


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
    _dragger: Dragger;
    _syncCarousel: SyncCarousel;

    _slideToPage: (page: number, isUseAnimation?: boolean) => void;

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
        this._syncCarousel = new SyncCarousel(props.syncCarouselRef);
        this._windowSizer = new WindowSizer(breakpoints, this._device);
        this._configurator = new Configurator(breakpoints, setting);
        this._stater = new Stater(this._configurator, data);
        this._locator = new Locator(this._configurator.carouselId);
        this._elementor = new Elementor({
            locator: this._locator,
            configurator: this._configurator,
            stater: this._stater
        });

        this._controller = new Controller({
            locator: this._locator,
            configurator: this._configurator,
            stater: this._stater,
            elementor: this._elementor,
            syncCarousel: this._syncCarousel,
        });

        this._dragger = new Dragger({
            locator: this._locator,
            configurator: this._configurator,
            elementor: this._elementor,
            stater: this._stater,
            controller: this._controller,
            syncCarousel: this._syncCarousel,
        }, this._device);


        this._autoPlayer = new AutoPlayer({
            configurator: this._configurator,
            controller: this._controller,
            dragger: this._dragger,
        });

        this._stater.on('change', this._onChange);

        this._slideToPage = this._controller.slideToPage.bind(this._controller);

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

            this._windowSizer
                .mount()
                .on('resize', this._onResize);

            this._autoPlayer.mount();
            this._dragger.mount();
        }

        this._setControllerRef();

        this._init();
    }

    componentWillUnmount() {
        if(this.props.isDebug && logEnable.componentWillUnmount) log.printInText('[componentWillUnmount]');
        this._autoPlayer.unmount();
        this._windowSizer.unmount();
        this._dragger.unmount();
    }


    /***
   * Optimized rendering
   * @param nextProps
   * @param nextState
   */
    shouldComponentUpdate(nextProps: IBearCarouselProps, nextState: IState) {

        const {windowSize: nextWindowSize} = nextState;
        const {windowSize} = this.state;
        const {data, onChange, renderNavButton, onElementDone, syncCarouselRef, onElementMove, ...otherParams} = this.props;
        const {data: nextData, onChange: nextSetCarousel, renderNavButton: nextRenderNavButton, syncCarouselRef: nextSyncCarouselRef, onElementDone: nextOnElementDone, onElementMove: nextOnElementMove, ...nextOtherProps} = nextProps;

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
                $this._slideToPage(1, false);
            }, 0);

            // this._onChange();

            return true;
        }

        return false;
    }


    _isSyncControl = () => !!this.props.syncCarouselRef === false;



    _init = () => {
        if (this._elementor.containerEl) {
            const className = this._elementor.containerEl.classList;
            if(!className.contains(elClassName.containerInit)){
                className.add(elClassName.containerInit);
            }
        }
    };

    /**
     * set Controller method
     */
    _setControllerRef = () => {
        if(this.props.controllerRef){
            this.props.controllerRef.current = this._controller;
        }
    };

    /**
   * set OnChange emit
   */
    _onChange = () => {
        if(this.props.onChange){
            const {element, actual, page} = this._stater;
            this.props.onChange({element, actual, page});
        }
    };

    _onResize = (windowSize: number) => {
        if(windowSize !== this.state.windowSize){
            this.setState({windowSize});
        }else{
            this._controller.slideToPage(1, false);
        }
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
    _renderSlideItems = () => {
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
    };


    /**
     * Page number navigation buttons
     */
    _renderPagination = () => {
        const {page} = this._stater;
        const pageElement = [];

        for (let i = 0; i < page.pageTotal; i++) {
            pageElement.push(
                <Page
                    key={`page_${i}`}
                    ref={(el) => this._elementor.setPageRefs(el, i)}
                    onSlideToPage={this._slideToPage}
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
    };

    render(){
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


