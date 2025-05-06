import Eventor from './Eventor';

type EventMap = {
    onResize: (args: { windowSize: number }) => void,
    onFocus: () => void,
};

describe('Eventor', () => {
    let eventor: Eventor<EventMap>;

    beforeEach(() => {
        eventor = new Eventor<EventMap>();
    });

    test('should register and trigger onResize event', () => {
        const onResizeCallback = jest.fn();

        eventor.on('onResize', onResizeCallback);
        eventor.emit('onResize', {windowSize: 800});

        expect(onResizeCallback).toHaveBeenCalledWith({windowSize: 800});
    });

    test('should register and trigger onFocus event', () => {
        const onFocusCallback = jest.fn();

        eventor.on('onFocus', onFocusCallback);
        eventor.emit('onFocus');

        expect(onFocusCallback).toHaveBeenCalled();
    });

    test('should unregister event', () => {
        const onResizeCallback = jest.fn();

        eventor.on('onResize', onResizeCallback);
        eventor.off('onResize', onResizeCallback);
        eventor.emit('onResize', {windowSize: 800});

        expect(onResizeCallback).not.toHaveBeenCalled();
    });
});
