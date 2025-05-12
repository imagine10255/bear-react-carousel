import {EDevice, IPropsBreakpoints} from '../../types';
import Configurator from '../Configurator';
import Eventor from '../Eventor';
import {TEventMap} from './types';
import WindowSizer from './WindowSizer';

jest.mock('../../utils', () => ({
    ...jest.requireActual('../../utils'),
    checkIsMobile: jest.fn(),
}));

describe('WindowSizer', () => {
    let mockWindow: Window & typeof globalThis;
    let mockBreakpoints: IPropsBreakpoints;
    let mockEventor: Eventor<TEventMap>;
    let resizeCallback: () => void;

    beforeEach(() => {
        const mockRemoveEventListener = jest.fn();

        mockWindow = {
            innerWidth: 1024,
            addEventListener: (event: string, callback: () => void) => {
                if (event === 'orientationchange' || event === 'resize') {
                    resizeCallback = callback;
                }
            },
            removeEventListener: mockRemoveEventListener,
            navigator: {userAgent: 'Mozilla/5.0'},
        } as unknown as Window & typeof globalThis;

        mockBreakpoints = {
            1024: {
                isEnableLoop: true,
            }
        };

        mockEventor = new Eventor<TEventMap>();

        jest.spyOn(window, 'addEventListener');
        jest.spyOn(window, 'removeEventListener');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });


    it('should create an instance with correct initial size', () => {
        const sizer = new WindowSizer({
            breakpoints: mockBreakpoints,
            win: mockWindow,
            configurator: new Configurator(mockBreakpoints)
        });
        expect(sizer.size).toEqual(1024); // assuming getSizeByRange returns innerWidth as is
    });

    it('should detect device correctly', () => {
        (require('../../utils').checkIsMobile as jest.Mock).mockReturnValue(true);
        Object.defineProperty(window.navigator, 'userAgent', {
            value: 'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B)',
            configurable: true
        });

        const sizer = new WindowSizer({
            breakpoints: mockBreakpoints,
            win: mockWindow,
            configurator: new Configurator(mockBreakpoints)
        });
        expect(sizer.device).toEqual(EDevice.mobile); // assuming checkIsMobile returns true for this userAgent
    });

    it('should emit resize event on window resize', () => {
        const sizer = new WindowSizer({
            breakpoints: mockBreakpoints,
            win: mockWindow,
            configurator: new Configurator(mockBreakpoints)
        });
        const callback = jest.fn();
        sizer.onResize(callback);

        // 先改變 innerWidth，讓 _emitResize 條件成立
        mockWindow.innerWidth = 800;
        resizeCallback();

        expect(callback).toHaveBeenCalled();
    });

});
