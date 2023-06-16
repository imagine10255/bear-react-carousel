import {checkInRange, getMoveDistance, getStartPosition} from './utils';


describe('getStartPosition function', () => {
    let mockConfigurator;
    let mockStater;
    let mockElementor;

    beforeEach(() => {
        // 模擬依賴對象
        mockConfigurator = {
            setting: {
                isCenteredSlides: false,
                slidesPerView: 'auto',
                slidesPerViewActual: 1,
            },
        };

        mockStater = {}; // 如果你的函數中未使用到 Stater，可以不提供模擬對象。

        mockElementor = {
            slideItemEls: [{offsetWidth: 400}],
            containerEl: {offsetWidth: 1000},
        };
    });

    it('should return 0 when isCenteredSlides is false', () => {
        const position = getStartPosition(mockConfigurator, mockStater, mockElementor);
        expect(position).toBe(0);
    });

    it('should calculate position correctly when isCenteredSlides is true', () => {
        mockConfigurator.setting.isCenteredSlides = true;
        const position = getStartPosition(mockConfigurator, mockStater, mockElementor);
        expect(position).toBe(300);
    });
});


test('get move distance', async () => {
    expect(getMoveDistance(20, 21)).toEqual(1);
});



describe('checkInRange function', () => {
    let stater;

    beforeEach(() => {
        // Initialize your Stater object before each test
        stater = {
            actual: {
                minIndex: 0,
                maxIndex: 10,
                moveLastIndex: 5
            }
        };
    });

    test('Should return false when index is less than minIndex', () => {
        const result = checkInRange(-1, 5, stater);
        expect(result).toBeFalsy();
    });

    test('Should return false when index is more than maxIndex', () => {
        const result = checkInRange(11, 5, stater);
        expect(result).toBeFalsy();
    });

    test('Should return true when activeActualIndex is more than moveLastIndex and index is equal to moveLastIndex', () => {
        const result = checkInRange(5, 6, stater);
        expect(result).toBeTruthy();
    });

    test('Should return true when index is equal to activeActualIndex', () => {
        const result = checkInRange(5, 5, stater);
        expect(result).toBeTruthy();
    });

    test('Should return false when index is not equal to activeActualIndex and not the edge case', () => {
        const result = checkInRange(3, 5, stater);
        expect(result).toBeFalsy();
    });
});
