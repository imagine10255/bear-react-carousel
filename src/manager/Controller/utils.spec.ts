import {getSlideIndex} from './utils';

test('get slide index', async () => {
    expect(getSlideIndex(1, 1, 1)).toEqual(1);
    expect(getSlideIndex(2, 1, 1)).toEqual(2);
    expect(getSlideIndex(2, 2, 1)).toEqual(3);
});
