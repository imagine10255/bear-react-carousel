import {decimal2Rounding} from '../../utils';

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
    // if (isCenterMode) {
    //     let firstStartPx = 0;
    //     if(view.slidesPerView === 'auto'){
    //         // containerWidth 計算中間位置
    //         firstStartPx = (size.containerWidth / 2) - (size.currItemWidth / 2) ;
    //     }
    //
    //     return firstStartPx + (size.currItemWidth * (view.slidesPerViewActual - 1) / 2);
    // }
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







export function checkInRange(index, activeActualIndex: number, slideItemTotal: number): boolean{
    return (activeActualIndex <= 0 && index === 0) ||
        (activeActualIndex >= slideItemTotal && index === (slideItemTotal - 1)) ||
        activeActualIndex === index;
}






