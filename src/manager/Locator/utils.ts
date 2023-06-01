import {EDirection} from './types';
import {getMatrixValue} from '../../utils';


/**
 * 計算 返回角度
 * @param dx
 * @param dy
 */
export function getSlideAngle(dx: number, dy: number): number {
    return Math.atan2(dy, dx) * 180 / Math.PI;
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
 * 取得 transform x 移動參數
 * @param el
 */
export function getTranslateParams(el: HTMLElement): {x: number, y: number, z: number}{
    const style = window.getComputedStyle(el);
    const matrix = style.transform;

    const matrixType = matrix.includes('3d') ? '3d' : '2d';
    let matrixArray = getMatrixValue(matrix);


    switch (matrixType){
    case '2d':
        // 2d matrices have 6 values, Last 2 values are X and Y, 2d matrices does not have Z value.
        return {x: matrixArray[4] ?? 0, y: matrixArray[5] ?? 0, z: 0};

    case '3d':
        // 3d matrices have 16 values, The 13th, 14th, and 15th values are X, Y, and Z
        return {x: matrixArray[12] ?? 0, y: matrixArray[13] ?? 0, z: matrixArray[14]};
    default:
        return {x: 0, y: 0, z: 0,};
    }
}
