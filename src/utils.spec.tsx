import '@testing-library/jest-dom';
import {
    decimal2Rounding,
    getMatrixValue,
    getSizeByRange,
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




test('get media range size', async () => {
    const range = [576, 768, 920, 1024];
    expect(getSizeByRange(320, range)).toEqual(0);
    expect(getSizeByRange(576, range)).toEqual(576);
    expect(getSizeByRange(800, range)).toEqual(768);
});




test('get next page', async () => {
    expect(getNextPage(6)).toEqual(7);
});


test('get last index', async () => {
    expect(getLastIndex(6)).toEqual(5);
});


test('get last reset index', async () => {
    expect(getLoopResetIndex(1, 5)).toEqual(6);
});
