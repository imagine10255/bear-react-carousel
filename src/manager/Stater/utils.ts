import {TBearSlideItemDataList, TSlidesPerView} from '../../types';
import {InitData} from './types';
import Stater from './Stater';

/**
 * 初始化資料
 * @param sourceList
 * @param slidesPerView
 * @param slidesPerGroup
 * @param isLoop
 */
export function initDataList(sourceList: TBearSlideItemDataList = [], slidesPerView: TSlidesPerView = 1, slidesPerGroup = 1, isLoop= false): InitData[] {
    const formatList = [];
    const isClone = isLoop;
    let index = 0;
    const cloneRatio = 1.5;
    const formatSlidesPerView = slidesPerView === 'auto' ? 0: Math.ceil(slidesPerView);
    const cloneCount = slidesPerView === 'auto' ? 0: Math.ceil(slidesPerView * cloneRatio);
    const totalItem = sourceList.length;
    const lastPage = (totalItem / slidesPerGroup) - (slidesPerGroup - formatSlidesPerView);

    if (isClone) {
        // 複製最後面, 放在最前面
        const cloneStart = (sourceList.length - cloneCount);
        for (const [cloneIndex, element] of sourceList.slice(-cloneCount).entries()) {
            formatList[index] = {
                key: `clone_before_${cloneIndex}`,
                virtualIndex: index,
                matchIndex: cloneCount + cloneStart + index,
                sourceIndex: cloneStart + cloneIndex,
                inPage: lastPage,
                inPageIndex: index % slidesPerGroup,
                isClone: true,
                element,
            };
            index += 1;
        }
    }

    let matchFirstIndex = index;
    let pageFirstIndex = 0;

    for (const [sourceIndex, element] of sourceList.entries()) {
        const inPage = Math.ceil((pageFirstIndex + 1) / slidesPerGroup);
        const isLastOver = (sourceIndex + 1) + slidesPerGroup > totalItem;
        const checkInPage = isLastOver ? Math.ceil(lastPage): inPage;
        const inPageIndex = isLastOver ? (index + 1) % slidesPerGroup: index % slidesPerGroup;
        formatList[index] = {
            key: `source_${sourceIndex}`,
            virtualIndex: index,
            matchIndex: index,
            sourceIndex: sourceIndex,
            inPage: checkInPage,
            inPageIndex: inPageIndex,
            isClone: false,
            element,
        };
        index += 1;
        pageFirstIndex += 1;
    }

    if (isClone) {
        // 複製前面的(需顯示總數) 放在最後面

        for (const [cloneIndex, element] of sourceList.slice(0, cloneCount).entries()) {
            formatList[index] = {
                key: `clone_after_${cloneIndex}`,
                virtualIndex: index,
                matchIndex: matchFirstIndex,
                sourceIndex: cloneIndex,
                inPage: 1,
                inPageIndex: index / slidesPerGroup,
                isClone: true,
                element,
            };
            index += 1;
            matchFirstIndex += 1;
        }
    }
    return formatList;
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
 * 取得上一頁的 Index
 * @param isCenterMode
 * @param activeActualIndex
 * @param slidesPerGroup
 * @param slidesPerViewActual
 */
export function getPrevPageFirstIndex(isCenterMode: boolean, activeActualIndex: number, slidesPerGroup: number, slidesPerViewActual: number){

    if (isCenterMode) {
        const resIndex = activeActualIndex - slidesPerGroup;
        return resIndex < 0 ? 0: resIndex;
    }
    // Avoid trailing whitespace
    const resIndex = activeActualIndex - slidesPerViewActual;
    return resIndex < 0 ? 0: resIndex;

}



/**
 * 取得範圍內 Index
 * @param slideIndex
 * @param stater
 */
export function getInRangeIndex(slideIndex: number, stater: Stater): number {

    if(slideIndex >= stater.virtual.lastIndex){
        // 其他情況(不讓頁尾露出空白)
        return stater.virtual.lastIndex;
    }

    if(slideIndex <= 0){
        return 0;
    }

    return slideIndex;
}


/**
 * 檢查是否斜角移動
 * @param start
 * @param end
 */
export function checkLetItGo(start: {x: number, y: number}, end: {x: number, y: number}){
    const y = Math.abs(start.y - end.y);
    const x = Math.abs(start.x - end.x);
    return y < x;
}
