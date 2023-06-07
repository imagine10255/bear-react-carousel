import Eventor from '../Eventor';
import {EDevice, IPropsBreakpoints} from '../../types';
import {TEventMap} from './types';
import WindowSizer from './WindowSizer';
import Configurator from '../Configurator';

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
                if (event === 'orientationchange') {
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

        // Trigger the mock event listener
        resizeCallback();

        expect(callback).toHaveBeenCalled();
    });

});
