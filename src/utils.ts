import React, {ReactNode} from 'react';

import deepCompare from './deepCompare';
import {IAcroolCarouselProps, TAcroolSlideItemDataList} from './types';

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
export function getSizeByRange(innerWidth: number = 0, breakpointSizes: number[] = []): number{
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




/**
 * Object.keys 型別增強
 * @param object
 */
export function objectKeys<T extends object>(object: T): Array<keyof T> {
    return Object.keys(object) as Array<keyof T>;
}


export function isPropsDiff(props: IAcroolCarouselProps, nextProps: IAcroolCarouselProps, exclude: string[]) {
    const filterProps = objectKeys(props)
        .filter((key) => typeof props[key] !== 'function' && !exclude.includes(key))
        .map(key => props[key]);
    const nextFilterProps = objectKeys(nextProps)
        .filter(key => typeof nextProps[key] !== 'function' && !exclude.includes(key))
        .map(key => nextProps[key]);

    return deepCompare(filterProps, nextFilterProps) === false;
}

// export function isDataKeyDff(data?: TAcroolSlideItemDataList, nextData?: TAcroolSlideItemDataList) {
//     const oldKey = data?.map((row) => row.key).join('_');
//     const nextKey = nextData?.map((row) => row.key).join('_');
//
//     return oldKey !== nextKey;
// };



export function booleanToDataAttr(isTrue: boolean, returnValue: number|string|boolean = ''): string|undefined{
    if(isTrue){
        return String(returnValue);
    }
    return undefined;
}


export function getNextIndexByPercentage(percentage: number, checkMovePercentage: number): number{
    const a = percentage % 1;
    const b = Math.floor(percentage);
    if(a >= checkMovePercentage){
        return b + 1;
    }
    return b;
}


export function getPrevIndexByPercentage(percentage: number, checkMovePercentage: number): number{
    const a = percentage % 1;
    const b = Math.floor(percentage);
    let c = b + 1;
    if(a <= (1 - checkMovePercentage)){
        c = b;
    }
    return c < 0 ? 0 : c;
}


/**
 * 檢查是否為正確的資料格式
 * @param data
 */
export function checkDataFormat(data?: ReactNode[]){
    if(data === null){
        return false;
    }
    if(typeof data === 'undefined'){
        return true;
    }
    if(!Array.isArray(data)){
        return false;
    }
    if(data.length === 0){
        return true;
    }

    return React.isValidElement(data[0]);
}
