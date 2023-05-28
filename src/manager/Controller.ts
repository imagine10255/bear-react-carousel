import {calcMoveTranslatePx, checkInRange, getNextIndex, getPrevIndex, getSlideIndex} from '../utils';
import Configurator from './Configurator';
import Stater from './Stater';
import elClassName from '../el-class-name';
import Locator from './Locator';
import Elementor from './Elementor';
import {ICarouselState} from '../types';

class Controller {

    private readonly _configurator: Configurator;
    private readonly _stater: Stater;
    private readonly _locator: Locator;
    private readonly _elementor: Elementor;
    _onChange: () => void;

    moveTime = 500;

    constructor(manager: {
        configurator: Configurator,
        stater: Stater,
        locator: Locator,
        elementor: Elementor,
    }) {
        this._configurator = manager.configurator;
        this._stater = manager.stater;
        this._locator = manager.locator;
        this._elementor = manager.elementor;
    }


    /**
     * reset page position (Only LoopMode)
     * PS: If the element is isClone then return to the position where it should actually be displayed
     */
    slideResetToMatchIndex = (): void => {
        // if(this.props.isDebug && logEnable.resetPosition) log.printInText('[_resetPosition]');
        const {actual, formatElement} = this._stater;

        if (formatElement[actual.activeIndex].isClone) {
            this.slideToActualIndex(formatElement[actual.activeIndex].matchIndex, false);
        }
    };


    dragMove(moveX: number) {
        //     if(this.props.isDebug && logEnable.elementMove) log.printInText('[_elementMove]');

        this._elementor.setNonSubjectTouch(false);



        const {startPosition} = this._locator;
        const {setting} = this._configurator;

        if (this._elementor.containerEl && setting.isEnableMouseMove && this._elementor.slideItemEls) {
            // console.log('this.position.startPosition.x', this._isSyncControl(), moveX);
            const translateX = calcMoveTranslatePx(startPosition.x, moveX);
            const percentage = this._elementor.getMovePercentage(translateX); //TODO: 應該移動到 Positioner

            this._elementor.containerEl.style.transform = `translate(${translateX}px, 0px)`;
            this._elementor.containerEl.style.transitionDuration = '0ms';

            // 取得移動進度
            // if(this.props.onElementMove){
            //     this.props.onElementMove(this.activeActualIndex, percentage);
            // }

            // 同步控制
            // this._syncControlMove(percentage);


            // 更改顯示在第幾個 (父元件使用可判定樣式設定)
            if(this._elementor.slideItemEls){
                const activeActualIndex = Math.round(percentage);
                this._elementor.slideItemEls
                    .forEach((row, index) => {
                        if(checkInRange(index, activeActualIndex, this._elementor.slideItemEls.length)){
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
        this._elementor.setNonSubjectTouch(true);


        if(this._elementor.slideItemEls){
            const active = this._elementor.slideItemEls.find(row => row.dataset.active === 'true');
            if(active){
                const activePage = Number(active.dataset.page);
                this.slideToPage(activePage);
                // this.slideToActualIndex(activeActualIndex);

                // const activeSourceIndex = Number(active.dataset.source);
                // this._syncControlDone(activeSourceIndex);
            }
        }

        // this._setOtherTouch(true);
    };


    slideToActualIndex(slideIndex: number, isUseAnimation = true){
        if (this._stater.checkActualIndexInRange(slideIndex)) {
            const {formatElement} = this._stater;
            this._stater.setActiveActual(slideIndex, formatElement[slideIndex]?.inPage ?? 1);

            // 移動EL位置
            const position = this._elementor.getMoveDistance(slideIndex);
            if (this._elementor.containerEl) {
                const className = this._elementor.containerEl.classList;
                if(!className.contains(elClassName.containerInit)){
                    className.add(elClassName.containerInit);
                }

                this._elementor.containerEl.style.transform = `translate(${position}px, 0px)`;
                this._elementor.containerEl.style.transitionDuration = isUseAnimation
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
            const slideItemEls = this._elementor.pageEls;
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

            this._onChange();
        }
    }

    /**
     * 移動到指定頁面
     * @param page
     * @param isUseAnimation 是否開啟動畫
     * ex: slideView: 2, slideGroup: 2, total: 4
     * page1 -> (1-1) * 2) + 1 + (firstIndex -1) = 1
     */
    slideToPage(page: number, isUseAnimation = true){
        const {setting} = this._configurator;
        const {actual} = this._stater;

        const slideIndex = getSlideIndex(page, setting.slidesPerGroup, actual.firstIndex);
        this.slideToActualIndex(slideIndex, isUseAnimation);
    }


    /**
     * 移動到下一頁
     */
    slideToNextPage = (): void => {

        const {nextPage, formatElement, page, actual, residue, element, nextPageFirstIndex} = this._stater;
        const {setting} = this._configurator;
        const activeActual = formatElement[actual.activeIndex];

        getNextIndex(
            activeActual,
            {
                nextPage: nextPage,
                residue: residue,
                pageTotal: page.pageTotal,
                slideTotal: this._stater.info.formatElement.length,
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

        const {nextPage, formatElement, page, actual, residue, element, nextPageFirstIndex} = this._stater;
        const {setting} = this._configurator;
        const activeActual = formatElement[actual.activeIndex];

        getPrevIndex(
            activeActual,
            {
                activePage: this._stater.page.activePage,
                residue: residue,
                pageTotal: page.pageTotal,
                slideTotal: this._stater.info.formatElement.length,
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


    onChange(cb: () => void){
        this._onChange = cb;
        // if(this.props.onChange){
        //     console.log('onChange');
        //     const {element, actual, page} = this._stater;
        //     this.props?.onChange({element, actual, page});
        // }
    }

}


export default Controller;
