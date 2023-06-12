import {InitData} from '../Stater/types';
import Stater from '../Stater';
import Configurator from '../Configurator';
import Controller from './Controller';
import elementor from '../Elementor';
import Elementor from '../Elementor';

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
 * 取得上一個 Index
 * @param stater
 * @param configurator
 * @param controller
 * @param elementor
 */
export function getPrevIndex2(
    stater: Stater,
    configurator: Configurator,
    controller: Controller,
    elementor: Elementor,
): Array<() => void> {
    const {setting} = configurator;
    const {page, actual} = stater;


    if (setting.isEnableLoop){
        const actualSlidesPerGroup = -configurator.setting.slidesPerGroup;

        return [
            // {index: isLast - 1, isUseAnimation: false, order: true},
            // {index: 0, isUseAnimation: true, order: true},

            // 先 set order, 然後在移動到重置點，
            // {index: page.moveCount % page.pageTotal, isUseAnimation: true, order: true},
            () => {
                // 跟next 不一樣，因為 index 是在最左邊顯示
                elementor.syncOrder(stater.actual.activeIndex, 0, actualSlidesPerGroup);
                controller.slideToActualIndex(stater.actual.activeIndex, {isUseAnimation: false});
            },
            () => {
                // 找到上一個
                const currActive = stater.formatElement.find(row => row.actualIndex === stater.actual.activeIndex);
                const nextIndex = (currActive.order - configurator.setting.slidesPerGroup) % stater.formatElement.length;
                const next = stater.formatElement.find(row => row.order === nextIndex);
                controller.slideToActualIndex(next.actualIndex, {isUseAnimation: true});
            },
        ];

    }else {

        const currEl = stater.formatElement.find(row => row.actualIndex === stater.actual.activeIndex);
        const prevOrder = currEl.order - 1;
        const nextEl = stater.formatElement.find(row => row.order === prevOrder);


        console.log('ddd');
        // 若為Loop(最後一頁移動在不整除的時候, 移動位置需要復歸到第一個)
        return [
            () => controller.slideToActualIndex(nextEl.actualIndex, {isUseAnimation: true}),
        ];
    }


    return [];
}


/**
 * 取得接下來怎麼做
 * @param stater
 * @param configurator
 * @param controller
 * @param elementor
 */
export function getNextIndex2(
    stater: Stater,
    configurator: Configurator,
    controller: Controller,
    elementor: Elementor,
): Array<() => void> {

    const {setting} = configurator;

    // 如果是 auto 模式，則使用寬度自己算
    const testLoop = true;
    const oneSlide = elementor.containerEl.offsetWidth / elementor.slideItemEls[0].offsetWidth;
    const slidesPerViewActual = configurator.setting.slidesPerView === 'auto' ? oneSlide: configurator.setting.slidesPerViewActual;

    if (configurator.setting.isEnableLoop){
        const actualSlidesPerGroup = getActualSlidePerGroup(stater, configurator);

        return [
            () => {
                const rightAdditionalDisplay = slidesPerViewActual - 1; //額外顯示的部分，1是只選取一個
                elementor.syncOrder(stater.actual.activeIndex, stater.actual.maxIndex, actualSlidesPerGroup + rightAdditionalDisplay);
                controller.slideToActualIndex(stater.actual.activeIndex, {isUseAnimation: false});
            },
            () => {
                // 找到下一個
                const currActive = stater.formatElement.find(row => row.actualIndex === stater.actual.activeIndex);
                const nextIndex = (currActive.order + actualSlidesPerGroup) % stater.formatElement.length;
                const next = stater.formatElement.find(row => row.order === nextIndex);
                controller.slideToActualIndex(next.actualIndex, {isUseAnimation: true});
            },
        ];

    }else {

        const currEl = stater.formatElement.find(row => row.actualIndex === stater.actual.activeIndex);
        const nextOrder = currEl.order + 1;
        const nextEl = stater.formatElement.find(row => row.order === nextOrder);


        console.log('ddd');
        // 若為Loop(最後一頁移動在不整除的時候, 移動位置需要復歸到第一個)
        return [
            () => controller.slideToActualIndex(nextEl.actualIndex, {isUseAnimation: true}),
        ];
    }


    return [];
}


/**
 * 循環計數
 * @param value 從0開始的index
 * @param total 總數
 */
export const getPositiveModulo = (value: number, total: number): number => {
    const result = value % total;
    return result < 0 ? result + total : result;
};


/**
 * 取得指定index 的 order
 * @param currIndex 指定的 index
 * @param selectIndex 開始的index(預設從最後一個開始)
 * @param total 總數
 * @param offset 預留顯示的偏移量
 * @param selectIndexOrder 開始的index 的 order
 */
export const calcSelectCurrIndex = (currIndex: number, selectIndex: number, total: number, offset = 0, selectIndexOrder = 0) => {

    // 與起始點差異
    const afterStartDiff = currIndex - selectIndex;

    // 從最後一個位置開始
    // const lastIndex = total - 1; // 最大index
    const afterLast = afterStartDiff + selectIndexOrder;

    // 預留顯示 偏移量
    const afterReservedOffset = afterLast - offset;
    return getPositiveModulo(afterReservedOffset, total);
};


/**
 *
 * @param total
 * @param selected
 * @param offset 預留位置(向左預留為-, 向右預留為+), 可用 slidePreView 當作預留量
 * @param selectIndexOrder
 */
export default function calculateOrder(total: number, selected: number, offset, selectIndexOrder): Map<number, number> {
    const orderMap = new Map<number, number>();
    for(let i = 0; i < total; i++){
        const res = calcSelectCurrIndex(i, selected, total, offset, selectIndexOrder);
        orderMap.set(i, Math.trunc(res));
    }
    return orderMap;
}

export function sortDataArray(selected: number, dataArray: InitData[]): InitData[] {
    const total = dataArray.length;
    const sortedDataArray: InitData[] = new Array(total);

    for (const data of dataArray) {
        let order = data.actualIndex - selected;
        if (order < 0) {
            order += total;
        }
        sortedDataArray[order] = data;
    }

    return sortedDataArray;
}



export function calculatePrevIndex(total: number, prev: number): number {
    return ((prev % total) + total) % total;
}


/**
 * 取得修正的真實 SlidePerGroup
 * @param stater
 * @param configurator
 */
function getActualSlidePerGroup(stater: Stater, configurator: Configurator) {
    const totalSlides = stater.formatElement.length;
    const slidesPerGroup = configurator.setting.slidesPerGroup;
    const numCompleteGroups = Math.floor(totalSlides / slidesPerGroup);
    const numRemainingSlides = totalSlides % slidesPerGroup;

    const actualSlidesPerGroup = numCompleteGroups >= 2 ? slidesPerGroup : numRemainingSlides;
    return actualSlidesPerGroup;
}
