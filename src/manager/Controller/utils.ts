
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
