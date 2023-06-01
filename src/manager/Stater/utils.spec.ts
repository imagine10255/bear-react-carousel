import {checkActualIndexInRange, getNextPageFirstIndex} from './utils';


test('get next page first index', async () => {
    expect(getNextPageFirstIndex(true, 2, 2, 1)).toEqual(4);
});
test('check actual index in range', async () => {
    expect(checkActualIndexInRange(1, {minIndex: 1, maxIndex: 5})).toEqual(true);
    expect(checkActualIndexInRange(6, {minIndex: 1, maxIndex: 5})).toEqual(false);
});
