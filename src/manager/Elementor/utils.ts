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
        const currItemWidth = (elementor.slideItemEls && elementor.slideItemEls[0]?.offsetWidth) ?? 0;
        if(elementor.containerEl && configurator.setting.slidesPerView === 'auto' ){
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
 * @param elOffsetLeft
 * @param elOffsetWidth
 */
export function getMovePercentage(movePx: number, elOffsetLeft: number, elOffsetWidth: number): number{
    const newMoveX = movePx - elOffsetLeft;
    return decimal2Rounding(newMoveX / elOffsetWidth);
}

/**
 * 從進度取得第幾個項目
 * @param percentage
 */
export function getIndexByPercentage(percentage: number): number{
    return Math.floor(percentage);
}



/**
 * 取得移動位置
 * @param slideOffsetLeft
 * @param startPosition
 */
export function getMoveDistance(slideOffsetLeft: number, startPosition: number): number{
    return -slideOffsetLeft + startPosition;
}


