import {IBreakpointSettingActual} from './types';

class SlideSettingManager {
    private _setting: IBreakpointSettingActual;

    constructor(initSetting: IBreakpointSettingActual = {
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
    }) {
        this._setting = initSetting;
    }

    get setting() {
        return this._setting;
    }

    setSetting(setting: IBreakpointSettingActual) {
        this._setting = setting;
    }
}


export default SlideSettingManager;
