import * as React from 'react';
import {getMoveDistance, getMovePercentage, getStartPosition} from '../utils';
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

    private _setter: Configurator;
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

        this._setter = manager.configurator;
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
        return getStartPosition(this._setter.setting.isCenteredSlides,
            {
                slidesPerView: this._setter.setting.slidesPerView,
                slidesPerViewActual: this._setter.setting.slidesPerViewActual,
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
        if(this.pageGroupEl){
            this.pageGroupEl.setAttribute('data-touch', isEnable ? 'true': 'false');
        }
        if(this.navGroupEl){
            this.navGroupEl.setAttribute('data-touch', isEnable ? 'true': 'false');
        }
    };



    setSlideItemRefs(el: HTMLDivElement, index: number){
        this._slideItemRefs.current[index] = el;
    }
    setPageRefs(el: HTMLDivElement, index: number){
        this._pageRefs.current[index] = el;
    }



}


export default Elementor;
