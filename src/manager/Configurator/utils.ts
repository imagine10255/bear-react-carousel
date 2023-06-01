import {IBearCarouselProps} from '../../types';
import {ISetting} from './types';

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
        isEnableMouseMove: props.isEnableMouseMove,
        isEnableAutoPlay: props.isEnableAutoPlay,
        isEnableLoop: props.isEnableLoop,
        moveTime: props.moveTime,
        defaultActivePage: props.defaultActivePage,
        autoPlayTime: props.autoPlayTime,
        isDebug: props.isDebug
    };
};
