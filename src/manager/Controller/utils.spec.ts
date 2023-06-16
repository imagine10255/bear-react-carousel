import {getSlideIndex} from './utils';

test('get slide index', async () => {
    expect(getSlideIndex(1, 1)).toEqual(0);
    expect(getSlideIndex(2, 1)).toEqual(1);
    expect(getSlideIndex(2, 2)).toEqual(2);
});
