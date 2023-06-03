import {createRef, RefObject} from 'react';
import {IMultiRefObject} from './types';

import {checkInRange, getMoveDistance, getMovePercentage, getStartPosition} from './utils';
import {booleanToDataAttr} from '../../utils';
import Configurator from '../Configurator';
import Stater from '../Stater';
import Locator from '../Locator';

class Elementor {
    _rootRef: RefObject<HTMLDivElement> = createRef();
    _containerRef: RefObject<HTMLDivElement> = createRef();
    _pageGroupRef: RefObject<HTMLDivElement> = createRef();
    _navGroupRef: RefObject<HTMLDivElement> = createRef();
    _slideItemRefs: IMultiRefObject<Array<HTMLDivElement>> = createRef();
    _pageRefs: IMultiRefObject<Array<HTMLDivElement>> = createRef();

    private _configurator: Configurator;
    private _stater: Stater;
    private _locator: Locator;
    private _isAnimation = false;


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

    get isAnimation(){
        return this._isAnimation;
    }




    onSlideAnimation = () => {
        console.log('xx');
        this.containerEl.addEventListener('transitionstart', this.animationStart, false);
        this.containerEl.addEventListener('transitionend', this.animationEnd, false);
        console.log('xx2');
    };

    offSlideAnimation = () => {
        this.containerEl.removeEventListener('transitionstart', this.animationStart, false);
        this.containerEl.removeEventListener('transitionend', this.animationEnd, false);

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
                containerWidth: this.rootEl.offsetWidth,
                currItemWidth: slideItemWidth,
            }
        );
    };

    /**
     * Move Percentage
     * @param movePx
     */
    getMovePercentage = (movePx: number) => {
        const {actual} = this._stater;
        const slideCurrWidth = this.slideItemEls[actual.activeIndex].offsetWidth;
        const startPosition = this._getStartPosition(slideCurrWidth);
        return getMovePercentage(movePx, startPosition, slideCurrWidth);
    };


    /**
     * Percentage Move Percentage
     * @param movePx
     */
    // getPercentageToMovePx = (percentage: number) => {
    //     const {actual} = this._stater;
    //     const slideCurrWidth = this.slideItemEls[actual.activeIndex].offsetWidth;
    //     const startPosition = this._getStartPosition(slideCurrWidth);
    //     return getMovePercentage(percentage, startPosition, slideCurrWidth);
    // };
    /**
     * Percentage Move Percentage
     * @param movePx
     */
    getPercentageToMovePx = (percentage: number) => {
        const {actual} = this._stater;
        const slideCurrWidth = this.slideItemEls[actual.activeIndex].offsetWidth;
        const startPosition = this._getStartPosition(slideCurrWidth);

        return -(slideCurrWidth * percentage) + startPosition;
    };



    /**
     * Get the target item distance width(px)
     * @param slideIndex
     */
    getMoveDistance = (slideIndex: number): number => {
        const slideItemEl = this.slideItemEls[slideIndex];
        if (this.slideItemEls[slideIndex]) {
            return getMoveDistance(slideItemEl.offsetLeft, this._getStartPosition(slideItemEl.offsetWidth));
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


    transform(translateX: number, isUseAnimation = false){
        this.containerEl.style.transform = `translate(${translateX}px, 0px)`;
        this.containerEl.style.transitionDuration = isUseAnimation
            ? `${this._configurator.setting.moveTime}ms`
            : '0ms';

        return this;
    }



    syncActiveState = (activeActualIndex: number) => {

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
        if (this._stater.isVisiblePagination && this._stater.page.activePage > 0) {
            this.pageEls.forEach((row, index) => {
                if (activePage === index + 1) {
                    row.setAttribute('data-active', 'true');
                } else if(row?.dataset.active) {
                    row.removeAttribute('data-active');
                }
            });
        }



        // 提供是否為第一頁/最後一頁的判斷屬性
        if(this._stater.isVisibleNavButton && !this._configurator.setting.isEnableLoop){
            this.navGroupEl.setAttribute('data-first', booleanToDataAttr(activePage === 1));
            this.navGroupEl.setAttribute('data-last',  booleanToDataAttr(activePage === this._stater.page.pageTotal));
        }

        if(this._stater.page.pageTotal === 1){
            this.rootEl.setAttribute('data-onlyOne',  booleanToDataAttr(true));
        }
    };


    animationStart = () => {
        this._isAnimation = true;
        this.containerEl.dataset.animation = 'true';
    };

    animationEnd = () => {
        this._isAnimation = false;
        this.containerEl.removeAttribute('data-animation');
    };
}


export default Elementor;
