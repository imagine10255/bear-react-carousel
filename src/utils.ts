import {IBreakpointSetting, TSlidesPerView, IBreakpointSettingActual, IInfo, IPropsBreakpoints, IBearCarouselProps, InitData, EDirection, IAspectRatio, TBearSlideItemDataList} from './types';
import deepCompare from './deepCompare';

/**
 * 判斷是否為手機裝置
 */
export function checkIsMobile(): boolean {
    try { document.createEvent('TouchEvent'); return true; } catch (e) { return false; }
}
/**
 * 判斷是否為桌面裝置
 */
export function checkIsDesktop(): boolean {
    try { document.createEvent('MouseEvent'); return true; } catch (e) { return false; }
}

/**
 * 轉數字
 * ex: 1234 -> 1234
 *
 * @param value
 * @param defaultValue
 */
export function anyToNumber(value: any, defaultValue = 0): number {
    const numberValue = Number(value);
    if(!isNaN(numberValue)){
        return numberValue;
    }

    return defaultValue;
}


/**
 * 取得螢幕尺寸對應設定尺寸
 * @param innerWidth
 * @param breakpointSizes
 */
export function getSizeByRange(innerWidth: number, breakpointSizes: number[]): number{
    const filterArray = breakpointSizes
        .filter(size => size <= innerWidth)
        .sort((a, b) => Number(b) - Number(a));

    if (filterArray.length > 0) return filterArray[0];
    return 0;
}


/**
 * 取得響應式設定
 * @param setting
 * @param breakpoints
 */
export function getMediaSetting(defaultBreakpoint: IBreakpointSetting, breakpoints: IPropsBreakpoints): IBreakpointSettingActual {
    const selectSize = getSizeByRange(window.innerWidth, Object.keys(breakpoints).map(Number));
    let setting = defaultBreakpoint;
    if(selectSize > 0){
        setting = Object.assign(defaultBreakpoint, breakpoints[selectSize]);
    }

    // 若顯示項目大於來源項目, 則關閉Loop
    // if (setting.slidesPerView > dataLength) {
    //     setting.isEnableLoop = false;
    // }

    const slidesPerViewActual = setting.slidesPerView === 'auto' ? 1: anyToNumber(setting.slidesPerView , 1);
    return {
        ...setting,
        slidesPerViewActual: slidesPerViewActual,
        isEnableLoop: setting.slidesPerView === 'auto' ? false : setting.isEnableLoop,
        slidesPerGroup: setting.slidesPerGroup > slidesPerViewActual ? slidesPerViewActual:anyToNumber(setting.slidesPerGroup, 1), // fix
    };
}


/**
 * 初始化資料
 * @param sourceList
 * @param slidesPerView
 * @param slidesPerGroup
 * @param isLoop
 */
export function initDataList(sourceList: Array<any> = [], slidesPerView: TSlidesPerView = 1, slidesPerGroup = 1, isLoop= false): InitData[] {
    const formatList = [];
    const isClone = isLoop && typeof window !== 'undefined';
    let index = 0;
    const formatSlidesPerView = slidesPerView === 'auto' ? 0: Math.ceil(slidesPerView);
    const lastPage = (sourceList.length / slidesPerGroup) - (slidesPerGroup - formatSlidesPerView);

    if (isClone) {
        // 複製最後面, 放在最前面
        const cloneStart = (sourceList.length - formatSlidesPerView);
        for (const [cloneIndex, row] of sourceList.slice(-formatSlidesPerView).entries()) {
            formatList[index] = {
                actualIndex: index,
                matchIndex: formatSlidesPerView + cloneStart + index,
                sourceIndex: (sourceList.length - 1) - cloneIndex,
                inPage: lastPage,
                isClone: true,
                element: row.children,
            };
            index += 1;
        }
    }

    let matchFirstIndex = index;
    let pageFirstIndex = 0;
    for (const [sourceIndex, row] of sourceList.entries()) {
        formatList[index] = {
            key: String(row.key),
            actualIndex: index,
            matchIndex: index,
            sourceIndex: sourceIndex,
            inPage: Math.ceil((pageFirstIndex + 1) / slidesPerGroup),
            isClone: false,
            element: row.children,
        };
        index += 1;
        pageFirstIndex += 1;
    }

    if (isClone) {
    // 複製前面的(需顯示總數) 放在最後面

        for (const [cloneIndex, row] of sourceList.slice(0, formatSlidesPerView).entries()) {
            formatList[index] = {
                key: `${row.key}_clone`,
                actualIndex: index,
                matchIndex: matchFirstIndex,
                sourceIndex: cloneIndex,
                inPage: 1,
                isClone: true,
                element: row.children,
            };
            index += 1;
            matchFirstIndex += 1;
        }
    }
    return formatList;
}




/**
 * 取得 Matrix value
 * @param matrix
 */
export function getMatrixValue(matrix: string): number[] {
    const matrixValues = matrix.match(/matrix.*\((.+?)\)/);
    if(matrixValues === null) return [];
    return matrixValues[1]?.split(', ').map(Number);

}







/**
 * 依照尺寸取得比例
 * @param aspectRatio
 * @param slidesPerView
 */
export function getPaddingBySize(aspectRatio: IAspectRatio, slidesPerView: number): string {
    const calc = (100 * (aspectRatio.heightRatio / aspectRatio.widthRatio) / slidesPerView).toFixed(2);

    if(aspectRatio.addStaticHeight){
        return `calc(${calc}% + ${aspectRatio.addStaticHeight})`;
    }
    return `${calc}%`;
}


/**
 * 保留小數點兩位並四捨五入
 * @param num
 */
export function decimal2Rounding(num: number): number {
    return Math.floor(num * 100) / 100;
}


/**
 * 取得目標Index 使用 Page 計算
 * @param page
 * @param slidesPerGroup
 * @param actualFirstIndex
 */
export function getSlideIndex(page: number, slidesPerGroup: number, actualFirstIndex: number): number {
    return ((page - 1) * slidesPerGroup) + 1 + (actualFirstIndex - 1);
}



/**
 * 取得下一頁的 Index
 * @param isCenterMode
 * @param activeActualIndex
 * @param slidesPerGroup
 * @param slidesPerViewActual
 */
export function getNextPageFirstIndex(isCenterMode: boolean, activeActualIndex: number, slidesPerGroup: number, slidesPerViewActual: number){
    if (isCenterMode) {
        return activeActualIndex + slidesPerGroup;
    }
    // Avoid trailing whitespace
    return activeActualIndex + slidesPerViewActual;

}

/**
 * 取得下一頁的 Page
 * @param activePage
 */
export function getNextPage(activePage: number){
    return activePage + 1;
}

export function getLastIndex(elementTotal: number){
    return elementTotal - 1;
}


/**
 * 檢查是否在範圍內
 * @param slideIndex
 * @param range
 */
export function checkActualIndexInRange(slideIndex: number, range: {minIndex: number, maxIndex: number}): boolean {
    return slideIndex <= range.maxIndex && slideIndex >= range.minIndex;
}

/**
 * 取得Loop模式下移動重設
 * @param slideIndex
 * @param range
 */
export function getLoopResetIndex(activeActualIndex: number, residue: number): number {
    return activeActualIndex + residue;
}



/**
 * 取得下一個 Index
 * @param activeActual
 * @param info
 * @param setting
 */
export function getNextIndex(
    activeActual: { isClone: boolean, matchIndex: number, actualIndex: number },
    info: {
        nextPage: number,
        pageTotal: number,
        slideTotal: number,
        residue: number,
        isOverflowPage: boolean,
        isOverflowIndex: boolean,
    },
    setting: {
        slidesPerGroup: number,
        slidesPerViewActual: number,
        isLoopMode: boolean,
    },
): Array<{index: number, isUseAnimation: boolean}> {

    if(activeActual.isClone){
        // 當移動到的位置 已經是 clone item
        return [
            {index: activeActual.matchIndex, isUseAnimation: false},
            {index: activeActual.matchIndex + setting.slidesPerGroup, isUseAnimation: true},
        ];

    }else if (setting.isLoopMode && info.isOverflowPage && info.residue > 0) {

        // 若為Loop(最後一頁移動在不整除的時候, 移動位置需要復歸到第一個)
        return [
            {index: activeActual.actualIndex + info.residue, isUseAnimation: true},
        ];

    }else if (setting.slidesPerViewActual < info.slideTotal && info.isOverflowIndex === false) {

        // 若在範圍內，正常移動到下一頁
        return [
            {index: activeActual.actualIndex + setting.slidesPerGroup, isUseAnimation: true}
        ];
    }

    return [];
}



/**
 * 取得下一個 Index
 * @param activeActual
 * @param info
 * @param setting
 */
export function getPrevIndex(
    activeActual: { isClone: boolean, matchIndex: number, actualIndex: number },
    info: {
        activePage: number
        pageTotal: number,
        slideTotal: number,
        residue: number,
        isOverflowPage: boolean,
        isOverflowIndex: boolean,
    },
    setting: {
        slidesPerGroup: number,
        slidesPerViewActual: number,
        isLoopMode: boolean,
    },
): Array<{index: number, isUseAnimation: boolean}> {

    if(activeActual.isClone){
        // 當移動到的位置 已經是 clone item
        return [
            {index: activeActual.matchIndex, isUseAnimation: false},
            {index: activeActual.matchIndex - 1, isUseAnimation: true},
        ];

    }else if (setting.isLoopMode && info.activePage === 1 && info.residue > 0) {
        // 若為Loop(最後一頁移動在不整除的時候, 移動位置需要復歸到第一個)
        return [
            {index: activeActual.actualIndex - info.residue, isUseAnimation: true},
        ];

    }else if (setting.slidesPerViewActual > 0) {
        // 若在範圍內，正常移動到下一頁
        return [
            {index: activeActual.actualIndex - setting.slidesPerGroup, isUseAnimation: true}
        ];
    }

    return [];
}


export function isPropsDiff(props: IBearCarouselProps, nextProps: IBearCarouselProps, exclude: string[]) {
    const filterProps = Object.keys(props)
        .filter(key => typeof props[key] !== 'function' && exclude.includes(key))
        .map(key => props[key]);
    const nextFilterProps = Object.keys(nextProps)
        .filter(key => typeof props[key] !== 'function' && exclude.includes(key))
        .map(key => props[key]);

    return deepCompare(filterProps, nextFilterProps) === false;
}

export function isDataKeyDff(data: TBearSlideItemDataList, nextData: TBearSlideItemDataList) {
    const oldKey = data?.map((row) => row.key).join('_');
    const nextKey = nextData?.map((row) => row.key).join('_');

    return oldKey !== nextKey;
};



export function booleanToDataAttr(isTrue: boolean, returnValue: number|string|boolean = true): string|undefined{
    if(isTrue){
        return String(returnValue);
    }
    return undefined;
}



