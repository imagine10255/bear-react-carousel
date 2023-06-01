
/**
 * 取得螢幕尺寸對應設定尺寸
 * @param innerWidth
 * @param breakpointSizes
 */
export function getSizeByRange(innerWidth: number, breakpointSizes: number[]): number{
    const filterArray = breakpointSizes
        .filter(size => size <= innerWidth)
        .sort((a, b) => Number(b) - Number(a));

    if (filterArray.length > 0) return filterArray[0];
    return 0;
}
