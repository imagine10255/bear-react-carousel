import {getNextPageFirstIndex} from './utils';


test('get next page first index', async () => {
    expect(getNextPageFirstIndex(true, 2, 2, 1)).toEqual(4);
});



