import {TEventMap, InitData} from './types';
import {IInfo, TBearSlideItemDataList} from '../../types';
import {getInRangeIndex, initDataList} from './utils';
import {getNextPageFirstIndex} from './utils';
import Configurator from '../Configurator';
import Eventor from '../Eventor';


class Stater {
    private _info: IInfo;
    private _formatElement: InitData[];
    private _configurator: Configurator;
    private _eventor = new Eventor<TEventMap>();


    constructor(setter: Configurator, data: TBearSlideItemDataList) {
        this._configurator = setter;
        this.init(data);
    }

    get nextPage(): number{
        return this._info.page.activePage + 1;
    }

    get nextPageFirstIndex(): number{
        const {setting} = this._configurator;
        return getNextPageFirstIndex(setting.isCenteredSlides, this.actual.activeIndex, setting.slidesPerGroup, setting.slidesPerViewActual);
    }

    get prevPage(): number{
        return this._info?.page.activePage - 1;
    }

    get actual() {
        return this._info?.actual;
    }

    get page() {
        return this._info?.page;
    }

    get formatElement() {
        return this._formatElement;
    }

    get element() {
        return this._info?.element;
    }

    get residue() {
        return this._info?.residue ?? 0;
    }

    get isVisibleNavButton() {
        return this._info?.isVisibleNavButton;
    }

    get isVisiblePagination() {
        return this._info?.isVisiblePagination;
    }


    onChange = (callback: TEventMap['change']) => {
        this._eventor.on('change', callback);
    };

    offChange = (callback: TEventMap['change']) => {
        this._eventor.off('change', callback);
    };


    /**
     * 確認是否超出範圍
     * @param index
     */
    getInRangeIndex = (index: number): number => {
        return getInRangeIndex(index, this, this._configurator);
    };


    init = (slideData: TBearSlideItemDataList = []) => {
        const {slidesPerView, slidesPerViewActual, slidesPerGroup, isCenteredSlides, isEnablePagination, isEnableNavButton, isEnableLoop} = this._configurator.setting;

        let sourceTotal = slideData.length;
        this.updateData(slideData);

        const elementTotal = this.formatElement.length;

        // clone
        const cloneBeforeTotal = isEnableLoop ? slidesPerViewActual : 0;
        const cloneAfterTotal = cloneBeforeTotal;

        // actual
        const actualIndex = {min: 0, max: elementTotal - 1};

        // calc fake total
        let fakeTotalPage = Math.ceil(sourceTotal / slidesPerGroup);

        // @TODO: 設定跟 Stater.utils.getInRangeIndex 相同
        if(!(isEnableLoop ||
            isCenteredSlides ||
            slidesPerView === 'auto' ||
            !Number.isInteger(slidesPerView)
        )){
            fakeTotalPage = fakeTotalPage - (slidesPerView - slidesPerGroup);
        }

        this._info = {
            sourceTotal, // 來源總數
            // 從0開始
            element: {
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
                lastIndex: Math.ceil(sourceTotal + cloneAfterTotal - 1),
                moveLastIndex: actualIndex.max - (this._configurator.setting.slidesPerViewActual - 1),
            },
            page: {
                activePage: 0,
                pageTotal: fakeTotalPage,
            },
            // 總頁數
            residue: elementTotal % slidesPerGroup,
            isVisiblePagination: isEnablePagination && this.formatElement.length > 0,
            isVisibleNavButton: isEnableNavButton && this.formatElement.length > 0
        };
        this._eventor.emit('change');
    };

    updateData = (slideData: TBearSlideItemDataList = []) => {
        const {slidesPerViewActual, slidesPerGroup, isEnableLoop} = this._configurator.setting;
        this._formatElement = initDataList(
            slideData,
            slidesPerViewActual,
            slidesPerGroup,
            isEnableLoop
        );

        return this.element;

    };

    setActiveActual = (index: number, page: number) => {
        this.actual.activeIndex = index;
        this.page.activePage = page;
        this._eventor.emit('change');
    };

}


export default Stater;
