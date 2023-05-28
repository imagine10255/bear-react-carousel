import {IBreakpointSetting, IBreakpointSettingActual, IPropsBreakpoints, ITouchStart} from './types';
import {checkIsMobile, getSizeByRange} from './utils';



class RWDMedia {
    private _setting: IBreakpointSettingActual = {
        slidesPerView: 1,
        slidesPerViewActual: 1,
        aspectRatio: undefined,
        slidesPerGroup: 1,
        spaceBetween: 0,

        isCenteredSlides: false,
        isEnableLoop: false,
        isEnablePagination: true,
        isEnableNavButton: true,
        isEnableMouseMove: true,
        isEnableAutoPlay: false,
    };
    private _breakpoints: IPropsBreakpoints;

    constructor(initSetting: IBreakpointSettingActual, breakpoints: IPropsBreakpoints) {
        this.setSetting(initSetting);
        this._breakpoints = breakpoints;
    }

    get setting(){
        return this._setting;
    }

    setSetting(setting: IBreakpointSettingActual) {
        this._setting = setting;
    }


    get size() {
        return getSizeByRange(window.innerWidth, Object.keys(this._breakpoints).map(Number));
    }
}

export default RWDMedia;
