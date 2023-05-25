import {IBreakpointSetting, IBreakpointSettingActual, IPropsBreakpoints} from '../types';
import {getMediaInfo, getMediaSetting} from '../utils';

const defaultSetting: IBreakpointSetting = {
    slidesPerView: 1,
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


class SlideSettingManager {
    private _setting: IBreakpointSettingActual;


    constructor(breakpoints: IPropsBreakpoints, defaultBreakpoint = defaultSetting) {
        this.init(breakpoints, defaultBreakpoint);
    }

    get setting() {
        return this._setting;
    }
    //
    // const rwdMedia = getMediaSetting({
    //     slidesPerView: typeof slidesPerView === 'number' && slidesPerView <= 0 ? 1: slidesPerView,
    //     slidesPerGroup: slidesPerGroup,
    //     aspectRatio: aspectRatio,
    //     staticHeight: staticHeight,
    //     spaceBetween: spaceBetween,
    //     isCenteredSlides: isCenteredSlides,
    //     isEnableNavButton: isEnableNavButton,
    //     isEnablePagination: isEnablePagination,
    //     isEnableMouseMove: isEnableMouseMove,
    //     isEnableAutoPlay: isEnableAutoPlay,
    //     isEnableLoop: isEnableLoop,
    // }, breakpoints);

    init(breakpoints: IPropsBreakpoints, defaultBreakpoint = defaultSetting) {
        this._setting = getMediaSetting(defaultBreakpoint, breakpoints);
    }
}


export default SlideSettingManager;
