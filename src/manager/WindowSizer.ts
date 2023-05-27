import {EDevice, IPropsBreakpoints} from '../types';
import {getSizeByRange} from '../utils';

type TOnResize = (windowSize: number) => void;

const resizeEvent: Record<EDevice, string> = {
    [EDevice.mobile]: 'orientationchange',
    [EDevice.desktop]:  'resize'
};

class WindowSizer {
    private _breakpoints: IPropsBreakpoints;
    private _size: number;
    private _device: EDevice;
    private _onResizeCallback: TOnResize | null = null;

    constructor(breakpoints: IPropsBreakpoints, device: EDevice) {
        this._breakpoints = breakpoints;
        this._device = device;
        this._size = this._calculateSize();

        this._onResize = this._onResize.bind(this);
    }

    _onResize(){
        this._size = this._calculateSize();
        if (this._onResizeCallback) {
            this._onResizeCallback(this._size);
        }
    }

    mount(onResize: TOnResize){
        this._size = this._calculateSize();
        this._onResizeCallback = onResize;
        window.addEventListener(resizeEvent[this._device], this._onResize, false);
    }

    unmount(){
        window.removeEventListener(resizeEvent[this._device], this._onResize, false);
        this._onResizeCallback = null;
    }

    private _calculateSize() {
        return getSizeByRange(window.innerWidth, Object.keys(this._breakpoints).map(Number));
    }

    get size() {
        return this._size;
    }
}


export default WindowSizer;
