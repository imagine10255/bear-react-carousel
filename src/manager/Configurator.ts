import {IBreakpointSetting, IBreakpointSettingActual, IPropsBreakpoints, TSlidesPerViewActual} from '../types';
import {getMediaSetting} from '../utils';
import Stater from './Stater';
import PositionManager from './PositionManager';
import ElManager from './ElManager';

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

interface IBreakpoint {
    defaultSetting?: IBreakpointSetting,
    responsiveBreakpoints?: IPropsBreakpoints,
}


export interface ISetting extends IBreakpointSetting {
    slidesPerViewActual?: TSlidesPerViewActual
    moveTime?: number,
    defaultActivePage?: number,
    autoPlayTime?: number,
    isDebug?: boolean,
}

class Configurator {
    private _setting: ISetting;


    constructor(breakpoint: IPropsBreakpoints, options?: ISetting) {
        this.init(breakpoint, options);
    }

    // constructor(manager: {
    //     breakpoints: IPropsBreakpoints,
    //     defaultBreakpoint = defaultSetting,
    // }) {
    //     // this.init(breakpoints, defaultBreakpoint);
    // }

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

    init(responsiveBreakpoints: IPropsBreakpoints, options?: ISetting) {
        this._setting = getMediaSetting(options, responsiveBreakpoints);
    }

    // init(breakpoints: IPropsBreakpoints, defaultBreakpoint = defaultSetting) {
    //
    //     this._setting = getMediaSetting(defaultBreakpoint, breakpoints);
    // }
}


export default Configurator;
