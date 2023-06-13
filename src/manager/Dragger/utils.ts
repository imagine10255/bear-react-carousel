
/**
 * 計算 Container 偏移位置
 * @param startPositionInContent 開始的位置 (overflow content)
 * @param movePositionInContainer 移動位置 (container)
 */
export function calcMoveTranslatePx(startPositionInContent: number, movePositionInContainer: number): number{
    return movePositionInContainer - startPositionInContent;
}



export function throttle(fn, delay) {
    let previousTime = 0;

    return function(...args) {
        const nowTime = new Date().getTime();

        if (nowTime - previousTime > delay) {
            // @ts-ignore
            fn.apply(this, args);
            previousTime = nowTime;
        }
    }
}
