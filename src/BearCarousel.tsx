import * as React from 'react';
import {booleanToDataAttr, checkIsDesktop, isDataKeyDff, isPropsDiff} from './utils';
import logger from './logger';
import {IBearCarouselProps} from './types';
import elClassName from './el-class-name';
import './styles.css';

import Configurator, {getSetting} from './manager/Configurator';
import WindowSizer from './manager/WindowSizer';
import Stater from './manager/Stater';
import SlideItem from './components/SlideItem';
import Elementor from './manager/Elementor';
import Controller from './manager/Controller';
import AutoPlayer from './manager/AutoPlayer';
import Dragger from './manager/Dragger';
import SyncCarousel from './manager/SyncCarousel';

import WindowSize from './components/WindowSize';
import Page from './components/Page';
import {SlideProvider} from './components/SlideProvider/SlideProvider';
import {NavNextButton, NavPrevButton} from './components/NavButton';
import CarouselRoot from './components/CarouselRoot';
import {logEnable} from './config';



interface IState {
  windowSize: number,
}





class BearCarousel extends React.Component<IBearCarouselProps, IState> {
    static defaultProps: IBearCarouselProps = {
        data: undefined,
        slidesPerView: 1,
        slidesPerGroup: 1, // 不可為小數
        breakpoints: {},
        isCenteredSlides: false,
        isEnableLoop: false,
        isEnablePageContent: false,
        isEnablePagination: false,
        isEnableNavButton: false,
        isEnableMouseMove: true,
        isEnableAutoPlay: false,
        isDebug: false,
        spaceBetween: 0,
        moveTime: 500,
        autoPlayTime: 5000,
        initStartPlayTime: 1500,
        isSlideItemMemo: false,
    };
    _isEnableGpuRender = checkIsDesktop();
    state = {windowSize: 0};

    _stater: Stater;
    _configurator: Configurator;
    _windowSizer: WindowSizer;
    _elementor: Elementor;
    _controller: Controller;
    _autoPlayer: AutoPlayer;
    _dragger: Dragger;
    _syncCarousel: SyncCarousel;


    constructor(props: IBearCarouselProps) {
        super(props);
        // this._device = checkIsMobile() ? EDevice.mobile : EDevice.desktop;

        const setting = getSetting(props);
        this._configurator = new Configurator(props.breakpoints, setting, globalThis.window);
        this._windowSizer = new WindowSizer({
            breakpoints: props.breakpoints,
            win: globalThis.window,
            configurator: this._configurator,
        });
        this._stater = new Stater(this._configurator, props.data);
        this._elementor = new Elementor({
            configurator: this._configurator,
            stater: this._stater
        });

        this._controller = new Controller({
            configurator: this._configurator,
            stater: this._stater,
            elementor: this._elementor,
        });

        this._dragger = new Dragger({
            configurator: this._configurator,
            elementor: this._elementor,
            stater: this._stater,
        });

        this._autoPlayer = new AutoPlayer({
            configurator: this._configurator,
        });

        this._stater.onChange(this._onChange);
        this.state = {windowSize: this._windowSizer.size};
    }


    componentDidMount() {
        if(this.props.isDebug && logEnable.componentDidMount) logger.printInText('[componentDidMount]');

        if(this.props.onMount) this.props.onMount();


        if (this._elementor) {
            // Move to the correct position for the first time
            this._controller.slideToPage(1, false);

            this._windowSizer.onResize(this._onResize);
            this._autoPlayer.onTimeout(this._onAutoPlay);

            this._dragger.onDragStart(this._onDragStart);
            this._dragger.onDragMove(this._onDragMove);
            this._dragger.onDragEnd(this._onDragEnd);

            this._controller.onSlideBefore(this._onSlideBefore);
            this._controller.onSlideAfter(this._onSlideAfter);

            this._syncCarousel = new SyncCarousel(this.props.syncCarouselRef);
        }

        this._setController();
        this._elementor.onSlideAnimation();
        this._init();

    }

    componentWillUnmount() {
        if(this.props.isDebug && logEnable.componentWillUnmount) logger.printInText('[componentWillUnmount]');
        this._windowSizer.offResize(this._onResize);
        this._autoPlayer.offTimeout(this._onAutoPlay);
        this._dragger.offDragStart(this._onDragStart);
        this._dragger.offDragMove(this._onDragMove);
        this._dragger.offDragEnd(this._onDragEnd);

        this._controller.offSlideBefore(this._onSlideBefore);
        this._controller.offSlideAfter(this._onSlideAfter);

        this._elementor.offSlideAnimation();
        this._stater.offChange(this._onChange);
    }

    /***
   * Optimized rendering
   * @param nextProps
   * @param nextState
   */
    shouldComponentUpdate(nextProps: IBearCarouselProps, nextState: IState) {
        if(this._configurator.setting.isDebug && logEnable.shouldComponentUpdate) logger.printInText('[shouldComponentUpdate]');

        const {windowSize: nextWindowSize} = nextState;

        if(isPropsDiff(this.props, nextProps, ['data', 'moveEffect']) ||
            this.state.windowSize !== nextWindowSize ||
            this.props.data?.length !== nextProps.data?.length
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

    private _init = () => {
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
    private _setController = () => {
        if(this.props.setController){
            this.props.setController(this._controller);
        }
    };


    /**
     *
     * set OnAutoPlay emit
     * @param index
     * @param isUseAnimation
     */
    private _onAutoPlay = () => {
        this._controller.slideToNextPage();
    };



    /**
     *
     * set OnSlideBefore emit
     * @param index
     * @param isUseAnimation
     */
    private _onSlideBefore = () => {
        this._autoPlayer.pause();
    };


    /**
     *
     * set OnSlideAfter emit
     * @param index
     * @param isUseAnimation
     */
    private _onSlideAfter = (index: number, isUseAnimation: boolean) => {
        this._syncCarousel?.slideToSourceIndex(index, isUseAnimation);
        this._autoPlayer.play();
    };


    /**
     * set OnDragStart emit
     */
    private _onDragStart = () => {
        this._controller.slideResetToMatchIndex();
        this._autoPlayer.pause();
    };

    /**
     * set OnDragEnd emit
     * @param activeSourceIndex
     */
    private _onDragEnd = (activeSourceIndex: number) => {
        this._controller?.slideToVirtualIndex(activeSourceIndex);

        // 同步結束
        this._syncCarousel?.syncControlDone(activeSourceIndex);

    };



    /**
     * set OnDragMove emit
     * @param percentage
     */
    private _onDragMove = (percentage: number) => {
        this._syncCarousel?.syncControlMove(percentage);
    };


    /**
   * set OnChange emit
   */
    private _onChange = () => {
        if(this.props.onSlideChange){
            const {source, virtual, page} = this._stater;
            this.props.onSlideChange({source, virtual, page});
        }
    };

    private _onResize = (args: {windowSize: number}) => {
        if(args.windowSize !== this.state.windowSize){
            this.setState({windowSize: args.windowSize});
        }else{
            this._controller.slideToPage(1, false);
        }
    };

    /**
   * Render left and right navigation blocks
   */
    private _renderNavButton = () => {
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
    private _renderSlideItems = () => {
        const {isDebug} = this.props;
        const {virtual, formatElement} = this._stater;
        return formatElement.map((row, i) => {
            const isActive = row.virtualIndex === virtual.activeIndex;
            return <SlideItem
                key={`bear-carousel_slide-item_${row.key}`}
                ref={(el) => this._elementor.setSlideItemRefs(el, i)}
                element={row.element}
                virtualIndex={row.virtualIndex}
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
    private _renderPagination = () => {
        const {renderPagination} = this.props;
        const {page} = this._stater;
        const {isEnablePageContent} = this._configurator.setting;

        let pageContent: JSX.Element[];
        const isPageContent = typeof renderPagination !== 'undefined';
        if (isPageContent) {
            pageContent = renderPagination(this._stater.page.total);
        }

        const pageElement = Array.from({length: page.total})
            .map((row, index) => {
                return <Page
                    key={`page_${index}`}
                    ref={(el) => this._elementor.setPageRefs(el, index)}
                    onSlideToPage={(page) => this._controller.slideToPage(page)}
                    page={index + 1}
                    isActive={page.activePage === index + 1}
                    pageContent={isEnablePageContent && pageContent[index]}
                />;
            });

        return <div
            ref={this._elementor._pageGroupRef}
            data-page-content={booleanToDataAttr(isEnablePageContent)}
            className={elClassName.paginationGroup}
        >
            {pageElement}
        </div>;
    };

    render(){
        const {style, className, isDebug, isLazy, renderLazyPreloader} = this.props;

        if(!window){
            return null;
        }

        return (
            <CarouselRoot
                ref={this._elementor._rootRef}
                style={style}
                className={className}
                setting={this._configurator.setting}
                isDebug={isDebug}
                extendStyle={this._configurator.style}
                isEnableGpuRender={this._isEnableGpuRender}
            >
                {this._stater.isVisibleNavButton && this._renderNavButton()}

                <div className={elClassName.content}>
                    <div ref={this._elementor._containerRef} className={elClassName.container} data-testid="bear-carousel-container">
                        <SlideProvider
                            isLazy={isLazy}
                            renderLazyPreloader={!!renderLazyPreloader ? renderLazyPreloader: () => <div>loading...</div>}
                        >
                            {this._renderSlideItems()}
                        </SlideProvider>
                    </div>
                </div>

                {this._stater.isVisiblePagination && this._renderPagination()}

                {isDebug && <WindowSize size={this._windowSizer.size}/>}
            </CarouselRoot>
        );
    }
}


export default BearCarousel;


