import {IBreakpointSetting, TSlidesPerView, IBreakpointSettingActual, IInfo, IPropsBreakpoints, IBearCarouselProps, InitData, EDirection, IAspectRatio} from './types';

/**
 * 判斷是否為手機裝置
 */
export function checkIsMobile(): boolean {
    try { document.createEvent('TouchEvent'); return true; } catch (e) { return false; }
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
 * 取得響應式設定
 * @param props
 */
export function getMediaInfo(props: IBearCarouselProps): {rwdMedia: IBreakpointSettingActual, info: IInfo} {

    const {
        data,
        breakpoints,

        slidesPerView,
        slidesPerGroup,
        aspectRatio,
        staticHeight,
        spaceBetween,
        isCenteredSlides,
        isEnableNavButton,
        isEnablePagination,
        isEnableMouseMove,
        isEnableAutoPlay,
        isEnableLoop,
    } = props;

    const rwdMedia = getMediaSetting({
        slidesPerView: typeof slidesPerView === 'number' && slidesPerView <= 0 ? 1: slidesPerView,
        slidesPerGroup,
        aspectRatio,
        staticHeight,
        spaceBetween,
        isCenteredSlides,
        isEnableNavButton,
        isEnablePagination,
        isEnableMouseMove,
        isEnableAutoPlay,
        isEnableLoop,
    }, breakpoints);


    // const divisible = data.length % rwdMedia.slidesPerGroup; // 餘數
    // let sliceData = divisible > 0 ? data.slice(0, data.length - divisible) : data;
    let sliceData = data ?? [];
    let sourceTotal = sliceData.length;
    const formatElement = initDataList(
        sliceData,
        rwdMedia.slidesPerViewActual,
        rwdMedia.slidesPerGroup,
        rwdMedia.isEnableLoop
    );


    const elementTotal = formatElement.length;
    const cloneBeforeTotal = rwdMedia.isEnableLoop ? rwdMedia.slidesPerViewActual : 0;
    const cloneAfterTotal = cloneBeforeTotal;
    const actualMinIndex = 0;
    const actualMaxIndex = elementTotal - 1;


    let fakeTotalPage = Math.ceil(sourceTotal / rwdMedia.slidesPerGroup);
    if(!rwdMedia.isEnableLoop && rwdMedia.slidesPerView !== 'auto' && !rwdMedia.isCenteredSlides){
        fakeTotalPage = fakeTotalPage - (rwdMedia.slidesPerView - rwdMedia.slidesPerGroup);
    }

    const info: IInfo = {
        formatElement,
        sourceTotal, // 來源總數
        // 從0開始
        element: {
            activeIndex: 1,
            total: elementTotal,
            firstIndex: 0,
            lastIndex: elementTotal - 1
        },
        // 0為實際一開始的位置(往前為負數), 結束值為最後結束位置
        actual: {
            activeIndex: 1,
            minIndex: actualMinIndex,
            maxIndex: actualMaxIndex,
            firstIndex: Math.ceil(cloneBeforeTotal),
            lastIndex: Math.ceil(sourceTotal + cloneAfterTotal - 1)
        },
        // 總頁數
        page: {
            pageTotal: fakeTotalPage,
            activePage: 1,
        },
        residue: elementTotal % rwdMedia.slidesPerGroup,
        isVisiblePagination: rwdMedia.isEnablePagination && formatElement.length > 0,
        isVisibleNavButton: rwdMedia.isEnableNavButton && formatElement.length > 0
    };

    return {
        info,
        rwdMedia,
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
 * 計算 返回角度
 * @param dx
 * @param dy
 */
export function getSlideAngle(dx: number, dy: number): number {
    return Math.atan2(dy, dx) * 180 / Math.PI;
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
 * 取得 transform x 移動參數
 * @param el
 */
export function getTranslateParams(el: HTMLDivElement): {x: number, y: number, z: number}{
    const style = window.getComputedStyle(el);
    const matrix = style.transform;

    const matrixType = matrix.includes('3d') ? '3d' : '2d';
    let matrixArray = getMatrixValue(matrix);

    switch (matrixType){
    case '2d':
        // 2d matrices have 6 values, Last 2 values are X and Y, 2d matrices does not have Z value.
        return {x: matrixArray[4], y: matrixArray[5], z: 0};
        
    case '3d':
        // 3d matrices have 16 values, The 13th, 14th, and 15th values are X, Y, and Z
        return {x: matrixArray[12], y: matrixArray[13], z: matrixArray[14]};
    default:
        return {x: 0, y: 0, z: 0,};
    }
}






/**
 * 根據起點和終點的返回方向
 *
 * 不能用於鎖定, 因為不滑動的會有2的判定
 * @param startX
 * @param startY
 * @param endX
 * @param endY
 *
 * @return 1:向上, 2:向下, 3:向左, 4:向右, 0:未移動
 */
export function getSlideDirection(startX: number, startY: number, endX: number, endY: number): EDirection|undefined{
    const dy = startY - endY;
    const dx = endX - startX;

    // 滑動距離最小範圍
    if (Math.abs(dx) >= 2 || Math.abs(dy) >= 2) {
        const angle = getSlideAngle(dx, dy);
        // 向上
        if (angle >= 45 && angle < 135) return EDirection.vertical;

        // 向右
        if (angle >= -45 && angle < 45) return EDirection.horizontal;

        // 向下
        if (angle >= -135 && angle < -45) return EDirection.vertical;

        // 向左
        if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) return EDirection.horizontal;
    }
    return undefined;
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
 * 取得最起始的位置
 * @param isCenterMode
 * @param view
 * @param size
 */
export function getStartPosition(
    isCenterMode: boolean,
    view: {slidesPerView: number|'auto', slidesPerViewActual: number},
    size: {containerWidth: number, currItemWidth: number},
) {
    if (isCenterMode) {
        let firstStartPx = 0;
        if(view.slidesPerView === 'auto'){
            // containerWidth 計算中間位置
            firstStartPx = (size.containerWidth / 2) - (size.currItemWidth / 2) ;
        }

        return firstStartPx + (size.currItemWidth * (view.slidesPerViewActual - 1) / 2);
    }
    return 0;
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
 * 取得移動位置
 * @param slideOffsetLeft
 * @param startPosition
 */
export function getMoveDistance(slideOffsetLeft: number, startPosition: number): number{
    return -slideOffsetLeft + startPosition;
}


/**
 * 取得移動進度佔比
 * @param movePx
 * @param startPosition
 * @param slideCurrWidth
 */
export function getMovePercentage(movePx: number, startPosition: number, slideCurrWidth: number): number{
    const newMoveX = movePx - startPosition;
    return decimal2Rounding(-newMoveX / slideCurrWidth);
}


/**
 * 計算 Container 偏移位置
 * @param startPositionInContent 開始的位置 (overflow content)
 * @param movePositionInContainer 移動位置 (container)
 */
export function calcMoveTranslatePx(startPositionInContent: number, movePositionInContainer: number): number{
    return movePositionInContainer - startPositionInContent;
}

export function checkInRange(index, activeActualIndex: number, slideItemTotal: number): boolean{
    return (activeActualIndex <= 0 && index === 0) ||
        (activeActualIndex >= slideItemTotal && index === (slideItemTotal - 1)) ||
        activeActualIndex === index;
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
            {index: activeActual.actualIndex, isUseAnimation: true},
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

