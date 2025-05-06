import '@testing-library/jest-dom';

import {checkIsDesktop, checkIsMobile,decimal2Rounding, getLastIndex, getLoopResetIndex, getMatrixValue, getNextPage, getSizeByRange} from './utils';


test('get matrix value', async () => {
    const params = getMatrixValue('matrix(1, 0, 0, 1, 20, 30)');
    expect(params).toEqual([1, 0, 0, 1, 20, 30]);
});


test('truncate two decimal round down', async () => {
    expect(decimal2Rounding(10.454)).toEqual(10.45);
    expect(decimal2Rounding(11.469)).toEqual(11.46);

});



describe('checkIsMobile', () => {
    let originalCreateEvent: typeof document.createEvent;

    beforeAll(() => {
        originalCreateEvent = document.createEvent;
    });

    afterEach(() => {
        document.createEvent = originalCreateEvent;
    });

    it('should return true when document.createEvent("TouchEvent") does not throw an error', () => {
        document.createEvent = jest.fn().mockImplementation((event: string) => {
            if (event === 'TouchEvent') {
                return new TouchEvent('touchstart');
            }
            throw new Error(`Unsupported event type: ${event}`);
        });

        expect(checkIsMobile()).toBe(true);
    });

    it('should return false when document.createEvent("TouchEvent") throws an error', () => {
        document.createEvent = jest.fn().mockImplementation(() => {
            throw new Error('Simulated error');
        });

        expect(checkIsMobile()).toBe(false);
    });
});


describe('checkIsDesktop', () => {
    let originalCreateEvent: typeof document.createEvent;

    beforeAll(() => {
        originalCreateEvent = document.createEvent;
    });

    afterEach(() => {
        document.createEvent = originalCreateEvent;
    });

    it('should return true when document.createEvent("MouseEvent") does not throw an error', () => {
        document.createEvent = jest.fn().mockImplementation((event: string) => {
            if (event === 'MouseEvent') {
                return new MouseEvent('click');
            }
            throw new Error(`Unsupported event type: ${event}`);
        });

        expect(checkIsDesktop()).toBe(true);
    });

    it('should return false when document.createEvent("MouseEvent") throws an error', () => {
        document.createEvent = jest.fn().mockImplementation(() => {
            throw new Error('Simulated error');
        });

        expect(checkIsDesktop()).toBe(false);
    });
});




test('get media range size', async () => {
    const range = [576, 768, 920, 1024];
    expect(getSizeByRange(320, range)).toEqual(0);
    expect(getSizeByRange(576, range)).toEqual(576);
    expect(getSizeByRange(800, range)).toEqual(768);
});




test('get next page', async () => {
    expect(getNextPage(6)).toEqual(7);
});


test('get last index', async () => {
    expect(getLastIndex(6)).toEqual(5);
});


test('get last reset index', async () => {
    expect(getLoopResetIndex(1, 5)).toEqual(6);
});
