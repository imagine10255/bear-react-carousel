import {TEventMap, InitData} from './types';
import {IInfo, TBearSlideItemDataList} from '../../types';
import {getInRangeIndex, getPrevPageFirstIndex, initDataList} from './utils';
import {getNextPageFirstIndex} from './utils';
import Configurator from '../Configurator';
import Eventor from '../Eventor';
import {checkDataFormat} from '../../utils';


class Stater {
    private _info: IInfo;
    private _formatElement: InitData[];
    private _configurator: Configurator;
    private _eventor = new Eventor<TEventMap>();


    constructor(setter: Configurator, data?: TBearSlideItemDataList) {
        this._configurator = setter;
        this._info = this.formatInfo(data);

        const {slidesPerViewActual, slidesPerGroup, isEnableLoop} = this._configurator.setting;


        if(!checkDataFormat(data)){
            throw new Error(`[bear-react-carousel] Data format error: must be ReactNode[] not Array<{key: string, children: ReactNode}>\n
  Please read the 5.x upgrade guide: https://bear-react-carousel.pages.dev/docs/faqs/migration-to-5
`);
        }

        this._formatElement = initDataList(
            data,
            slidesPerViewActual,
            slidesPerGroup,
            isEnableLoop
        );

        this._eventor.emit('change');
    }


    get nextPage(): number{
        return this._info.page.activePage + 1;
    }

    get nextPageFirstIndex(): number{
        const {setting} = this._configurator;
        return getNextPageFirstIndex(setting.isCenteredSlides ?? false, this.virtual.activeIndex, setting.slidesPerGroup, setting.slidesPerViewActual);
    }

    get prevPage(): number{
        return this._info?.page.activePage - 1;
    }

    get prevPageFirstIndex(): number{
        const {setting} = this._configurator;
        return getPrevPageFirstIndex(setting.isCenteredSlides ?? false, this.virtual.activeIndex, setting.slidesPerGroup, setting.slidesPerViewActual);
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

    reset = (slideData: TBearSlideItemDataList = []) => {
        this._info = this.formatInfo(slideData);
        this._eventor.emit('change');
    };

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
        return getInRangeIndex(index, this);
    };


    formatInfo = (slideData: TBearSlideItemDataList = []): IInfo => {
        const {slidesPerView, slidesPerViewActual, slidesPerGroup, isCenteredSlides, isEnablePagination, isEnableNavButton, isEnableLoop} = this._configurator.setting;

        let sourceTotal = slideData.length;
        this.updateData(slideData);

        const elementTotal = this.formatElement.length;

        // clone
        // const cloneBeforeTotal = isEnableLoop ? slidesPerViewActual : 0;
        // const cloneAfterTotal = cloneBeforeTotal;

        // actual
        const actualIndex = {min: 0, max: elementTotal - 1};

        // calc fake total
        let fakeTotalPage = Math.ceil(sourceTotal / slidesPerGroup);

        const isPriorPosition = !(isEnableLoop ||
            isCenteredSlides ||
            slidesPerView === 'auto'
        );

        // @TODO: 設定跟 Stater.utils.getInRangeIndex 相同
        if(isPriorPosition){
            fakeTotalPage = fakeTotalPage - (slidesPerView - slidesPerGroup);
        }


        // this._eventor.emit('change');

        return {
            // 從0開始
            source: {
                activeIndex: 0,
                activeInPageIndex: 0,
                prevActiveIndex: 0,
                lastIndex: sourceTotal - 1,
                total: sourceTotal,
            },
            // 0為實際一開始的位置(往前為負數), 結束值為最後結束位置
            virtual: {
                activeIndex: 0,
                prevActiveIndex: 0,
                lastIndex: isPriorPosition? Math.ceil(actualIndex.max - (this._configurator.setting.slidesPerViewActual - 1)): actualIndex.max,
                total: this._formatElement.length,
            },
            page: {
                limit: this._configurator.setting.slidesPerGroup,
                activePage: 1,
                total: fakeTotalPage > 0 ? fakeTotalPage : 1,
            },
            // 總頁數
            residue: elementTotal % slidesPerGroup,
            isVisiblePagination: !!(isEnablePagination && this.formatElement.length > 0),
            isVisibleNavButton: !!(isEnableNavButton && this.formatElement.length > 0),
        };
    };

    updateData = (slideData: TBearSlideItemDataList = []) => {
        const {slidesPerViewActual, slidesPerGroup, isEnableLoop} = this._configurator.setting;
        this._formatElement = initDataList(
            slideData,
            slidesPerViewActual,
            slidesPerGroup,
            isEnableLoop
        );
    };

    setActiveActual = (index: number, page: number) => {
        if(this.virtual.activeIndex !== index){
            this.source.prevActiveIndex = this.formatElement[this.virtual.activeIndex]?.sourceIndex ?? 0;
            this.source.activeIndex = this.formatElement[index]?.sourceIndex ?? 0;
            this.source.activeInPageIndex = this.formatElement[index]?.inPageIndex ?? 0;

            this.virtual.prevActiveIndex = this.virtual.activeIndex;
            this.virtual.activeIndex = index;

            this.page.activePage = page;

            this._eventor.emit('change');
        }
    };

}


export default Stater;
