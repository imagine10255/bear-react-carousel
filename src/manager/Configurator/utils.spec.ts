import {getPaddingBySize} from './utils';


test('get padding by ratio', async () => {
    expect(getPaddingBySize({widthRatio: 32, heightRatio: 9}, 2)).toEqual('14.06%');
    expect(getPaddingBySize({widthRatio: 32, heightRatio: 9, addStaticHeight: '100px'}, 2)).toEqual('calc(14.06% + 100px)');

});
