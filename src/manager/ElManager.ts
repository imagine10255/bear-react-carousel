import {IInfo, TBearSlideItemDataList} from '../types';
import {
    calcMoveTranslatePx,
    checkActualIndexInRange,
    checkInRange,
    getMoveDistance,
    getMovePercentage,
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

    slideSettingManager: SlideSettingManager;
    slideItemManager: SlideItemManager;
    positionManager: PositionManager;

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

        this.slideSettingManager = manager.slideSettingManager;
        this.slideItemManager = manager.slideItemManager;
        this.positionManager = manager.positionManager;

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
        const {actual} = this.slideItemManager;
        const slideCurrWidth = this.slideItemEls[actual.activeIndex].clientWidth;
        const startPosition = this._getStartPosition(slideCurrWidth);
        return getMovePercentage(movePx, startPosition, slideCurrWidth);
    };


    /**
     * 取得初始距離
     * @param slideItemWidth
     */
    private _getStartPosition = (slideItemWidth: number) => {
        return getStartPosition(this.slideSettingManager.setting.isCenteredSlides,
            {
                slidesPerView: this.slideSettingManager.setting.slidesPerView,
                slidesPerViewActual: this.slideSettingManager.setting.slidesPerViewActual,
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


    dragMove(moveX: number) {
        //     if(this.props.isDebug && logEnable.elementMove) log.printInText('[_elementMove]');

        this._setOtherTouch(false);



        const {startPosition} = this.positionManager;
        const {setting} = this.slideSettingManager;

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
        if (this.slideItemManager.checkActualIndexInRange(slideIndex)) {
            const {formatElement} = this.slideItemManager;
            this.slideItemManager.setActiveActual(slideIndex, formatElement[slideIndex]?.inPage ?? 1);

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

        }
    }

    /**
     * 移動到指定頁面
     * @param page
     * @param isUseAnimation 是否開啟動畫
     */
    slideToPage(page: number, isUseAnimation = true){
        const {setting} = this.slideSettingManager;
        const {actual} = this.slideItemManager;

        const slideIndex = getSlideIndex(page, setting.slidesPerGroup, actual.firstIndex);
        this.slideToActualIndex(slideIndex, isUseAnimation);
    }


}


export default ElManager;
