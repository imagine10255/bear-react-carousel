import calculateOrder, {
    calcSelectCurrIndex,
    calculatePrevIndex,
    getPositiveModulo,
    getSlideIndex,
    sortDataArray
} from './utils';

test('get slide index', async () => {
    expect(getSlideIndex(1, 1, 1)).toEqual(1);
    expect(getSlideIndex(2, 1, 1)).toEqual(2);
    expect(getSlideIndex(2, 2, 1)).toEqual(3);
});



describe('sortDataArray function', () => {
    it('should correctly sort the dataArray based on the selected index', () => {
        const dataArray = [
            {actualIndex: 0},
            {actualIndex: 1},
            {actualIndex: 2},
            {actualIndex: 3},
            {actualIndex: 4},
        ];

        // @ts-ignore
        const result = sortDataArray(2, dataArray);

        expect(result).toEqual([
            {actualIndex: 2},
            {actualIndex: 3},
            {actualIndex: 4},
            {actualIndex: 0},
            {actualIndex: 1},
        ]);
    });
});


describe('calculateOrder function', () => {


    it('should getPositiveModulo', () => {
        expect(2).toBe(getPositiveModulo(-2,  4)); // 1
        expect(3).toBe(getPositiveModulo(-1,  4)); // 1
        expect(0).toBe(getPositiveModulo(0,  4)); // 1
        expect(1).toBe(getPositiveModulo(1,  4)); // 1
        expect(2).toBe(getPositiveModulo(2,  4)); // 1
        expect(3).toBe(getPositiveModulo(3,  4)); // 1
    });

    it('should calc', () => {
        const total = 4;
        const selectIndexOrder = total -1;

        // // [1] 0=>2, 1=>3, 2=>0, 3=>1
        // expect(2).toBe(calcSelectCurrIndex(0, 1, total, 0, selectIndexOrder));
        // expect(3).toBe(calcSelectCurrIndex(1, 1, total, 0, selectIndexOrder));
        //
        // // [1] 0=>1, 1=>2, 2=>3, 3=>0 偏移1
        // expect(2).toBe(calcSelectCurrIndex(1, 1, total, 1, selectIndexOrder));

        //=== [1] 0=>0, 1=>1, 2=>2, 3=>3 偏移2
        expect(1).toBe(calcSelectCurrIndex(0, 0, total, 2, selectIndexOrder));

        // [2] 0=>1, 1=>2, 2=>3, 3=>0
        // expect(1).toBe(calcSelectCurrIndex(0, 2, total,0, selectIndexOrder));
        // expect(2).toBe(calcSelectCurrIndex(1, 2, total, 0, selectIndexOrder));


    });

    // 向左的時候只需要預留1, 不用預留到 group項目 (假設 group = 1 )
    it('should calc left', () => {
        const total = 4;
        const selectIndexOrder = 0;

        // [1] 0=>0, 1=>1, 2=>2, 3=>3
        expect(0).toBe(calcSelectCurrIndex(0, 0, total, 0, selectIndexOrder));
        expect(1).toBe(calcSelectCurrIndex(1, 0, total, 0, selectIndexOrder));

        // [1] 0=>3, 1=>0, 2=>1, 3=>2
        expect(0).toBe(calcSelectCurrIndex(0, 0, total, 0, selectIndexOrder));
        expect(1).toBe(calcSelectCurrIndex(1, 0, total, 0, selectIndexOrder));
        expect(1).toBe(calcSelectCurrIndex(0, 0, total, - 1, selectIndexOrder));
    });

    it('should calc right nav', () => {
        const total = 6;
        const selectIndexOrder = total - 1;

        // 往右邊
        expect(calculateOrder(total, 0, 0, selectIndexOrder)).toEqual(new Map([
            [0, 5],
            [1, 0],
            [2, 1],
            [3, 2],
            [4, 3],
            [5, 4],
        ]));

        // console.log('sync', `total: ${total}, activeActualIndex: ${0}, offset: ${2}, selectIndexOrder: ${selectIndexOrder}`);

        expect(calculateOrder(total, 0, 2, selectIndexOrder)).toEqual(new Map([
            [0, 3],
            [1, 4],
            [2, 5],
            [3, 0],
            [4, 1],
            [5, 2],
        ]));

        expect(calculateOrder(total, 0, 3, selectIndexOrder)).toEqual(new Map([
            [0, 2],
            [1, 3],
            [2, 4],
            [3, 5],
            [4, 0],
            [5, 1],
        ]));

    });

    //
    it('should calc left nav', () => {
        const total = 5;
        const selectIndexOrder = total -1;


        // 往左邊
        expect(calculateOrder(total, 0, 0, 0)).toEqual(new Map([
            [0, 0],
            [1, 1],
            [2, 2],
            [3, 3],
            [4, 4],
        ]));

        expect(calculateOrder(total, 0, -3, 0)).toEqual(new Map([
            [0, 3],
            [1, 4],
            [2, 0],
            [3, 1],
            [4, 2],
        ]));

    });

});


describe('calculatePrevIndex function', () => {
    it('should correctly calculate the previous index', () => {
        const total = 3;

        expect(calculatePrevIndex(total, -1)).toBe(2);
        expect(calculatePrevIndex(total, -2)).toBe(1);
        expect(calculatePrevIndex(total, -3)).toBe(0);
        expect(calculatePrevIndex(total, -4)).toBe(2);
        expect(calculatePrevIndex(total, -5)).toBe(1);
    });
});
