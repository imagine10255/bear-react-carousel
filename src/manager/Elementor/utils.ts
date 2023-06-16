import {decimal2Rounding} from '../../utils';
import Configurator from '../Configurator';
import Stater from '../Stater';
import Elementor from './Elementor';



/**
 * 取得最起始的位置
 * @param configurator
 * @param stater
 * @param elementor
 */
export function getStartPosition(
    configurator: Configurator,
    stater: Stater,
    elementor: Elementor,
) {
    if (configurator.setting.isCenteredSlides) {
        let firstStartPx = 0;
        const currItemWidth = elementor.slideItemEls[0]?.offsetWidth ?? 0;
        if(configurator.setting.slidesPerView === 'auto'){
            // containerWidth 計算中間位置
            firstStartPx = (elementor.containerEl.offsetWidth - currItemWidth) / 2;
        }

        return firstStartPx + (currItemWidth * (configurator.setting.slidesPerViewActual - 1) / 2);
    }
    return 0;
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
 * 取得移動位置
 * @param slideOffsetLeft
 * @param startPosition
 */
export function getMoveDistance(slideOffsetLeft: number, startPosition: number): number{
    return -slideOffsetLeft + startPosition;
}


/**
 * 判斷是否在範圍內
 * @param index 目前Index
 * @param activeActualIndex 即時的Index
 * @param stater
 */
export function checkInRange(index: number, activeActualIndex: number, stater: Stater): boolean{
    // 第一筆 或 最後一筆
    if(index < stater.actual.minIndex || index > stater.actual.maxIndex){
        return false;
    }
    // 其他情況(不讓頁尾露出空白)
    if(activeActualIndex > stater.actual.moveLastIndex &&
        index === stater.actual.moveLastIndex){
        return true;
    }
    return index === activeActualIndex;
}



