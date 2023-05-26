import {IInfo, TBearSlideItemDataList} from '../types';
import {
    calcMoveTranslatePx,
    checkActualIndexInRange,
    checkInRange,
    getMoveDistance,
    getMovePercentage, getNextIndex, getPrevIndex,
    getSlideIndex,
    getStartPosition,
    initDataList
} from '../utils';
import SlideSettingManager from './SlideSettingManager';
import * as React from 'react';
import SlideItemManager from './SlideItemManager';
import elClassName from '../el-class-name';
import PositionManager from './PositionManager';
import log from '../log';

class ElManager {
    rootRef: React.RefObject<HTMLDivElement> = React.createRef();
    containerRef: React.RefObject<HTMLDivElement> = React.createRef();
    slideItemRefs: React.RefObject<Array<HTMLDivElement>> = React.createRef();
    pageRefs: React.RefObject<Array<HTMLDivElement>> = React.createRef();
    pageGroupRef: React.RefObject<HTMLDivElement> = React.createRef();
    navGroupRef: React.RefObject<HTMLDivElement> = React.createRef();

    private readonly _slideSettingManager: SlideSettingManager;
    private readonly _slideItemManager: SlideItemManager;
    private readonly _positionManager: PositionManager;

    moveTime = 500;

    constructor(manager: {
        slideSettingManager: SlideSettingManager,
        slideItemManager: SlideItemManager,
        positionManager: PositionManager,
    }) {
        // @ts-ignore
        this.slideItemRefs.current = [];
        // @ts-ignore
        this.pageRefs.current = [];

        this._slideSettingManager = manager.slideSettingManager;
        this._slideItemManager = manager.slideItemManager;
        this._positionManager = manager.positionManager;

    }

    get rootEl(){
        return this.rootRef.current;
    }
    get containerEl(){
        return this.containerRef.current;
    }
    get slideItemEls(){
        return this.slideItemRefs.current;
    }
    get pageEls(){
        return this.pageRefs.current;
    }
    get pageGroupEl(){
        return this.pageGroupRef.current;
    }
    get navGroupEl(){
        return this.navGroupRef.current;
    }


    /**
     * Move Percentage
     * @param movePx
     */
    private _getMovePercentage = (movePx: number) => {
        const {actual} = this._slideItemManager;
        const slideCurrWidth = this.slideItemEls[actual.activeIndex].clientWidth;
        const startPosition = this._getStartPosition(slideCurrWidth);
        return getMovePercentage(movePx, startPosition, slideCurrWidth);
    };


    /**
     * 取得初始距離
     * @param slideItemWidth
     */
    private _getStartPosition = (slideItemWidth: number) => {
        return getStartPosition(this._slideSettingManager.setting.isCenteredSlides,
            {
                slidesPerView: this._slideSettingManager.setting.slidesPerView,
                slidesPerViewActual: this._slideSettingManager.setting.slidesPerViewActual,
            },
            {
                containerWidth: this.rootEl.clientWidth,
                currItemWidth: slideItemWidth,
            }
        );
    };

    /**
     * Get the target item distance width(px)
     * @param slideIndex
     */
    private _getMoveDistance = (slideIndex: number): number => {
        if (this.slideItemEls) {
            const slideItemRef = this.slideItemEls[slideIndex];
            if (slideItemRef) {
                return getMoveDistance(slideItemRef.offsetLeft, this._getStartPosition(slideItemRef.clientWidth));
            }
        }

        return 0;
    };


    /**
     * 加上狀態讓其他元素不會影響滑動
     * @param isEnable
     */
    private _setOtherTouch = (isEnable: boolean) => {
        if(this.pageGroupEl){
            this.pageGroupEl.setAttribute('data-touch', isEnable ? 'true': 'false');
        }
        if(this.navGroupEl){
            this.navGroupEl.setAttribute('data-touch', isEnable ? 'true': 'false');
        }
    };



    setSlideItemRefs(el: HTMLDivElement, index: number){
        this.slideItemRefs.current[index] = el;
    }
    setPageRefs(el: HTMLDivElement, index: number){
        this.pageRefs.current[index] = el;
    }



    /**
     * reset page position (Only LoopMode)
     * PS: If the element is isClone then return to the position where it should actually be displayed
     */
    slideResetToMatchIndex = (): void => {
        // if(this.props.isDebug && logEnable.resetPosition) log.printInText('[_resetPosition]');
        const {actual, formatElement} = this._slideItemManager;

        if (formatElement[actual.activeIndex].isClone) {
            this.slideToActualIndex(formatElement[actual.activeIndex].matchIndex, false);
        }
    };


    dragMove(moveX: number) {
        //     if(this.props.isDebug && logEnable.elementMove) log.printInText('[_elementMove]');

        this._setOtherTouch(false);



        const {startPosition} = this._positionManager;
        const {setting} = this._slideSettingManager;

        if (this.containerEl && setting.isEnableMouseMove && this.slideItemEls) {
            // console.log('this.position.startPosition.x', this._isSyncControl(), moveX);
            const translateX = calcMoveTranslatePx(startPosition.x, moveX);
            const percentage = this._getMovePercentage(translateX);


            this.containerEl.style.transform = `translate(${translateX}px, 0px)`;
            this.containerEl.style.transitionDuration = '0ms';

            // 取得移動進度
            // if(this.props.onElementMove){
            //     this.props.onElementMove(this.activeActualIndex, percentage);
            // }

            // 同步控制
            // this._syncControlMove(percentage);


            // 更改顯示在第幾個 (父元件使用可判定樣式設定)
            if(this.slideItemEls){
                const activeActualIndex = Math.round(percentage);
                this.slideItemEls
                    .forEach((row, index) => {
                        if(checkInRange(index, activeActualIndex, this.slideItemEls.length)){
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
    }



    /**
     * The object movement ends (confirm the stop position and which Index position should be sucked)
     */
    dragDone = (): void => {
        // if(this.props.isDebug && logEnable.elementMoveDone) log.printInText('[_elementMoveDone]');
        this._setOtherTouch(true);


        if(this.slideItemEls){
            const active = this.slideItemEls.find(row => row.dataset.active === 'true');
            if(active){
                const activeActualIndex = Number(active.dataset.actual);
                this.slideToActualIndex(activeActualIndex);

                // const activeSourceIndex = Number(active.dataset.source);
                // this._syncControlDone(activeSourceIndex);
            }
        }

        // this._setOtherTouch(true);
    };


    slideToActualIndex(slideIndex: number, isUseAnimation = true){
        if (this._slideItemManager.checkActualIndexInRange(slideIndex)) {
            const {formatElement} = this._slideItemManager;
            this._slideItemManager.setActiveActual(slideIndex, formatElement[slideIndex]?.inPage ?? 1);

            // 移動EL位置
            const position = this._getMoveDistance(slideIndex);
            if (this.containerEl) {
                const className = this.containerEl.classList;
                if(!className.contains(elClassName.containerInit)){
                    className.add(elClassName.containerInit);
                }

                this.containerEl.style.transform = `translate(${position}px, 0px)`;
                this.containerEl.style.transitionDuration = isUseAnimation
                    ? `${this.moveTime}ms`
                    : '0ms';


                if(isUseAnimation){
                    // if(this.resetDurationTimer) clearTimeout(this.resetDurationTimer);
                    // this.resetDurationTimer = setTimeout(() => {
                    //     containerEl.style.transitionDuration = '0ms';
                    // }, this.moveTime / 1.5);
                }

            }


            // 提供是否為第一頁/最後一頁的判斷屬性
            // const {page} = this.slideItem;
            // const {rootEl} = this.elManager;
            // if (rootEl) {
            //     if (page.activePage === 1) {
            //         rootEl.setAttribute('data-position', page.activePage === page.pageTotal ? 'hidden' : 'first');
            //
            //     }else{
            //         rootEl.setAttribute('data-position', page.activePage === page.pageTotal ? 'last': '');
            //     }
            // }

            // 更改顯示在第幾個 (父元件使用可判定樣式設定)
            const slideItemEls = this.pageEls;
            if(slideItemEls){
                slideItemEls
                    // .filter(row => isNotEmpty(row))
                    .forEach((row, index) => {
                        if (index === slideIndex) {
                            row.setAttribute('data-active', 'true');
                        } else if (row?.dataset.active) {
                            row.removeAttribute('data-active');
                        }
                    });
            }


            //         // 更改顯示在第幾頁的樣式 (父元件使用可判定樣式設定)
            //         if (pageEls && this.slideItem.info.isVisiblePagination && page.activePage > 0) {
            //             pageEls.forEach((row, index) => {
            //                 if(row && row.setAttribute !== null) {
            //                     if (page.activePage === index + 1) {
            //                         row.setAttribute('data-active', 'true');
            //                     } else if(row?.dataset.active) {
            //                         row.removeAttribute('data-active');
            //                     }
            //                 }
            //
            //             });
            //         }
            //
            //         // 結束移動後再繼續自動模式
            //         this._checkAndAutoPlay();
            //
            //         this._handleSyncCarousel();
            //
            //         if(this.props.onElementDone){
            //             this.props.onElementDone(slideIndex);
            //         }

        }
    }

    /**
     * 移動到指定頁面
     * @param page
     * @param isUseAnimation 是否開啟動畫
     */
    slideToPage(page: number, isUseAnimation = true){
        const {setting} = this._slideSettingManager;
        const {actual} = this._slideItemManager;

        const slideIndex = getSlideIndex(page, setting.slidesPerGroup, actual.firstIndex);
        this.slideToActualIndex(slideIndex, isUseAnimation);
    }


    slideToNextPage = (): void => {

        const {nextPage, formatElement, page, actual, residue, element, nextPageFirstIndex} = this._slideItemManager;
        const {setting} = this._slideSettingManager;
        const activeActual = formatElement[actual.activeIndex];

        getNextIndex(
            activeActual,
            {
                nextPage: nextPage,
                residue: residue,
                pageTotal: page.pageTotal,
                slideTotal: this._slideItemManager.info.formatElement.length,
                isOverflowPage: nextPage > page.pageTotal,
                isOverflowIndex: nextPageFirstIndex > element.lastIndex,
            },
            {
                slidesPerGroup: setting.slidesPerGroup,
                slidesPerViewActual: setting.slidesPerViewActual,
                isLoopMode: setting.isEnableLoop,
            }
        )
            .forEach(action => this.slideToActualIndex(action.index, action.isUseAnimation));

    };






    /**
     * go to previous
     */
    slideToPrevPage = (): void => {

        const {nextPage, formatElement, page, actual, residue, element, nextPageFirstIndex} = this._slideItemManager;
        const {setting} = this._slideSettingManager;
        const activeActual = formatElement[actual.activeIndex];

        getPrevIndex(
            activeActual,
            {
                activePage: this._slideItemManager.page.activePage,
                residue: residue,
                pageTotal: page.pageTotal,
                slideTotal: this._slideItemManager.info.formatElement.length,
                isOverflowPage: nextPage > page.pageTotal,
                isOverflowIndex: nextPageFirstIndex > element.lastIndex,
            },
            {
                slidesPerGroup: setting.slidesPerGroup,
                slidesPerViewActual: setting.slidesPerViewActual,
                isLoopMode: setting.isEnableLoop,
            }
        )
            .forEach(action => this.slideToActualIndex(action.index, action.isUseAnimation));

    };


}


export default ElManager;
