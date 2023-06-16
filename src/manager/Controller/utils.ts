import Stater from '../Stater';
import Configurator from '../Configurator';
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
 * @param elementor
 * @param stater
 * @param configurator
 */
export function getPrevIndex(
    elementor: Elementor,
    stater: Stater,
    configurator: Configurator,
): Array<{index: number, isUseAnimation: boolean}> {
    const activeActual = stater.formatElement[stater.actual.activeIndex];
    const {setting} = configurator;

    if(activeActual.isClone){
        // 禁止動畫播放中進行重置
        if(elementor.isAnimation){
            return [];
        }

        // 當移動到的位置 已經是 clone item
        return [
            {index: activeActual.matchIndex, isUseAnimation: false},
            {index: activeActual.matchIndex - 1, isUseAnimation: true},
        ];

    }else if (setting.isEnableLoop && stater.page.activePage === 1 && stater.residue > 0) {
        // 若為Loop(最後一頁移動在不整除的時候, 移動位置需要復歸到第一個)
        return [
            {index: activeActual.actualIndex - stater.residue, isUseAnimation: true},
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
 * @param elementor
 * @param stater
 * @param configurator
 */
export function getNextIndex(
    elementor: Elementor,
    stater: Stater,
    configurator: Configurator
): Array<{index: number, isUseAnimation: boolean}> {

    const activeActual = stater.formatElement[stater.actual.activeIndex];
    const {setting} = configurator;

    const isOverflowPage = stater.nextPage > stater.page.pageTotal;
    const isOverflowIndex = stater.nextPageFirstIndex > stater.element.lastIndex;

    if(activeActual?.isClone) {
        // 禁止動畫播放中進行重置
        if(elementor.isAnimation){
            return [];
        }
        // 當移動到的位置 已經是 clone item
        // 要等到動畫結束才可執行，否則會造成畫面閃動
        return [
            {index: activeActual.matchIndex, isUseAnimation: false},
            {index: activeActual.matchIndex + setting.slidesPerGroup, isUseAnimation: true},
        ];

    }else if (setting.isEnableLoop && isOverflowPage && stater.residue > 0) {

        // 若為Loop(最後一頁移動在不整除的時候, 移動位置需要復歸到第一個)
        return [
            {index: activeActual.actualIndex + stater.residue, isUseAnimation: true},
        ];

    }else if (stater.actual.activeIndex <= stater.actual.maxIndex && isOverflowIndex === false) {

        // 若在範圍內，正常移動到下一頁
        return [
            {index: activeActual.actualIndex + setting.slidesPerGroup, isUseAnimation: true}
        ];

    }else if(!isOverflowPage){
        return [
            {index: activeActual.actualIndex + setting.slidesPerGroup, isUseAnimation: true}
        ];

    }else if(setting.isCenteredSlides && stater.page.activePage < stater.page.pageTotal){
        return [
            {index: activeActual.actualIndex + setting.slidesPerGroup, isUseAnimation: true}
        ];
    }

    return [];
}
