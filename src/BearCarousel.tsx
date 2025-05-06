import './styles.css';

import * as React from 'react';

import CarouselRoot from './components/CarouselRoot';
import {NavNextButton, NavPrevButton} from './components/NavButton';
import Page from './components/Page';
import SlideItem from './components/SlideItem';
import {SlideProvider} from './components/SlideProvider/SlideProvider';
import WindowSize from './components/WindowSize';
import {logEnable} from './config';
import elClassName from './el-class-name';
import logger from './logger';
import AutoPlayer from './manager/AutoPlayer';
import Configurator, {getSetting} from './manager/Configurator';
import Controller from './manager/Controller';
import Dragger from './manager/Dragger';
import Elementor from './manager/Elementor';
import ElState from './manager/Elementor/ElState';
import Stater from './manager/Stater';
import SyncCarousel from './manager/SyncCarousel';
import WindowSizer from './manager/WindowSizer';
import {IBearCarouselProps} from './types';
import {booleanToDataAttr, isPropsDiff} from './utils';



interface IState {
  windowSize: number
  isClientReady: boolean
}


/**
 * Carousel Component
 */
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
        movePercentage: 0.1,
        isDebug: false,
        spaceBetween: 0,
        moveTime: 500,
        autoPlayTime: 5000,
        initStartPlayTime: 1500,
        isEnableGPURender: false,
    };
    state: IState = {windowSize: 0, isClientReady: false};
    _isError: boolean = false;

    _elementor: Elementor;
    _stater: Stater;
    _configurator?: Configurator;
    _windowSizer?: WindowSizer;
    _elState?: ElState;
    _controller?: Controller;
    _autoPlayer?: AutoPlayer;
    _dragger?: Dragger;
    _syncCarousels?: SyncCarousel[];


    constructor(props: IBearCarouselProps) {
        super(props);
        // this._device = checkIsMobile() ? EDevice.mobile : EDevice.desktop;

        const {data, breakpoints, onMount, syncCarouselRefs} = props;
        const setting = getSetting(this.props);

        this._configurator = new Configurator({
            breakpoints,
            defaultBreakpoint: setting,
            win: globalThis.window
        });

        try{
            this._stater = new Stater(this._configurator, data);
        }catch (e){
            this._stater = new Stater(this._configurator, undefined);

            if(e instanceof Error){
                this._isError = true;
                console.error(e.message);
            }
        }

        this._elementor = new Elementor({
            configurator: this._configurator,
            stater: this._stater
        });

    }


    componentDidMount() {
        if(this.props.isDebug && logEnable.componentDidMount) logger.printInText('[componentDidMount]');
        const {breakpoints, onMount, syncCarouselRefs} = this.props;


        if(this._isError){
            return;
        }
        if(!this._configurator){
            return;
        }

        this._windowSizer = new WindowSizer({
            breakpoints,
            win: globalThis.window,
            configurator: this._configurator,
        });


        this._stater.onChange(this._onChange);

        this._elState = new ElState({
            configurator: this._configurator,
            elementor: this._elementor,
            stater: this._stater
        });

        this._controller = new Controller({
            configurator: this._configurator,
            stater: this._stater,
            elState: this._elState,
        });

        this._dragger = new Dragger({
            configurator: this._configurator,
            elementor: this._elementor,
            elState: this._elState,
            stater: this._stater,
        });

        this._autoPlayer = new AutoPlayer({
            configurator: this._configurator,
        });

        this._windowSizer.onResize(this._onResize);
        this._autoPlayer.onTimeout(this._onAutoPlay);

        this._dragger.onDragStart(this._onDragStart);
        this._dragger.onDragMove(this._onDragMove);
        this._dragger.onDragEnd(this._onDragEnd);
        this._elState.onAnimationEnd(this._onAnimationEnd);

        this._controller.onSlideBefore(this._onSlideBefore);
        this._controller.onSlideAfter(this._onSlideAfter);

        if(syncCarouselRefs){
            this._syncCarousels = syncCarouselRefs.map(row => new SyncCarousel(row));
        }
        this._setController();
        this._elState.onSlideAnimation();
        this._init();

        if(onMount) onMount();

    }

    componentWillUnmount() {
        if(this.props.isDebug && logEnable.componentWillUnmount) logger.printInText('[componentWillUnmount]');
        this._windowSizer?.offResize(this._onResize);

        this._autoPlayer?.offTimeout(this._onAutoPlay);
        if(this._dragger){
            this._dragger.offDragStart(this._onDragStart);
            this._dragger.offDragMove(this._onDragMove);
            this._dragger.offDragEnd(this._onDragEnd);
        }

        if(this._controller){
            this._controller.offSlideBefore(this._onSlideBefore);
            this._controller.offSlideAfter(this._onSlideAfter);
        }

        if(this._elState){
            this._elState.offSlideAnimation();
        }
        this._stater?.offChange(this._onChange);
    }

    /***
   * Optimized rendering
   * @param nextProps
   * @param nextState
   */
    shouldComponentUpdate(nextProps: IBearCarouselProps, nextState: IState) {
        if(this._configurator?.setting.isDebug && logEnable.shouldComponentUpdate) logger.printInText('[shouldComponentUpdate]');

        const {windowSize, isClientReady} = this.state;
        const {windowSize: nextWindowSize, isClientReady: isNextClientReady} = nextState;
        const {data, ...otherProps} = this.props;
        const {data: nextData, ...otherNextProps} = nextProps;

        if(isNextClientReady !== isClientReady){
            return true;
        }

        // 需要重新計算的部分 (page info..), 因項目數量不同, 位置需規0
        if(data?.length !== nextData?.length){
            this._configurator?.init({
                defaultBreakpoint: getSetting(nextProps),
                breakpoints: nextProps.breakpoints,
            });
            this._stater?.reset(nextProps.data);

            setTimeout(() => {
                this._controller?.slideToPage(1, false);
            }, 0);

            return true;
        }

        // 需要重新計算的部分 (page info..), 顯示方式異動, 但位置保持
        if(windowSize !== nextWindowSize ||
            isPropsDiff(otherProps, otherNextProps, ['moveEffect'])
        ){
            const activeIndex = this._stater?.source.activeIndex;
            this._configurator?.init({
                defaultBreakpoint: getSetting(nextProps),
                breakpoints: nextProps.breakpoints,
            });
            this._stater?.reset(nextProps.data);
            setTimeout(() => {
                this._controller?.slideToSourceIndex(activeIndex ?? 0, {isUseAnimation: false});
            }, 0);

            return true;
        }

        // 只需要更新資料內容的部分 (不進行資料深比對)
        if(data !== nextData){
            this._stater?.updateData(nextProps.data);
            return true;
        }

        return false;
    }

    private _init = () => {
        this.setState({isClientReady: true}, () => {
            this._controller?.slideToPage(1, false);
            this._onChange();
        });
    };

    /**
     * set Controller method
     */
    private _setController = () => {
        if(this.props.setController && this._controller){
            this.props.setController(this._controller);
        }
    };


    /**
     *
     * set OnAutoPlay emit
     */
    private _onAutoPlay = () => {
        this._controller?.slideToNextPage();
    };



    /**
     *
     * set OnSlideBefore emit
     */
    private _onSlideBefore = () => {
        this._autoPlayer?.pause();
    };


    /**
     *
     * set OnSlideAfter emit
     * @param index
     * @param isUseAnimation
     */
    private _onSlideAfter = (index: number, isUseAnimation?: boolean) => {
        this._syncCarousels?.forEach(syncRef => syncRef.slideToSourceIndex(index, isUseAnimation));
        this._autoPlayer?.play();
    };


    /**
     * set OnDragStart emit
     */
    private _onDragStart = () => {
        this._controller?.slideResetToMatchIndex();
        this._autoPlayer?.pause();
    };

    /**
     * set OnDragEnd emit
     * @param activeSourceIndex
     */
    private _onDragEnd = (activeSourceIndex: number) => {
        this._controller?.slideToVirtualIndex(activeSourceIndex);

        // 同步結束
        this._syncCarousels?.forEach(syncRow => syncRow?.syncControlDone(activeSourceIndex));

    };



    /**
     * set OnAnimationEnd emit
     */
    private _onAnimationEnd = (starer: Stater, elementor: Elementor) => {
        if(this.props.onAnimationEnd){
            this.props.onAnimationEnd(starer, elementor);
        }
    };



    /**
     * set OnDragMove emit
     * @param percentage
     */
    private _onDragMove = (percentage: number) => {
        this._syncCarousels?.forEach(syncRow => syncRow?.syncControlMove(percentage));
    };


    /**
   * set OnChange emit
   */
    private _onChange = () => {
        if(this.props.onSlideChange && this._stater){
            const {source, virtual, page} = this._stater;
            this.props.onSlideChange({source, virtual, page});
        }
    };

    private _onResize = (args: {windowSize: number}) => {
        if(args.windowSize !== this.state.windowSize){
            this.setState({windowSize: args.windowSize});
        }else{
            const activeIndex = this._stater?.source.activeIndex;
            this._controller?.slideToSourceIndex(activeIndex, {isUseAnimation: false});
        }
    };

    /**
   * Render left and right navigation blocks
   */
    private _renderNavButton = () => {
        const {renderNavButton} = this.props;

        if (typeof renderNavButton !== 'undefined' && this._controller) {
            return <>
                {renderNavButton(this._controller.slideToPrevPage, this._controller.slideToNextPage)}
            </>;
        }

        return (<div
            ref={this._elementor?._navGroupRef}
            className={elClassName.navGroup}
        >
            <NavPrevButton onClick={this._controller?.slideToPrevPage}/>
            <NavNextButton onClick={this._controller?.slideToNextPage}/>
        </div>);
    };


    /**
     * render slide item
     */
    private _renderSlideItems = () => {
        const {isDebug} = this.props;
        const virtual = this._stater?.virtual;
        const formatElement = this._stater?.formatElement;
        return formatElement?.map((row, i) => {
            const isActive = row.virtualIndex === virtual?.activeIndex;
            return <SlideItem
                key={`bear-carousel_slide-item_${row.key}`}
                ref={(el) => {
                    if(el){
                        this._elementor?.setSlideItemRefs(el, i);
                    }
                }}
                element={row.element}
                virtualIndex={row.virtualIndex}
                matchIndex={row.matchIndex}
                inPage={row.inPage}
                sourceIndex={row.sourceIndex ?? 0}
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
        const page = this._stater?.page;
        const isEnablePageContent = this._configurator?.setting?.isEnablePageContent;

        let pageContent: React.JSX.Element[]|undefined;
        const isPageContent = typeof renderPagination !== 'undefined';
        if (isPageContent) {
            pageContent = renderPagination(this._stater?.page?.total ?? 0);
        }

        const pageElement = Array.from({length: page?.total ?? 0})
            .map((row, index) => {
                return <Page
                    key={`page_${index}`}
                    ref={(el) => {
                        if(el){
                            this._elementor?.setPageRefs(el, index);
                        }
                    }}
                    onSlideToPage={(page) => this._controller?.slideToPage(page)}
                    page={index + 1}
                    isActive={page?.activePage === index + 1}
                    pageContent={isEnablePageContent && typeof pageContent !== 'undefined' && pageContent[index]}
                />;
            });

        return <div
            ref={this._elementor?._pageGroupRef}
            data-page-content={booleanToDataAttr(isEnablePageContent ?? false)}
            className={elClassName.paginationGroup}
        >
            {pageElement}
        </div>;
    };

    render(){
        const {style, className, isDebug, isLazy, renderLazyPreloader, isEnableGPURender} = this.props;

        // const isClientReady = this.state.isClientReady;
        // if(!this.state.isClientReady){
        //     return null;
        // }

        if(this._isError){
            return;
        }
        return (
            <CarouselRoot
                ref={this._elementor?._rootRef}
                style={style}
                className={className}
                setting={this._configurator?.setting}
                isDebug={isDebug}
                extendStyle={this._configurator?.style}
                isEnableGpuRender={isEnableGPURender}
            >
                {this.state.isClientReady && this._stater?.isVisibleNavButton && this._renderNavButton()}

                <div className={elClassName.content}>
                    <div ref={this._elementor?._containerRef} className={elClassName.container} data-testid="bear-carousel-container">
                        <SlideProvider
                            isLazy={isLazy}
                            renderLazyPreloader={!!renderLazyPreloader ? renderLazyPreloader: () => <div>loading...</div>}
                        >
                            {this.state.isClientReady && this._renderSlideItems()}
                        </SlideProvider>
                    </div>
                </div>


                {this.state.isClientReady && <>
                    {this._stater?.isVisiblePagination && this._renderPagination()}
                    {(isDebug && this._windowSizer)&& <WindowSize size={this._windowSizer.size}/>}
                </>}

            </CarouselRoot>
        );
    }
}


export default BearCarousel;


