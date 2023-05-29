import {EDevice, IPropsBreakpoints} from '../types';
import {getSizeByRange} from '../utils';

type TOnResize = (windowSize: number) => void;

const resizeEvent: Record<EDevice, string> = {
    [EDevice.mobile]: 'orientationchange',
    [EDevice.desktop]:  'resize'
};
type TCallback = (args: any) => void

class WindowSizer {
    private _breakpoints: IPropsBreakpoints;
    private _size: number;
    private _device: EDevice;
    private events: Record<string, TCallback[]> = {};

    get size() {
        return this._size;
    }

    constructor(breakpoints: IPropsBreakpoints, device: EDevice) {
        this._breakpoints = breakpoints;
        this._device = device;
        this._size = this._calculateSize();

        this._onResize = this._onResize.bind(this);
    }

    on(eventName: string, callback: TCallback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    emit(eventName: string, args: any) {
        if (this.events[eventName]) {
            for (const callback of this.events[eventName]) {
                callback(args);
            }
        }
    }

    private _onResize(){
        this._size = this._calculateSize();
        this.emit('resize', this._size);
    }

    private _calculateSize() {
        return getSizeByRange(window.innerWidth, Object.keys(this._breakpoints).map(Number));
    }

    public mount = () => {
        this._size = this._calculateSize();
        window.addEventListener(resizeEvent[this._device], this._onResize, false);
        return this;
    }

    public unmount = () => {
        window.removeEventListener(resizeEvent[this._device], this._onResize, false);
    }


}


export default WindowSizer;
