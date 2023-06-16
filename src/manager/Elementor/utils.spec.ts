import {getMoveDistance, getStartPosition} from './utils';


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


