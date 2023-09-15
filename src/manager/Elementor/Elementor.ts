import {createRef, RefObject} from 'react';
import {IMultiRefObject} from './types';

import {getMoveDistance, getMovePercentage, getStartPosition} from './utils';
import Configurator from '../Configurator';
import Stater from '../Stater';

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
    private _getStartPosition = () => {
        return getStartPosition(this._configurator, this._stater, this);
    };

    /**
     * Move Percentage
     * @param movePx
     */
    getMovePercentage = (movePx: number) => {
        const slideCurrWidth = this.slideItemEls[this._stater.virtual.activeIndex].offsetWidth;
        const startPosition = this._getStartPosition();
        return getMovePercentage(movePx, startPosition, slideCurrWidth);
    };



    /**
     * Percentage Move Percentage
     * @param percentage
     */
    getPercentageToMovePx = (percentage: number) => {
        const slideCurrWidth = this.slideItemEls[this._stater.virtual.activeIndex].offsetWidth;
        const startPosition = this._getStartPosition();

        return -(slideCurrWidth * percentage) + startPosition;
    };



    /**
     * Get the target item distance width(px)
     * @param slideIndex
     */
    getMoveDistance = (slideIndex: number): number => {
        const slideItemEl = this.slideItemEls[slideIndex];
        if (this.slideItemEls[slideIndex]) {
            return getMoveDistance(slideItemEl.offsetLeft, this._getStartPosition());
        }

        return 0;
    };


    /**
     * 設定是否移動中
     * 加上狀態讓其他元素不會影響滑動
     * @param isEnable
     */
    setTouching = (isEnable: boolean) => {
        if(isEnable){
            this.rootEl.dataset.touching = '';
        }else{
            this.rootEl.removeAttribute('data-touching');
        }
    };



    setSlideItemRefs(el: HTMLDivElement, index: number){
        this._slideItemRefs.current[index] = el;
    }
    setPageRefs(el: HTMLDivElement, index: number){
        this._pageRefs.current[index] = el;
    }


    transform(translateX: number, isUseAnimation = false){
        if(this.containerEl){
            this.containerEl.style.transform = `translate(${translateX}px, 0px)`;
            this.containerEl.style.transitionDuration = isUseAnimation
                ? `${this._configurator.setting.moveTime}ms`
                : '0ms';
        }

        return this;
    }


    /**
     * 移動效果
     * @param percentage
     * @param isUseAnimation
     */
    moveEffect(percentage: number, isUseAnimation = false){
        const {moveEffect} = this._configurator.setting;

        if(moveEffect && percentage >= 0){
            let index = 0;
            for(const el of this.slideItemEls){
                if(el){
                    const nextIndex = index + 1;
                    const prevIndex = index - 1;

                    if (percentage >= nextIndex) {
                        this._effectFn(el, index - percentage + 1, isUseAnimation);

                    } else if (percentage >= index) {
                        this._effectFn(el, index + 1 - percentage, isUseAnimation);

                    } else{
                        this._effectFn(el,  percentage - index + 1, isUseAnimation);
                    }
                }
                index += 1;
            }
        }
        return this;
    }


    /**
     * 移動效果
     * @param el
     * @param percentage
     * @param isUseAnimation
     */
    private _effectFn = (el: HTMLElement, percentage: number, isUseAnimation = false) => {
        if(this._configurator.setting.moveEffect?.transformY){
            el.style.transform = `translate(0px, ${-this._configurator.setting.moveEffect?.transformY * percentage}px)`;
            el.style.transition = isUseAnimation ? `${this._configurator.setting.moveEffect?.moveTime ?? '.3s'} transform`:'none';
        }
    };



    syncActiveState = (activeActualIndex: number) => {
        const itemEls = this.slideItemEls
            .filter(row => row);

        // 更改顯示在第幾個 (父元件使用可判定樣式設定)
        const inRangeIndex = this._stater.getInRangeIndex(activeActualIndex);
        itemEls
            .forEach((row, index) => {
                if(index === inRangeIndex){
                    row.setAttribute('data-active', '');
                } else if (row?.dataset.active === '') {
                    row.removeAttribute('data-active');
                }
            });

        const active = itemEls.find(row => row.dataset.active === '');
        const activePage = parseInt(active?.dataset.page);

        // 更改顯示在第幾頁的樣式 (父元件使用可判定樣式設定)
        if (this._stater.isVisiblePagination && this._stater.page.activePage > 0) {
            this.pageEls.forEach((row, index) => {
                if (activePage === index + 1) {
                    row.setAttribute('data-active', '');
                } else if(row?.dataset.active === '') {
                    row.removeAttribute('data-active');
                }
            });
        }


        const pageOnlyOne = this._stater.page.total === 1;
        const notPage = this._stater.virtual.total < this._configurator.setting.slidesPerView;

        // 提供是否為第一頁/最後一頁的判斷屬性
        if(this._stater.isVisibleNavButton && !this._configurator.setting.isEnableLoop){
            this.rootEl?.removeAttribute('data-first-page');
            this.rootEl?.removeAttribute('data-last-page');
            if(activePage <= 1 || pageOnlyOne || notPage){
                this.rootEl?.setAttribute('data-first-page', '');
            }
            if(activePage >= this._stater.page.total || pageOnlyOne || notPage){
                this.rootEl?.setAttribute('data-last-page',  '');
            }
        }
    };


    animationStart = () => {
        this._isAnimation = true;
        this.containerEl.dataset.animation = '';
    };

    animationEnd = () => {
        this._isAnimation = false;
        this.containerEl.removeAttribute('data-animation');
    };
}


export default Elementor;
