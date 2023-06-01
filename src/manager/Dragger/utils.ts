
/**
 * 計算 Container 偏移位置
 * @param startPositionInContent 開始的位置 (overflow content)
 * @param movePositionInContainer 移動位置 (container)
 */
export function calcMoveTranslatePx(startPositionInContent: number, movePositionInContainer: number): number{
    return movePositionInContainer - startPositionInContent;
}
