
import {getMoveDistance, getMovePercentage, getStartPosition} from './utils';
import Configurator from '../Configurator';
import Stater from '../Stater';
import {IPercentageInfo} from '../../types';
import {objectKeys} from '../../utils';
import Elementor from './Elementor';

class ElState {
    _elementor: Elementor;

    private _configurator: Configurator;
    private _stater: Stater;
    private _isAnimation = false;


    constructor(manager: {
        configurator: Configurator,
        elementor: Elementor,
        stater: Stater,
    }) {
        this._elementor = manager.elementor;
        this._configurator = manager.configurator;
        this._stater = manager.stater;
    }


    get isUseAnimation(){
        return this._elementor.containerEl?.style.transitionDuration !== '0ms';
    }

    get isAnimation(){
        return this._isAnimation;
    }




    onSlideAnimation = () => {
        this._elementor.containerEl?.addEventListener('transitionstart', this.animationStart, false);
        this._elementor.containerEl?.addEventListener('transitionend', this.animationEnd, false);

    };

    offSlideAnimation = () => {
        this._elementor.containerEl?.removeEventListener('transitionstart', this.animationStart, false);
        this._elementor.containerEl?.removeEventListener('transitionend', this.animationEnd, false);
    };


    /**
     * 取得初始距離
     */
    private _getStartPosition = () => {
        return getStartPosition(this._configurator, this._stater, this._elementor);
    };

    /**
     * Move Percentage
     * @param movePx
     */
    getMovePercentage = (movePx: number) => {
        const slideCurrWidth = (this._elementor.slideItemEls && this._elementor.slideItemEls[this._stater.virtual.activeIndex].offsetWidth) ?? 0;
        const startPosition = this._getStartPosition();
        return getMovePercentage(movePx, startPosition, slideCurrWidth);
    };



    /**
     * Percentage Move Percentage
     * @param percentage
     */
    getPercentageToMovePx = (percentage: number) => {
        const slideCurrWidth = (this._elementor.slideItemEls && this._elementor.slideItemEls[this._stater.virtual.activeIndex].offsetWidth) ?? 0;
        const startPosition = this._getStartPosition();

        return -(slideCurrWidth * percentage) + startPosition;
    };



    /**
     * Get the target item distance width(px)
     * @param slideIndex
     */
    getMoveDistance = (slideIndex: number): number => {
        if (this._elementor.slideItemEls && this._elementor.slideItemEls[slideIndex]) {
            const slideItemEl = this._elementor.slideItemEls[slideIndex];
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
            if(this._elementor.rootEl){
                this._elementor.rootEl.dataset.touching = '';
            }
        }else{
            if(this._elementor.rootEl) {
                this._elementor.rootEl.removeAttribute('data-touching');
            }
        }
    };




    transform(translateX: number, isUseAnimation = false){
        if(this._elementor.containerEl){
            this._elementor.containerEl.style.transform = `translate(${translateX}px, 0px)`;
            this._elementor.containerEl.style.transitionDuration = isUseAnimation
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
        const {moveEffect, slidesPerView, isCenteredSlides} = this._configurator.setting;
        if(typeof slidesPerView === 'number' && moveEffect?.moveFn){
            let index = 0;
            if(this._elementor.slideItemEls){
                for(const el of this._elementor.slideItemEls){
                    if(el){
                        // 離場的進度 (因為是 center, 所以需要 除以2)
                        const fadeoutProcess = isCenteredSlides ? Math.floor(slidesPerView / 2) + 1 : slidesPerView;

                        // 目前進度
                        const currActiveIs0Process = percentage - index;

                        // 如果到達1就要下降
                        const calcPercentage = currActiveIs0Process >= 0 ?
                            (fadeoutProcess - currActiveIs0Process) / fadeoutProcess:
                            (fadeoutProcess + currActiveIs0Process) / fadeoutProcess
                        ;

                        // debug
                        // if(index === 1){
                        //     console.log('currActiveIs0Process', currActiveIs0Process, calcP);
                        // }

                        // 離場
                        this._effectFn(el, {
                            calcPercentage,
                            percentage: currActiveIs0Process,
                            index,
                        }, isUseAnimation);
                    }
                    index += 1;
                }
            }

        }
        return this;
    }


    /**
     * 移動效果
     * @param el
     * @param percentageInfo
     * @param isUseAnimation
     */
    private _effectFn = (el: HTMLElement, percentageInfo: IPercentageInfo, isUseAnimation = false) => {
        if(this._configurator.setting.moveEffect?.moveFn){
            const moveStyles = this._configurator.setting.moveEffect.moveFn(percentageInfo);
            if(moveStyles){
                objectKeys(moveStyles).forEach(rowStyleKey => {
                    // @ts-ignore
                    el.style[rowStyleKey] = moveStyles[rowStyleKey];
                });
                if(isUseAnimation){
                    el.style.transition = Object.keys(moveStyles).map(rowStyleKey => {
                        return `${this._configurator.setting.moveEffect?.moveTime ?? '.3s'} ${rowStyleKey}`;
                    }).join(', ');
                }else{
                    el.style.transition = 'none';
                }
            }
        }
    };



    syncActiveState = (activeActualIndex: number) => {
        const itemEls = this._elementor.slideItemEls
            ?.filter(row => row);

        // 更改顯示在第幾個 (父元件使用可判定樣式設定)
        const inRangeIndex = this._stater.getInRangeIndex(activeActualIndex);
        itemEls
            ?.forEach((row, index) => {
                if(index === inRangeIndex){
                    row.setAttribute('data-active', '');
                } else if (row?.dataset.active === '') {
                    row.removeAttribute('data-active');
                }
            });

        const active = itemEls?.find(row => row.dataset.active === '');
        const activePage = active?.dataset.page ? parseInt(active.dataset.page): 0;

        // 更改顯示在第幾頁的樣式 (父元件使用可判定樣式設定)
        if (this._stater.isVisiblePagination && this._stater.page.activePage > 0) {
            this._elementor.pageEls?.forEach((row, index) => {
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
            this._elementor.rootEl?.removeAttribute('data-first-page');
            this._elementor.rootEl?.removeAttribute('data-last-page');
            if(activePage <= 1 || pageOnlyOne || notPage){
                this._elementor.rootEl?.setAttribute('data-first-page', '');
            }
            if(activePage >= this._stater.page.total || pageOnlyOne || notPage){
                this._elementor.rootEl?.setAttribute('data-last-page',  '');
            }
        }
    };


    animationStart = () => {
        this._isAnimation = true;
        if(this._elementor.containerEl){
            this._elementor.containerEl.dataset.animation = '';
        }
    };

    animationEnd = () => {
        this._isAnimation = false;

        if(this._elementor.containerEl) {
            this._elementor.containerEl.removeAttribute('data-animation');
        }
    };
}


export default ElState;
