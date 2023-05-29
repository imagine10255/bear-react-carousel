import {IBreakpointSetting, IPropsBreakpoints, TSlidesPerViewActual} from '../types';
import {getMediaSetting, getPaddingBySize} from '../utils';
import elClassName from '../el-class-name';
import * as React from 'react';
import {ulid} from 'ulid';

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
    carouselId = `bear-react-carousel_${ulid().toLowerCase()}`;

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


    get style() {
        const styleData = [
            {
                targetEl: `#${this.carouselId}`,
                styles: [
                    `padding-top: ${this.setting.aspectRatio && this.setting.slidesPerView !== 'auto' ? getPaddingBySize(this.setting.aspectRatio, this.setting.slidesPerView) : '0'};`,
                    `height: ${this.setting.staticHeight ? `${this.setting.staticHeight}` : 'inherit'};`,
                ]
            },
            {
                targetEl: `#${this.carouselId} .${elClassName.slideItem}`,
                styles: [
                    `flex: ${this.setting.slidesPerView === 'auto' ? '0 0 auto;-webkit-flex: 0 0 auto;' : `1 0 ${100 / this.setting.slidesPerViewActual}%`};`,
                    `padding-left: ${this.setting.spaceBetween / 2}px;`,
                    `padding-right: ${this.setting.spaceBetween / 2}px;`,
                ]
            }
        ];

        return styleData.map(row => {
            return `${row.targetEl}{${row.styles.join('')}}`;
        }).join('\r\n');
    }


    init = (responsiveBreakpoints: IPropsBreakpoints, options?: ISetting) => {
        this._setting = getMediaSetting(options, responsiveBreakpoints);
    }

}


export default Configurator;
