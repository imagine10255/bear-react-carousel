import calculateOrder, {calculatePrevIndex, getSlideIndex, sortDataArray} from './utils';

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
    it('should correctly calculate the order of each item', () => {
        const total = 4;

        const result0 = calculateOrder(total, 0);
        expect(result0.get(0)).toBe(2);
        expect(result0.get(1)).toBe(3);
        expect(result0.get(2)).toBe(0);
        expect(result0.get(3)).toBe(1);

        const result1 = calculateOrder(total, 1);
        expect(result1.get(0)).toBe(1);
        expect(result1.get(1)).toBe(2);
        expect(result1.get(2)).toBe(3);
        expect(result1.get(3)).toBe(0);

        const result2 = calculateOrder(total, 2);
        expect(result2.get(0)).toBe(0);
        expect(result2.get(1)).toBe(1);
        expect(result2.get(2)).toBe(2);
        expect(result2.get(3)).toBe(3);

        const result3 = calculateOrder(total, 3);
        expect(result3.get(0)).toBe(3);
        expect(result3.get(1)).toBe(0);
        expect(result3.get(2)).toBe(1);
        expect(result3.get(3)).toBe(2);
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
