import {IAspectRatio, IBearCarouselProps, IBreakpointSetting, IBreakpointSettingActual, IPropsBreakpoints} from '../../types';
import {ISetting} from './types';
import {anyToNumber, getSizeByRange} from '../../utils';

export function getSetting(props: IBearCarouselProps): ISetting {
    return {
        slidesPerView: props.slidesPerView,
        slidesPerGroup: props.slidesPerGroup,
        aspectRatio: props.aspectRatio,
        staticHeight: props.staticHeight,
        spaceBetween: props.spaceBetween,
        isCenteredSlides: props.isCenteredSlides,
        isEnableNavButton: props.isEnableNavButton,
        isEnablePagination: props.isEnablePagination,
        isEnablePageContent: props.isEnablePageContent,
        isEnableMouseMove: props.isEnableMouseMove,
        isEnableAutoPlay: props.isEnableAutoPlay,
        isEnableLoop: props.isEnableLoop,
        moveTime: props.moveTime,
        defaultActivePage: props.defaultActivePage,
        autoPlayTime: props.autoPlayTime,
        isDebug: props.isDebug
    };
};




/**
 * 依照尺寸取得比例
 * @param aspectRatio
 * @param slidesPerView
 */
export function getPaddingBySize(aspectRatio: IAspectRatio, slidesPerView: number): string {
    const calc = (100 * (aspectRatio.heightRatio / aspectRatio.widthRatio) / slidesPerView).toFixed(2);

    if(aspectRatio.addStaticHeight){
        return `calc(${calc}% + ${aspectRatio.addStaticHeight})`;
    }
    return `${calc}%`;
}


/**
 * 取得響應式設定
 * @param setting
 * @param breakpoints
 */
export function getMediaSetting(defaultBreakpoint: IBreakpointSetting, breakpoints: IPropsBreakpoints): IBreakpointSettingActual {
    const selectSize = getSizeByRange(window.innerWidth, Object.keys(breakpoints).map(Number));
    let setting = defaultBreakpoint;
    if(selectSize > 0){
        setting = defaultBreakpoint ? Object.assign(defaultBreakpoint) : breakpoints[selectSize];
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
