import {getHeight, getPaddingBySize} from './utils';
import {IAspectRatio, THeightUnitSize} from '../../types';


test('get padding by ratio', async () => {
    expect(getPaddingBySize({widthRatio: 32, heightRatio: 9}, 2)).toEqual('14.06%');
    expect(getPaddingBySize({widthRatio: 32, heightRatio: 9, addStaticHeight: '100px'}, 2)).toEqual('calc(14.06% + 100px)');

});


describe('getHeight', () => {
    it('should return height CSS property when height is a string', () => {
        const height: THeightUnitSize = '100px';
        const result = getHeight(height);
        expect(result).toEqual([`height: ${height};`]);
    });

    it('should return aspect ratio and height CSS properties when height is an object with widthRatio and heightRatio', () => {
        const height: IAspectRatio = {
            widthRatio: 16,
            heightRatio: 9,
        };
        const result = getHeight(height);
        expect(result).toEqual([
            `aspect-ratio: ${height.widthRatio} / ${height.heightRatio};`,
            'height: auto;',
        ]);
    });

    it('should return undefined when height is neither a string nor an object with widthRatio and heightRatio', () => {
        const height: THeightUnitSize = undefined;
        const result = getHeight(height);
        expect(result).toBeUndefined();
    });
});
