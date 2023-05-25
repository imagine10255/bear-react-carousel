import {IBreakpointSettingActual, IInfo, TBearSlideItemDataList} from '../types';
import {getMediaInfo, initDataList} from '../utils';
import SlideSettingManager from './SlideSettingManager';

class SlideItemManager {
    private _slideSettingManager: SlideSettingManager;
    private _info: IInfo;

    constructor(slideSettingManager: SlideSettingManager, data: TBearSlideItemDataList) {
        this._slideSettingManager = slideSettingManager;
        this.init(data);
    }

    init(slideData: TBearSlideItemDataList = []) {
        const {slidesPerView, slidesPerViewActual, slidesPerGroup, isCenteredSlides, isEnablePagination, isEnableNavButton, isEnableLoop} = this._slideSettingManager.setting;

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
    }

    setActiveActual(index: number, page: number){
        this.info.actual.activeIndex = index;
        this.info.page.activePage = page;
    }

    get info(): IInfo {
        return this._info;
    }


    get nextPage(): number{
        return this._info.page.activePage + 1;
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

    get residue() {
        return this._info.residue;
    }

    //
    // setSetting(setting: IBreakpointSettingActual) {
    //     this._setting = setting;
    // }


}


export default SlideItemManager;
