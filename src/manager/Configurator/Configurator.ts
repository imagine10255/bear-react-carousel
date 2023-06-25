import {ulid} from 'ulid';
import {getHeight, getMediaSetting} from './utils';
import {ISetting} from './types';
import {IPropsBreakpoints} from '../../types';
import elClassName from '../../el-class-name';



class Configurator {
    private _setting: ISetting;
    private _carouselId = `bear-react-carousel_${ulid().toLowerCase()}`;

    constructor(breakpoint: IPropsBreakpoints, options?: ISetting) {
        this.init(breakpoint, options);
    }

    get carouselId(){
        return this._carouselId;
    }

    get setting() {
        return this._setting;
    }


    get style() {
        const rootHeight = getHeight(this.setting.height);
        const styleData = [
            {
                targetEl: `#${this._carouselId}`,
                styles: rootHeight,
            },
            {
                // 保護不被項目擠開
                targetEl: `#${this.carouselId} .${elClassName.content}`,
                styles: [
                    `position: ${this.setting.height ? 'absolute': 'static'};`,
                ]
            },
            {
                targetEl: `#${this.carouselId} .${elClassName.slideItem}`,
                styles: [
                    `flex: ${this.setting.slidesPerView === 'auto' ? '0 0 auto;-webkit-flex: 0 0 auto;' : `0 0 ${100 / this.setting.slidesPerViewActual}%`};`,
                    `padding-left: ${this.setting.spaceBetween / 2}px;`,
                    `padding-right: ${this.setting.spaceBetween / 2}px;`,
                ]
            }
        ];

        return styleData
            .filter(row => typeof row.styles !== 'undefined')
            ?.map(row => {
                return `${row.targetEl}{${row.styles.join('')}}`;
            }).join('\r\n');
    }


    init = (responsiveBreakpoints: IPropsBreakpoints, options?: ISetting) => {
        this._setting = getMediaSetting(options, responsiveBreakpoints);
    };
}


export default Configurator;
