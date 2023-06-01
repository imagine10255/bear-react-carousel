import * as React from 'react';
import {booleanToDataAttr, checkIsMobile, isDataKeyDff, isPropsDiff} from './utils';
import log from './log';
import {EDevice, IBearCarouselProps} from './types';
import elClassName from './el-class-name';
import {BearCarouselProvider} from './BearCarouselProvider';
import './styles.css';

import Configurator, {getSetting} from './manager/Configurator';
import WindowSizer from './manager/WindowSizer';
import Stater from './manager/Stater';
import SlideItem from './components/SlideItem';
import Elementor from './manager/Elementor';
import Locator from './manager/Locator';
import Controller from './manager/Controller';
import AutoPlayer from './manager/AutoPlayer';
import Dragger from './manager/Dragger';
import SyncCarousel from './manager/SyncCarousel';

import WindowSize from './components/WindowSize';
import Page from './components/Page';
import {NavNextButton, NavPrevButton} from './components/NavButton';


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
        isSlideItemMemo: false,
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


    constructor(props: IBearCarouselProps) {
        super(props);
        this._device = checkIsMobile() ? EDevice.mobile : EDevice.desktop;

        const setting = getSetting(props);
        this._syncCarousel = new SyncCarousel(props.syncCarouselRef);
        this._windowSizer = new WindowSizer(props.breakpoints, window);
        this._configurator = new Configurator(props.breakpoints, setting);
        this._stater = new Stater(this._configurator, props.data);
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
        });


        this._autoPlayer = new AutoPlayer({
            configurator: this._configurator,
            controller: this._controller,
            dragger: this._dragger,
        });

        this._stater.onChange(this._onChange);
        this.state = {windowSize: this._windowSizer.size};
    }


    componentDidMount() {
        if(this.props.isDebug && logEnable.componentDidMount) log.printInText('[componentDidMount]');

        if(this.props.onMount){
            this.props.onMount();
        }

        this._stater.offChange();

        if (this._elementor) {
            // Move to the correct position for the first time
            if(this._stater.page.pageTotal > 0){
                this._controller.slideToPage(this.props.defaultActivePage ?? 1, false);
            }

            this._windowSizer.onResize(this._onResize);
            this._autoPlayer.onTimeout();
            this._dragger.onDrapStart();
        }

        this._setControllerRef();
        this._init();
    }

    componentWillUnmount() {
        if(this.props.isDebug && logEnable.componentWillUnmount) log.printInText('[componentWillUnmount]');
        this._autoPlayer.offTimeout();
        this._windowSizer.offResize(this._onResize);
        this._dragger.offDrapStart();
        this._dragger.offDragEnd();
    }


    /***
   * Optimized rendering
   * @param nextProps
   * @param nextState
   */
    shouldComponentUpdate(nextProps: IBearCarouselProps, nextState: IState) {

        const {windowSize: nextWindowSize} = nextState;

        if(isPropsDiff(this.props, nextProps, ['data']) ||
            this.state.windowSize !== nextWindowSize ||
            this.props.data.length !== nextProps.data.length
        ){
            this._configurator.init(nextProps.breakpoints, getSetting(nextProps));
            this._stater.init(nextProps.data);
            setTimeout(() => {
                this._controller.slideToPage(1, false);
            }, 0);

            return true;
        }

        if(nextProps.isSlideItemMemo && this.props.data !== nextProps.data){
            this._stater.updateData(nextProps.data);
            return true;
        }

        if(isDataKeyDff(this.props.data, nextProps.data)){
            this._stater.updateData(nextProps.data);
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

    _onResize = (args: {windowSize: number}) => {
        if(args.windowSize !== this.state.windowSize){
            this.setState({windowSize: args.windowSize});
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
            <NavPrevButton onClick={this._controller.slideToPrevPage}/>
            <NavNextButton onClick={this._controller.slideToNextPage}/>
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
                key={`bear-carousel_${row.key}`}
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
                    onSlideToPage={(page) => this._controller.slideToPage(page)}
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
                    data-testid="bear-carousel"
                    style={style}
                    className={[className, elClassName.root].join(' ').trim()}
                    data-gpu-render={booleanToDataAttr(this._device === EDevice.desktop)}
                    data-per-view-auto={booleanToDataAttr(this._configurator.setting.slidesPerView === 'auto')}
                    data-mouse-move={this._configurator.setting.isEnableMouseMove}
                    data-actual={`${this._stater.actual.minIndex},${this._stater.actual.firstIndex}-${this._stater.actual.lastIndex},${this._stater.actual.maxIndex}`}
                    data-debug={booleanToDataAttr(isDebug)}
                    ref={this._elementor._rootRef}
                >
                    <style scoped dangerouslySetInnerHTML={{__html: this._configurator.style}}/>

                    {this._stater.isVisibleNavButton && this._renderNavButton()}

                    <div className={elClassName.content}>
                        <div ref={this._elementor._containerRef} className={elClassName.container} data-testid="bear-carousel-container">
                            {this._renderSlideItems()}
                        </div>
                    </div>

                    {this._stater.isVisiblePagination && this._renderPagination()}

                    {isDebug && <WindowSize size={this._windowSizer.size}/>}
                </div>
            </BearCarouselProvider>

        );
    }
}


export default BearCarousel;


