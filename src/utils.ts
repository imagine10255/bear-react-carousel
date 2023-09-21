import {IBearCarouselProps, TBearSlideItemDataList} from './types';
import deepCompare from './deepCompare';

/**
 * 判斷是否為手機裝置
 */
export function checkIsMobile(): boolean {
    try { document.createEvent('TouchEvent'); return true; } catch (e) { return false; }
}
/**
 * 判斷是否為桌面裝置
 */
export function checkIsDesktop(): boolean {
    try { document.createEvent('MouseEvent'); return true; } catch (e) { return false; }
}

/**
 * 轉數字
 * ex: 1234 -> 1234
 *
 * @param value
 * @param defaultValue
 */
export function anyToNumber(value: any, defaultValue = 0): number {
    const numberValue = Number(value);
    if(!isNaN(numberValue)){
        return numberValue;
    }

    return defaultValue;
}


/**
 * 取得螢幕尺寸對應設定尺寸
 * @param innerWidth
 * @param breakpointSizes
 */
export function getSizeByRange(innerWidth: number = 0, breakpointSizes: number[]): number{
    const filterArray = breakpointSizes
        .filter(size => size <= innerWidth)
        .sort((a, b) => Number(b) - Number(a));

    if (filterArray.length > 0) return filterArray[0];
    return 0;
}





/**
 * 取得 Matrix value
 * @param matrix
 */
export function getMatrixValue(matrix: string): number[] {
    const matrixValues = matrix.match(/matrix.*\((.+?)\)/);
    if(matrixValues === null) return [];
    return matrixValues[1]?.split(', ').map(Number);

}








/**
 * 保留小數點兩位並四捨五入
 * @param num
 */
export function decimal2Rounding(num: number): number {
    return Math.floor(num * 100) / 100;
}





/**
 * 取得下一頁的 Page
 * @param activePage
 */
export function getNextPage(activePage: number){
    return activePage + 1;
}

export function getLastIndex(elementTotal: number){
    return elementTotal - 1;
}


/**
 * 取得Loop模式下移動重設
 * @param slideIndex
 * @param range
 */
export function getLoopResetIndex(activeActualIndex: number, residue: number): number {
    return activeActualIndex + residue;
}



type ObjectKeys<T> = Array<keyof T>;

export function getObjectKeys<T>(props: T): ObjectKeys<T> {
    return Object.keys(props) as ObjectKeys<T>;
}

export function isPropsDiff(props: IBearCarouselProps, nextProps: IBearCarouselProps, exclude: string[]) {
    const filterProps = getObjectKeys(props)
        .filter((key) => typeof props[key] !== 'function' && !exclude.includes(key))
        .map(key => props[key]);
    const nextFilterProps = getObjectKeys(nextProps)
        .filter(key => typeof nextProps[key] !== 'function' && !exclude.includes(key))
        .map(key => nextProps[key]);

    return deepCompare(filterProps, nextFilterProps) === false;
}

export function isDataKeyDff(data: TBearSlideItemDataList, nextData: TBearSlideItemDataList) {
    const oldKey = data?.map((row) => row.key).join('_');
    const nextKey = nextData?.map((row) => row.key).join('_');

    return oldKey !== nextKey;
};



export function booleanToDataAttr(isTrue: boolean, returnValue: number|string|boolean = ''): string|undefined{
    if(isTrue){
        return String(returnValue);
    }
    return undefined;
}



