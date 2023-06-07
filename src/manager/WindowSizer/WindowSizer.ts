import {getSizeByRange} from './utils';
import {TEventMap} from './types';

import Eventor from '../Eventor';
import {EDevice, IPropsBreakpoints} from '../../types';
import {checkIsDesktop, checkIsMobile} from '../../utils';


const resizeEvent: Record<EDevice, string> = {
    [EDevice.mobile]: 'orientationchange',
    [EDevice.desktop]:  'resize'
};

class WindowSizer {
    private _breakpoints: IPropsBreakpoints;
    private _size: number;
    private _device: EDevice;
    private _eventManager = new Eventor<TEventMap>();
    private _window: Window & typeof globalThis;

    get size() {
        return this._size;
    }
    get device(){
        return this._device;
    }

    constructor(breakpoints: IPropsBreakpoints, win: Window & typeof globalThis) {
        this._breakpoints = breakpoints;
        this._window = win;
        this._device = this._detectDevice();
        this._setSize();
    }

    private _detectDevice = (): EDevice => {
        if (checkIsMobile()) {
            return EDevice.mobile;
        } else if (checkIsDesktop()) {
            return EDevice.desktop;
        } else {
            throw new Error('Unable to detect device type');
        }
    };

    private _setSize = () => {
        this._size = getSizeByRange(window.innerWidth, Object.keys(this._breakpoints).map(Number));
    };

    private _emitResize = () => {
        this._setSize();
        this._eventManager.emit('resize', {windowSize: this._size});
    };

    onResize = (callBack: TEventMap['resize']) => {
        this._window.addEventListener(resizeEvent[this._device], this._emitResize, false);
        this._eventManager.on('resize', callBack);
    };

    offResize = () => {
        this._window.removeEventListener(resizeEvent[this._device], this._emitResize, false);
        this._eventManager.off('resize');
    };
}

export default WindowSizer;
