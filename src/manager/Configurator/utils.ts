import {
    GlobalWindow,         IAcroolCarouselProps,
    IAspectRatio,
    IBreakpointSetting,
    IBreakpointSettingActual,
    IPropsBreakpoints,
    TSlidesPerView
} from '../../types';
import {ISetting} from '../../types';
import {anyToNumber, getSizeByRange, objectKeys} from '../../utils';


/**
 * 取得設定
 * @param props
 */
export function getSetting(props: IAcroolCarouselProps): ISetting {
    return {
        slidesPerView: props.slidesPerView,
        slidesPerGroup: props.slidesPerGroup,
        slidesPerViewActual: 0,
        height: props.height,
        spaceBetween: props.spaceBetween,
        isCenteredSlides: props.isCenteredSlides,
        isEnableNavButton: props.isEnableNavButton,
        isEnablePagination: props.isEnablePagination,
        isEnablePageContent: props.isEnablePageContent,
        isEnableMouseMove: props.isEnableMouseMove,
        isEnableAutoPlay: props.isEnableAutoPlay,
        isEnableLoop: props.isEnableLoop,
        moveTime: props.moveTime,
        movePercentage: props.movePercentage,
        autoPlayTime: props.autoPlayTime,
        initStartPlayTime: props.initStartPlayTime,
        moveEffect: props.moveEffect,
        isDebug: props.isDebug,
        isEnableGPURender: props.isEnableGPURender,
    };
}







/**
 * 取得響應式設定
 * @param options
 */
export function getMediaSetting(options?: {
    defaultBreakpoint?: IBreakpointSetting,
    breakpoints?: IPropsBreakpoints,
    win?: GlobalWindow,
}): IBreakpointSettingActual {
    const breakpoints = options?.breakpoints;
    const win = options?.win;
    const defaultBreakpoint = options?.defaultBreakpoint;

    const selectSize = (breakpoints && win) ? getSizeByRange(win?.innerWidth, objectKeys(breakpoints).map(Number)): 0;
    let setting = defaultBreakpoint ?? {
        slidesPerView: 1,
        slidesPerGroup: 1,
    };
    if(breakpoints && selectSize > 0){
        setting = Object.assign(setting, breakpoints[selectSize]) as IBreakpointSetting;
    }

    // 若顯示項目大於來源項目, 則關閉Loop
    // if (setting.slidesPerView > dataLength) {
    //     setting.isEnableLoop = false;
    // }

    const slidesPerViewActual = setting.slidesPerView === 'auto' ? 1: anyToNumber(setting.slidesPerView , 1);
    return {
        ...setting,
        slidesPerViewActual: slidesPerViewActual,
        isEnableLoop: setting.slidesPerView === 'auto' ? false : setting.isEnableLoop,
        slidesPerGroup: setting.slidesPerGroup > slidesPerViewActual ? slidesPerViewActual:anyToNumber(setting.slidesPerGroup, 1), // fix
    };
}

/**
 * 取得高度設定
 * @param height
 */
export function getHeight(height: IBreakpointSetting['height']) {
    if(typeof height === 'number'){
        return {
            height: `${height}px`,
        };

    }else if(typeof height === 'string'){
        if(height === 'auto'){
            return undefined;
        }
        return {height};

    }else if(typeof height?.widthRatio !== 'undefined' && typeof height?.heightRatio !== 'undefined'){
        return {
            aspectRatio: `${height.widthRatio} / ${height.heightRatio}`,
            height: 'auto'
        };
    }
    return undefined;
}
