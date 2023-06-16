import Stater from '../Stater';
import Configurator from '../Configurator';
import Elementor from '../Elementor';

/**
 * 取得目標Index 使用 Page 計算
 * @param page
 * @param slidesPerGroup
 */
export function getSlideIndex(page: number, slidesPerGroup: number): number {
    return (page - 1) * slidesPerGroup;
    // return ((page - 1) * slidesPerGroup) + 1 + (actualFirstIndex - 1);
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
    const activeActual = stater.formatElement[stater.virtual.activeIndex];
    const {setting} = configurator;

    if(activeActual){
        if(setting.isEnableLoop){
            if(activeActual.isClone) {
                // 禁止動畫播放中進行重置
                if (elementor.isAnimation) {
                    return [];
                }

                // 當移動到的位置 已經是 clone item
                return [
                    {index: activeActual.matchIndex, isUseAnimation: false},
                    {index: activeActual.matchIndex - 1, isUseAnimation: true},
                ];
            }

            if(stater.residue > 0) {
                // 若為Loop(最後一頁移動在不整除的時候, 移動位置需要復歸到第一個)
                return [
                    {index: activeActual.virtualIndex - stater.residue, isUseAnimation: true},
                ];
            }
            return [
                {index: activeActual.virtualIndex - setting.slidesPerGroup, isUseAnimation: true},
            ];
        }


        if (stater.virtual.activeIndex > 0) {
            // 若在範圍內，正常移動到上一頁
            return [
                {index: activeActual.virtualIndex - setting.slidesPerGroup, isUseAnimation: true}
            ];
        }
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

    const activeActual = stater.formatElement[stater.virtual.activeIndex];
    const {setting} = configurator;


    if(activeActual){
        if(setting.isEnableLoop) {
            if (activeActual?.isClone) {
                // 禁止動畫播放中進行重置
                if (elementor.isAnimation) {
                    return [];
                }
                // 當移動到的位置 已經是 clone item
                // 要等到動畫結束才可執行，否則會造成畫面閃動
                return [
                    {index: activeActual.matchIndex, isUseAnimation: false},
                    {index: activeActual.matchIndex + setting.slidesPerGroup, isUseAnimation: true},
                ];
            }

            if (stater.residue > 0) {
                // 若為Loop(最後一頁移動在不整除的時候, 移動位置需要復歸到第一個)
                return [
                    {index: activeActual.virtualIndex + stater.residue, isUseAnimation: true},
                ];
            }
            return [
                {index: activeActual.virtualIndex + setting.slidesPerGroup, isUseAnimation: true},
            ];
        }

        if (stater.virtual.activeIndex <= stater.virtual.lastIndex) {
            // 若在範圍內，正常移動到下一頁
            return [
                {index: activeActual.virtualIndex + setting.slidesPerGroup, isUseAnimation: true}
            ];

        }
    }



    return [];
}
