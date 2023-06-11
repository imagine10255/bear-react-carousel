import {createRef, RefObject} from 'react';
import {IMultiRefObject} from './types';

import {checkInRange, getMoveDistance, getMovePercentage, getStartPosition} from './utils';
import {booleanToDataAttr} from '../../utils';
import Configurator from '../Configurator';
import Stater from '../Stater';
import calculateOrder from '../Controller/utils';

class Elementor {
    _rootRef: RefObject<HTMLDivElement> = createRef();
    _containerRef: RefObject<HTMLDivElement> = createRef();
    _pageGroupRef: RefObject<HTMLDivElement> = createRef();
    _navGroupRef: RefObject<HTMLDivElement> = createRef();
    _slideItemRefs: IMultiRefObject<Array<HTMLDivElement>> = createRef();
    _pageRefs: IMultiRefObject<Array<HTMLDivElement>> = createRef();

    private _configurator: Configurator;
    private _stater: Stater;
    private _isAnimation = false;

    isOrder = false;
    isOrderTransfer = 0;


    constructor(manager: {
        configurator: Configurator,
        stater: Stater,
    }) {
        this._slideItemRefs.current = [];
        this._pageRefs.current = [];

        this._configurator = manager.configurator;
        this._stater = manager.stater;
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
        return this.containerEl?.style.transitionDuration !== '0ms';
    }

    get isAnimation(){
        return this._isAnimation;
    }




    onSlideAnimation = () => {
        this.containerEl.addEventListener('transitionstart', this.animationStart, false);
        this.containerEl.addEventListener('transitionend', this.animationEnd, false);
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
    getMovePercentage = (movePx: number, startPosition: number = 0) => {
        const {actual} = this._stater;
        const slideCurrWidth = this.slideItemEls[actual.activeIndex].offsetWidth;
        // console.log('xxxxxx', actual.activeIndex, slideCurrWidth);

        // const startPosition = this._getStartPosition(slideCurrWidth);

        console.log('startPosition',startPosition);
        // const percentage = getMovePercentage(movePx, startPosition, slideCurrWidth);
        // const mapIndex = this._stater.formatElement.find(row => row.order === percentage)
        return getMovePercentage(movePx, startPosition, slideCurrWidth);
    };



    /**
     * Percentage Move Percentage
     * @param percentage
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
        if(this.containerEl){
            // if(this.isOrder){
            //     this.containerEl.style.transform = `translate3d(${-1904}px, 0px, 0px)`;
            //     this.containerEl.style.transitionDuration = '0ms';
            //     setTimeout(() => {
            //         this.containerEl.style.transform = `translate3d(${-3808}px, 0px, 0px)`;
            //         this.containerEl.style.transitionDuration = `${this._configurator.setting.moveTime}ms`;
            //         console.log('go');
            //     }, 0);
            //
            //
            // }else{
            this.containerEl.style.transform = `translate3d(${translateX}px, 0px, 0px)`;
            this.containerEl.style.transitionDuration = isUseAnimation
                ? `${this._configurator.setting.moveTime}ms`
                : '0ms';
            // }


        }

        return this;
    }


    syncOrder = (activeActualIndex?: number) => {
        const itemEls = this.slideItemEls;
        const orders = activeActualIndex >= 0 ? calculateOrder(itemEls.length, activeActualIndex): undefined;

        this._stater.formatElement.forEach((row, index) => {
            row.order = orders ? orders.get(index): index;
        });

        itemEls
            .forEach((row, index) => {
                // row.style.order = String(orders.get(index));
                row.dataset.order = orders ? String(orders.get(index)): String(index);
            });
    };

    syncActiveState = (activeActualIndex: number, isPageOverflow?: boolean) => {
        const itemEls = this.slideItemEls
            .filter(row => row);
        // this.containerEl.style.transitionDuration = '500ms';
        // const orders = calculateOrder(itemEls.length, activeActualIndex);

        // if(isPageOverflow){
        //     this.isOrder = true;
        // }


        // 更改顯示在第幾個 (父元件使用可判定樣式設定)
        itemEls
            .forEach((row, index) => {
                // console.log('order',isPageOverflow, String(index));
                // row.style.order = isPageOverflow ? String(orders.get(index)): String(index);
                if(checkInRange(index, activeActualIndex, this.slideItemEls.length)){
                    row.setAttribute('data-active', 'true');
                } else if (row?.dataset.active) {
                    row.removeAttribute('data-active');
                }
            });

        // setTimeout(() => {
        //     this.containerEl.style.transitionDuration = '0ms';
        // }, 100);

        const active = itemEls.find(row => row.dataset.active === 'true');
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
        const checkNavGroup = this._stater.isVisibleNavButton && !this._configurator.setting.isEnableLoop;
        this.navGroupEl?.setAttribute('data-first', booleanToDataAttr(checkNavGroup && activePage === 1));
        this.navGroupEl?.setAttribute('data-last',  booleanToDataAttr(checkNavGroup && activePage === this._stater.page.pageTotal));

        // 只有一頁
        const pageOnlyOne = this._stater.page.pageTotal === 1;
        this.rootEl?.setAttribute('data-onlyOne',  pageOnlyOne && booleanToDataAttr(true));

        return this;
    };


    animationStart = () => {
        this._isAnimation = true;
        this.containerEl.dataset.animation = 'true';
    };

    animationEnd = () => {
        this._isAnimation = false;
        this.containerEl.removeAttribute('data-animation');
    };
    
    
    getTargetEl = (index: number) => {
        return this.slideItemEls.find(row => Number(row.dataset.order) === index);
    };
}


export default Elementor;
