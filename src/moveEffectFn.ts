import {TMoveEffectFn} from './types';

type TTransformY = (transformY?: number) => TMoveEffectFn;
type TOpacity = (treadmill?: number) => TMoveEffectFn;
type TRotate = (treadmill?: number) => TMoveEffectFn;

/**
 * 移動時異動項目的 transformY效果方法
 * @param transformY 移動單位
 */
export const transformY: TTransformY = (transformY = 50) => {
    return (percentageInfo) => {
        return {
            transform: `translate(0px, ${-transformY * (percentageInfo.calcPercentage - 1)}px)`,
        };
    };
};

/**
 * 移動時異動項目的 opacity效果方法
 * @param treadmill 倍率(ex: 1.1)
 */
export const opacity: TOpacity = (treadmill = 1) => {
    return (percentageInfo) => {
        return {
            opacity: percentageInfo.calcPercentage * treadmill,
        };
    };
};

/**
 * 移動時異動項目的 rotate效果方法
 * @param treadmill 倍率(ex: 1.1)
 */
export const rotate: TRotate = (treadmill = 1) => {
    return (percentageInfo) => {
        return {
            transform: `rotate(${360 * ((percentageInfo.percentage))}deg)`,
        };
    };
};


export default {
    transformY,
    opacity,
    rotate,
};



