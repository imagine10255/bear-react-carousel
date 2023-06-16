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
        return getNextPageFirstIndex(setting.isCenteredSlides, this.virtual.activeIndex, setting.slidesPerGroup, setting.slidesPerViewActual);
    }

    get prevPage(): number{
        return this._info?.page.activePage - 1;
    }

    get virtual() {
        return this._info?.virtual;
    }

    get page() {
        return this._info?.page;
    }

    get formatElement() {
        return this._formatElement;
    }

    get source() {
        return this._info?.source;
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

        const isPriorPosition = !(isEnableLoop ||
            isCenteredSlides ||
            slidesPerView === 'auto' ||
            !Number.isInteger(slidesPerView)
        );

        // @TODO: 設定跟 Stater.utils.getInRangeIndex 相同
        if(isPriorPosition){
            fakeTotalPage = fakeTotalPage - (slidesPerView - slidesPerGroup);
        }

        this._info = {
            // 從0開始
            source: {
                activeIndex: 0,
                lastIndex: sourceTotal - 1,
                total: sourceTotal,
            },
            // 0為實際一開始的位置(往前為負數), 結束值為最後結束位置
            virtual: {
                activeIndex: 0,
                lastIndex: isPriorPosition? Math.ceil(actualIndex.max - (this._configurator.setting.slidesPerViewActual - 1)): actualIndex.max,
                total: this._formatElement.length,
            },
            page: {
                activePage: 0,
                total: fakeTotalPage > 0 ? fakeTotalPage : 1,
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

        // return this.element;

    };

    setActiveActual = (index: number, page: number) => {
        this.source.activeIndex = this.formatElement[index]?.sourceIndex ?? 0;
        this.virtual.activeIndex = index;
        this.page.activePage = page;
        this._eventor.emit('change');
    };

}


export default Stater;
