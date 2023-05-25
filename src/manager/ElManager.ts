import {IInfo, TBearSlideItemDataList} from '../types';
import {checkActualIndexInRange, getMoveDistance, getSlideIndex, getStartPosition, initDataList} from '../utils';
import SlideSettingManager from './SlideSettingManager';
import * as React from 'react';
import SlideItemManager from './SlideItemManager';
import elClassName from '../el-class-name';

class ElManager {
    rootRef: React.RefObject<HTMLDivElement> = React.createRef();
    containerRef: React.RefObject<HTMLDivElement> = React.createRef();
    slideItemRefs: React.RefObject<Array<HTMLDivElement>> = React.createRef();
    pageRefs: React.RefObject<Array<HTMLDivElement>> = React.createRef();
    pageGroupRef: React.RefObject<HTMLDivElement> = React.createRef();
    navGroupRef: React.RefObject<HTMLDivElement> = React.createRef();
    slideSettingManager: SlideSettingManager;
    slideItemManager: SlideItemManager;

    moveTime = 500;

    constructor(slideSettingManager, slideItemManager) {
        // @ts-ignore
        this.slideItemRefs.current = [];
        // @ts-ignore
        this.pageRefs.current = [];

        this.slideSettingManager = slideSettingManager;
        this.slideItemManager = slideItemManager;

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

    setSlideItemRefs(el: HTMLDivElement, index: number){
        this.slideItemRefs.current[index] = el;
    }
    setPageRefs(el: HTMLDivElement, index: number){
        this.pageRefs.current[index] = el;
    }


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

    slideToActualIndex(slideIndex: number, isUseAnimation = true){
        if (this.slideItemManager.checkActualIndexInRange(slideIndex)) {
            const {formatElement} = this.slideItemManager;
            this.slideItemManager.setActiveActual(slideIndex, formatElement[slideIndex]?.inPage ?? 1);

            console.log('test');
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
