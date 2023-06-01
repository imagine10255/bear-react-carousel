import '@testing-library/jest-dom';
import {
    decimal2Rounding,
    getPaddingBySize,
    getMatrixValue,
    getSizeByRange,
    getSlideIndex,
    checkActualIndexInRange,
    getLastIndex,
    getNextPage,
    getNextPageFirstIndex,
    getLoopResetIndex
} from '../src/utils';


test('get matrix value', async () => {
    const params = getMatrixValue('matrix(1, 0, 0, 1, 20, 30)');
    expect(params).toEqual([1, 0, 0, 1, 20, 30]);
});




test('truncate two decimal round down', async () => {
    expect(decimal2Rounding(10.454)).toEqual(10.45);
    expect(decimal2Rounding(11.469)).toEqual(11.46);

});


test('get padding by ratio', async () => {
    expect(getPaddingBySize({widthRatio: 32, heightRatio: 9}, 2)).toEqual('14.06%');
    expect(getPaddingBySize({widthRatio: 32, heightRatio: 9, addStaticHeight: '100px'}, 2)).toEqual('calc(14.06% + 100px)');

});




test('get media range size', async () => {
    const range = [576, 768, 920, 1024];
    expect(getSizeByRange(320, range)).toEqual(0);
    expect(getSizeByRange(576, range)).toEqual(576);
    expect(getSizeByRange(800, range)).toEqual(768);
});

test('get slide index', async () => {
    expect(getSlideIndex(1, 1, 1)).toEqual(1);
    expect(getSlideIndex(2, 1, 1)).toEqual(2);
    expect(getSlideIndex(2, 2, 1)).toEqual(3);
});


test('get next page first index', async () => {
    expect(getNextPageFirstIndex(true, 2, 2, 1)).toEqual(4);
});


test('get next page', async () => {
    expect(getNextPage(6)).toEqual(7);
});


test('get last index', async () => {
    expect(getLastIndex(6)).toEqual(5);
});


test('check actual index in range', async () => {
    expect(checkActualIndexInRange(1, {minIndex: 1, maxIndex: 5})).toEqual(true);
    expect(checkActualIndexInRange(6, {minIndex: 1, maxIndex: 5})).toEqual(false);
});


test('get last reset index', async () => {
    expect(getLoopResetIndex(1, 5)).toEqual(6);
});



test('test onMove activeIndex', async () => {


    // 觸發移動

    // 確認 active 標籤位置

});
