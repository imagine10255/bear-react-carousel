import {TEventMap} from './types';

import Eventor from '../Eventor';
import {EDevice, IPropsBreakpoints, GlobalWindow} from '../../types';
import {checkIsDesktop, checkIsMobile, getSizeByRange, objectKeys} from '../../utils';
import {logEnable} from '../../config';
import logger from '../../logger';
import Configurator from '../Configurator';


const resizeEvent: Record<EDevice, string> = {
    [EDevice.mobile]: 'orientationchange',
    [EDevice.desktop]:  'resize'
};

class WindowSizer {
    private _breakpoints?: IPropsBreakpoints;
    private _configurator: Configurator;
    private _size: number;
    private _device: EDevice;
    private _eventManager = new Eventor<TEventMap>();
    private _window: GlobalWindow;
    private _currWidth: number;

    get size() {
        return this._size;
    }
    get device(){
        return this._device;
    }

    constructor(inject: {
        breakpoints?: IPropsBreakpoints,
        win: GlobalWindow
        configurator: Configurator,
    }) {
        this._breakpoints = inject.breakpoints;
        this._configurator = inject.configurator;
        this._window = inject.win;
        this._device = this._detectDevice();
        this._size = this._setSize();
        this._currWidth = this._window.innerWidth;
    }

    private _detectDevice = (): EDevice => {
        if (checkIsMobile()) {
            return EDevice.mobile;
        } else if (checkIsDesktop()) {
            return EDevice.desktop;
        } else {
            return EDevice.desktop; // default
        }
    };

    private _setSize = () => {
        return getSizeByRange(this._window.innerWidth, this._breakpoints ? objectKeys(this._breakpoints).map(Number): undefined);
    };

    private _emitResize = () => {
        if(this._configurator.setting.isDebug && logEnable.windowSizer.onResize) logger.printInText('[WindowSizer.onResize]');

        if(this._currWidth !== this._window.innerWidth){
            this._currWidth = this._window.innerWidth;
        }

        this._size = this._setSize();
        this._eventManager.emit('resize', {windowSize: this._size});
    };

    onResize = (callBack: TEventMap['resize']) => {
        if(this._device === EDevice.mobile){
            this._window.addEventListener(resizeEvent[EDevice.mobile], this._emitResize, false);
        }
        this._window.addEventListener(resizeEvent[EDevice.desktop], this._emitResize, false);
        this._eventManager.on('resize', callBack);
    };

    offResize = (callBack: TEventMap['resize']) => {
        if(this._device === EDevice.mobile){
            this._window.removeEventListener(resizeEvent[EDevice.mobile], this._emitResize, false);
        }
        this._window.removeEventListener(resizeEvent[EDevice.desktop], this._emitResize, false);
        this._eventManager.off('resize', callBack);
    };
}

export default WindowSizer;
