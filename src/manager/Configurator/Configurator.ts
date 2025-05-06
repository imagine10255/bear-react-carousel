import {CSSProperties} from 'react';

import {ISetting} from '../../types';
import {GlobalWindow,IPropsBreakpoints} from '../../types';
import {getHeight, getMediaSetting} from './utils';


/**
 * 設定者
 */
class Configurator {
    private _setting: ISetting;
    private _window?: GlobalWindow;

    constructor(inject: {
        breakpoints?: IPropsBreakpoints,
        defaultBreakpoint?: ISetting,
        win?: GlobalWindow,
    }) {
        this._window = inject.win;
        this._setting = getMediaSetting(inject);

    }

    get setting() {
        return this._setting;
    }

    get isAutoHeight(){
        return typeof this.setting.height === 'undefined' || this.setting.height === 'auto';
    }
    get rootHeight(){
        return getHeight(this.setting.height);
    }

    get style() {
        const styleVars = {
            '--carousel-height': this.rootHeight?.height,
            '--carousel-aspect-ratio': this.rootHeight?.aspectRatio,
            '--carousel-content-position': this.isAutoHeight ? 'static': 'absolute', // 保護不被項目擠開
            '--carousel-space-between': `${this.setting.spaceBetween}px`,
            '--carousel-slide-width': this.setting.slidesPerView === 'auto' ? 'auto' : `${100 / this.setting.slidesPerViewActual}%`,
        } as CSSProperties;

        return styleVars;
    }


    init = (options: {breakpoints?: IPropsBreakpoints, defaultBreakpoint?: ISetting}) => {
        this._setting = getMediaSetting({
            defaultBreakpoint: options.defaultBreakpoint,
            breakpoints: options.breakpoints,
            win: this._window
        });
    };
}


export default Configurator;
