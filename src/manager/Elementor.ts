import * as React from 'react';
import {booleanToDataAttr, checkInRange, getMoveDistance, getMovePercentage, getStartPosition} from '../utils';
import Configurator from './Configurator';
import Stater from './Stater';
import Locator from './Locator';
import {IRefObject} from '../types';

class Elementor {
    _rootRef: React.RefObject<HTMLDivElement> = React.createRef();
    _containerRef: React.RefObject<HTMLDivElement> = React.createRef();
    _pageGroupRef: React.RefObject<HTMLDivElement> = React.createRef();
    _navGroupRef: React.RefObject<HTMLDivElement> = React.createRef();

    _slideItemRefs: IRefObject<Array<HTMLDivElement>> = React.createRef();
    _pageRefs: IRefObject<Array<HTMLDivElement>> = React.createRef();

    private _configurator: Configurator;
    private _stater: Stater;
    private _locator: Locator;

    moveTime = 500;

    constructor(manager: {
        configurator: Configurator,
        stater: Stater,
        locator: Locator,
    }) {
        this._slideItemRefs.current = [];
        this._pageRefs.current = [];

        this._configurator = manager.configurator;
        this._stater = manager.stater;
        this._locator = manager.locator;

    }

    get rootEl(){
        return this._rootRef.current;
    }
    get containerEl(){
        return this._containerRef.current;
    }
    get slideItemEls(){
        return this._slideItemRefs.current;
    }
    get pageEls(){
        return this._pageRefs.current;
    }
    get pageGroupEl(){
        return this._pageGroupRef.current;
    }
    get navGroupEl(){
        return this._navGroupRef.current;
    }

    get isUseAnimation(){
        return this.containerEl.style.transitionDuration !== '0ms';
    }


    /**
     * Move Percentage
     * @param movePx
     */
    getMovePercentage = (movePx: number) => {
        const {actual} = this._stater;
        const slideCurrWidth = this.slideItemEls[actual.activeIndex].clientWidth;
        const startPosition = this._getStartPosition(slideCurrWidth);
        return getMovePercentage(movePx, startPosition, slideCurrWidth);
    };


    /**
     * Percentage Move Percentage
     * @param movePx
     */
    getPercentageToMovePx = (movePx: number) => {
        const {actual} = this._stater;
        const slideCurrWidth = this.slideItemEls[actual.activeIndex].clientWidth;
        const startPosition = this._getStartPosition(slideCurrWidth);
        return getMovePercentage(movePx, startPosition, slideCurrWidth);
    };


    /**
     * 取得初始距離
     * @param slideItemWidth
     */
    private _getStartPosition = (slideItemWidth: number) => {
        return getStartPosition(this._configurator.setting.isCenteredSlides,
            {
                slidesPerView: this._configurator.setting.slidesPerView,
                slidesPerViewActual: this._configurator.setting.slidesPerViewActual,
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
    getMoveDistance = (slideIndex: number): number => {
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
    setNonSubjectTouch = (isEnable: boolean) => {
        this.rootEl.setAttribute('data-touch', String(isEnable));
    };



    setSlideItemRefs(el: HTMLDivElement, index: number){
        this._slideItemRefs.current[index] = el;
    }
    setPageRefs(el: HTMLDivElement, index: number){
        this._pageRefs.current[index] = el;
    }


    transform(translateX: number, isUseAnimation = true){
        this.containerEl.style.transform = `translate(${translateX}px, 0px)`;
        this.containerEl.style.transitionDuration = isUseAnimation
            ? `${this._configurator.setting.moveTime}ms`
            : '0ms';

        return this;
    }



    syncActiveState(activeActualIndex: number){

        // 更改顯示在第幾個 (父元件使用可判定樣式設定)
        this.slideItemEls.forEach((row, index) => {
            if(checkInRange(index, activeActualIndex, this.slideItemEls.length)){
                row.setAttribute('data-active', 'true');
            } else if (row?.dataset.active) {
                row.removeAttribute('data-active');
            }
        });

        const active = this.slideItemEls.find(row => row.dataset.active === 'true');
        const activePage = parseInt(active?.dataset.page);

        // 更改顯示在第幾頁的樣式 (父元件使用可判定樣式設定)
        if (this._stater.info.isVisiblePagination && this._stater.page.activePage > 0) {
            this.pageEls.forEach((row, index) => {
                if (activePage === index + 1) {
                    row.setAttribute('data-active', 'true');
                } else if(row?.dataset.active) {
                    row.removeAttribute('data-active');
                }
            });
        }



        // 提供是否為第一頁/最後一頁的判斷屬性
        this.navGroupEl.setAttribute('data-first', booleanToDataAttr(activePage === 1));
        this.navGroupEl.setAttribute('data-last',  booleanToDataAttr(activePage === this._stater.info.page.pageTotal));

    }




}


export default Elementor;
