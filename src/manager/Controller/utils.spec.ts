import calculateOrder, {getSlideIndex, sortDataArray} from './utils';

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
        const total = 5;
        const selected = 2;

        const result = calculateOrder(total, selected);

        expect(result.get(0)).toBe(2);
        expect(result.get(1)).toBe(3);
        expect(result.get(2)).toBe(4);
        expect(result.get(3)).toBe(0);
        expect(result.get(4)).toBe(1);
    });
});
