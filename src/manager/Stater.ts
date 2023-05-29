import {IInfo, TBearSlideItemDataList} from '../types';
import {checkActualIndexInRange, getNextPageFirstIndex, getSlideIndex, initDataList} from '../utils';
import Configurator from './Configurator';
type TCallback = () => void

class Stater {
    private _configurator: Configurator;
    private _info: IInfo;
    private events: Record<string, TCallback[]> = {};

    constructor(setter: Configurator, data: TBearSlideItemDataList) {
        this._configurator = setter;
        this.init(data);
    }


    // @TODO: 禁止使用，所以需要刪除
    get info(): IInfo {
        return this._info;
    }

    get nextPage(): number{
        return this._info.page.activePage + 1;
    }

    get nextPageFirstIndex(): number{
        const {setting} = this._configurator;
        return getNextPageFirstIndex(setting.isCenteredSlides, this.actual.activeIndex, setting.slidesPerGroup, setting.slidesPerViewActual);
    }

    get prevPage(): number{
        return this._info.page.activePage - 1;
    }

    get actual() {
        return this._info.actual;
    }

    get page() {
        return this._info.page;
    }

    get formatElement() {
        return this._info.formatElement;
    }

    get element() {
        return this._info.element;
    }

    get residue() {
        return this._info.residue;
    }


    on(eventName: string, callback: TCallback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    emit(eventName: string) {
        if (this.events[eventName]) {
            for (const callback of this.events[eventName]) {
                callback();
            }
        }
    }

    /**
     * 確認是否超出範圍
     * @param index
     */
    checkActualIndexInRange = (index: number) => {
        const {minIndex, maxIndex} = this.actual;
        return checkActualIndexInRange(index, {minIndex, maxIndex});
    };


    init = (slideData: TBearSlideItemDataList = []) => {
        const {slidesPerView, slidesPerViewActual, slidesPerGroup, isCenteredSlides, isEnablePagination, isEnableNavButton, isEnableLoop} = this._configurator.setting;

        let sourceTotal = slideData.length;
        const formatElement = initDataList(
            slideData,
            slidesPerViewActual,
            slidesPerGroup,
            isEnableLoop
        );

        const elementTotal = formatElement.length;

        // clone
        const cloneBeforeTotal = isEnableLoop ? slidesPerViewActual : 0;
        const cloneAfterTotal = cloneBeforeTotal;

        // actual
        const actualIndex = {min: 0, max: elementTotal - 1};

        // calc fake total
        let fakeTotalPage = Math.ceil(sourceTotal / slidesPerGroup);

        if(!isEnableLoop && slidesPerView !== 'auto' && !isCenteredSlides){
            fakeTotalPage = fakeTotalPage - (slidesPerView - slidesPerGroup);
        }

        this._info = {
            formatElement,
            sourceTotal, // 來源總數
            // 從0開始
            element: {
                activeIndex: 0,
                firstIndex: 0,
                lastIndex: elementTotal - 1,
                total: elementTotal,
            },
            // 0為實際一開始的位置(往前為負數), 結束值為最後結束位置
            actual: {
                activeIndex: 0,
                minIndex: actualIndex.min,
                maxIndex: actualIndex.max,
                firstIndex: Math.ceil(cloneBeforeTotal),
                lastIndex: Math.ceil(sourceTotal + cloneAfterTotal - 1)
            },
            page: {
                activePage: 0,
                pageTotal: fakeTotalPage,
            },
            // 總頁數
            residue: elementTotal % slidesPerGroup,
            isVisiblePagination: isEnablePagination && formatElement.length > 0,
            isVisibleNavButton: isEnableNavButton && formatElement.length > 0
        };
        this.emit('change');
    };

    setActiveActual = (index: number, page: number) => {
        this.info.actual.activeIndex = index;
        this.info.page.activePage = page;
        this.emit('change');
    };

}


export default Stater;
