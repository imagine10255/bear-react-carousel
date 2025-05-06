import {IAspectRatio, THeightUnitSize} from '../../types';
import {getHeight} from './utils';




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
