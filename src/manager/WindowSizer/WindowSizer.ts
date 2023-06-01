import {getSizeByRange} from './utils';
import {EventMap} from './types';

import {EDevice, IPropsBreakpoints} from '../../types';
import Eventor from '../Eventor';


const resizeEvent: Record<EDevice, string> = {
    [EDevice.mobile]: 'orientationchange',
    [EDevice.desktop]:  'resize'
};

class WindowSizer {
    private _breakpoints: IPropsBreakpoints;
    private _size: number;
    private _device: EDevice;
    private _eventManager = new Eventor<EventMap>();

    get size() {
        return this._size;
    }

    constructor(breakpoints: IPropsBreakpoints, device: EDevice) {
        this._breakpoints = breakpoints;
        this._device = device;
        this._size = this._calculateSize();
    }

    private _calculateSize = () => {
        return getSizeByRange(window.innerWidth, Object.keys(this._breakpoints).map(Number));
    };
    
    private _emitResize = () => {
        this._size = this._calculateSize();
        this._eventManager.emit('resize', {windowSize: this._size});
    };

    public onResize = (callBack: EventMap['resize']) => {
        window.addEventListener(resizeEvent[this._device], this._emitResize, false);
        this._eventManager.on('resize', callBack);
    };

    public offResize = (callBack: EventMap['resize']) => {
        window.removeEventListener(resizeEvent[this._device], this._emitResize, false);
        this._eventManager.off('resize', callBack);
    };
}

export default WindowSizer;
