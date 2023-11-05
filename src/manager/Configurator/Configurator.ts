import {CSSProperties} from 'react';
import {getHeight, getMediaSetting} from './utils';
import {ISetting} from '../../types';
import {IPropsBreakpoints, GlobalWindow} from '../../types';



class Configurator {
    private _setting: ISetting;
    private _window: GlobalWindow;

    constructor(breakpoint: IPropsBreakpoints, options?: ISetting, win?: GlobalWindow) {
        this._window = win;
        this.init(breakpoint, options);
    }

    get setting() {
        return this._setting;
    }


    get style() {
        const isAutoHeight = typeof this.setting.height === 'undefined' || this.setting.height === 'auto';
        const rootHeight = getHeight(this.setting.height);
        const styleVars = {
            '--carousel-height': rootHeight?.height,
            '--carousel-aspect-ratio': rootHeight?.aspectRatio,
            '--carousel-content-position': isAutoHeight ? 'static': 'absolute', // 保護不被項目擠開
            '--carousel-space-between': `${this.setting.spaceBetween}px`,
            '--carousel-slide-width': this.setting.slidesPerView === 'auto' ? 'auto' : `${100 / this.setting.slidesPerViewActual}%`,
        } as CSSProperties;

        console.log('styleVars', styleVars);
        return styleVars;
    }


    init = (responsiveBreakpoints: IPropsBreakpoints, options?: ISetting) => {
        this._setting = getMediaSetting(options, responsiveBreakpoints, this._window);
    };
}


export default Configurator;
