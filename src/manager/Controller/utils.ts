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

    // if(activeActual.isClone){
    // 當移動到的位置 已經是 clone item
    // return [
    //     {index: activeActual.matchIndex, isUseAnimation: false},
    //     {index: activeActual.matchIndex - 1, isUseAnimation: true},
    // ];

    stater.setPrevPage();

    // const el = elementor.getTargetEl(actual.activeIndex);
    const el = elementor.slideItemEls.find(row => Number(row.dataset.actual) ===  actual.activeIndex);
    const isFake = Number(el.dataset.order) === 0;


    console.log('page.moveCount',page.moveCount, isFake);
    if (setting.isEnableLoop && isFake) {
        // 若為Loop(最後一頁移動在不整除的時候, 移動位置需要復歸到第一個)
        console.log('調換順序',stater.element.total);
        return [
            () => {
                elementor.syncOrder(stater.actual.activeIndex);
                controller.slideToActualIndex(stater.actual.activeIndex, {isUseAnimation: false});
            },
            () => {
                // console.log('(stater.actual.activeIndex - 1) % stater.element.total',stater.actual.activeIndex, stater.element.total, (stater.actual.activeIndex - 1) % stater.element.total);
                // controller.slideToActualIndex(calculatePrevIndex(page.pageTotal, page.moveCount), {isUseAnimation: true});
                const maxOrder = 0;
                // const targetPrevIndex = actual.activeIndex === 0 ? stater.actual.maxIndex: actual.activeIndex;
                // console.log('actual.activeIndex',targetPrevIndex);
                const target = elementor.getTargetEl(maxOrder);

                controller.slideToActualIndex(Number(target.dataset.actual), {isUseAnimation: true});
            },
            // {index: activeActual.actualIndex - info.residue, isUseAnimation: true},
        ];

    }else {
        const currEl = elementor.slideItemEls.find(row => Number(row.dataset.actual) === stater.actual.activeIndex);
        const prevOrder = Number(currEl.dataset.order) - 1;
        const prevEl = elementor.slideItemEls.find(row => Number(row.dataset.order) === prevOrder);

        console.log('正常往左');
        // 若在範圍內，正常移動到下一頁

        return [
            () => controller.slideToActualIndex(Number(prevEl.dataset.actual), {isUseAnimation: true}),
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
    const {page, actual} = stater;
    // if(activeActual.isClone) {
    //     // 當移動到的位置 已經是 clone item
    //     // 要等到動畫結束才可執行，否則會造成畫面閃動
    //     return [
    //         {index: activeActual.matchIndex, isUseAnimation: false},
    //         {index: activeActual.matchIndex + setting.slidesPerGroup, isUseAnimation: true},
    //     ];
    stater.setNextPage();

    const el = elementor.slideItemEls.find(row => Number(row.dataset.actual) ===  actual.activeIndex);
    const maxOrder = stater.actual.maxIndex;

    const isFake = Number(el.dataset.order) === maxOrder;

    // const el = elementor.getTargetEl(actual.activeIndex);
    // const isFake = Number(el.dataset.order) === stater.actual.maxIndex;

    console.log('page.moveCount',page.moveCount);
    if (setting.isEnableLoop && isFake){
        console.log('stater.page.activePage',stater.actual.activeIndex, stater.page.activePage);
        return [
            // {index: isLast - 1, isUseAnimation: false, order: true},
            // {index: 0, isUseAnimation: true, order: true},

            // 先 set order, 然後在移動到重置點，
            // {index: page.moveCount % page.pageTotal, isUseAnimation: true, order: true},
            () => {
                elementor.syncOrder(stater.actual.activeIndex);
                controller.slideToActualIndex(stater.actual.activeIndex, {isUseAnimation: false});
            },
            () => {
                const target = elementor.getTargetEl(maxOrder);

                controller.slideToActualIndex(Number(target.dataset.actual), {isUseAnimation: true});
                // controller.slideToActualIndex(calculatePrevIndex(page.pageTotal, page.moveCount), {isUseAnimation: true});
            },
        ];

    }else {

        const currEl = elementor.slideItemEls.find(row => Number(row.dataset.actual) === stater.actual.activeIndex);
        const nextOrder = Number(currEl.dataset.order) + 1;
        const nextEl = elementor.slideItemEls.find(row => Number(row.dataset.order) === nextOrder);


        console.log('ddd');
        // 若為Loop(最後一頁移動在不整除的時候, 移動位置需要復歸到第一個)
        return [
            () => controller.slideToActualIndex(Number(nextEl.dataset.actual), {isUseAnimation: true}),
        ];
    }


    return [];
}

export default function calculateOrder(total: number, selected: number): Map<number, number> {
    const orderMap = new Map<number, number>();

    const selectOrder = total - 1 -1;
    // 取得 0 的起始順序,
    const startOrder = selectOrder - selected;
    for(let i = 0; i < total; i++){
        let res = (startOrder + i) % total;
        if(res < 0){
            res = total + res;
        }
        orderMap.set(i, res);
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
