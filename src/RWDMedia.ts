import {IBreakpointSetting, IBreakpointSettingActual, ITouchStart} from './types';


class RWDMedia {
    _setting: IBreakpointSettingActual = {
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

    get setting(){
        return this._setting;
    }

}



export default Position;
