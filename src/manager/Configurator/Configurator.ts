import {ulid} from 'ulid';
import {getHeight, getMediaSetting} from './utils';
import {ISetting} from './types';
import {IPropsBreakpoints, GlobalWindow} from '../../types';
import elClassName from '../../el-class-name';



class Configurator {
    private _setting: ISetting;
    private _carouselId = `bear-react-carousel_${ulid().toLowerCase()}`;
    private _window: GlobalWindow;

    constructor(breakpoint: IPropsBreakpoints, options?: ISetting, win?: GlobalWindow) {
        console.log('Configurator constructor', this.carouselId);
        this._window = win;
        this.init(breakpoint, options);
    }

    get carouselId(){
        return this._carouselId;
    }

    get setting() {
        return this._setting;
    }


    get style() {
        const isAutoHeight = typeof this.setting.height === 'undefined' || this.setting.height === 'auto';
        const rootHeight = getHeight(this.setting.height);
        const styleData = [
            {
                targetEl: `#${this.carouselId}`,
                styles: rootHeight,
            },
            {
                // 保護不被項目擠開
                targetEl: `#${this.carouselId} .${elClassName.content}`,
                styles: [
                    `position: ${isAutoHeight ? 'static': 'absolute'};`,
                ]
            },
            {
                targetEl: `#${this.carouselId} .${elClassName.slideItem}`,
                styles: [
                    'flex: 0 0 auto;',
                    `width: ${this.setting.slidesPerView === 'auto' ? 'auto' : `${100 / this.setting.slidesPerViewActual}%`};`,
                    `padding-left: ${this.setting.spaceBetween / 2}px;`,
                    `padding-right: ${this.setting.spaceBetween / 2}px;`,
                ]
            },
        ];

        return styleData
            .filter(row => typeof row.styles !== 'undefined')
            ?.map(row => {
                return `${row.targetEl}{${row.styles.join('')}}`;
            }).join('\r\n');
    }


    init = (responsiveBreakpoints: IPropsBreakpoints, options?: ISetting) => {
        this._setting = getMediaSetting(options, responsiveBreakpoints, this._window);
    };
}


export default Configurator;
