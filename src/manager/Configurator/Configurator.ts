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


    genStyle(slideTotal: number) {

        const orderStyle = Array.from({length: slideTotal}).map((row, index) => {
            return {
                targetEl: `#${this._carouselId} .${elClassName.slideItem}[data-order="${index}"]`,
                styles: [`order: ${index}`]
            };
        });

        const styleData = [
            {
                targetEl: `#${this._carouselId}`,
                styles: [
                    getHeight(this.setting.height),
                ]
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
                    `flex: ${this.setting.slidesPerView === 'auto' ? '0 0 auto;-webkit-flex: 0 0 auto;' : `1 0 ${100 / this.setting.slidesPerViewActual}%`};`,
                    `padding-left: ${this.setting.spaceBetween / 2}px;`,
                    `padding-right: ${this.setting.spaceBetween / 2}px;`,
                ]
            }
        ];

        return styleData
            .concat(orderStyle)
            .filter(row => typeof row !== 'undefined')
            .map(row => {
                return `${row.targetEl}{${row.styles.join('')}}`;
            }).join('\r\n');
    }


    init = (responsiveBreakpoints: IPropsBreakpoints, options?: ISetting) => {
        this._setting = getMediaSetting(options, responsiveBreakpoints);
    };
}


export default Configurator;
