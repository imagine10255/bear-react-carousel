import {calcMoveTranslatePx, checkInRange, getNextIndex, getPrevIndex, getSlideIndex} from '../utils';
import Configurator from './Configurator';
import Stater from './Stater';
import elClassName from '../el-class-name';
import Locator from './Locator';
import Elementor from './Elementor';
import BearCarousel from '../BearCarousel';
import {IRefObject} from '../types';

class SyncController {

    private readonly _carouselRef: IRefObject<BearCarousel>;
    // private readonly _configurator: Configurator;
    // private readonly _stater: Stater;
    // private readonly _locator: Locator;
    // private readonly _elementor: Elementor;


    constructor(carouselRef: IRefObject<BearCarousel>) {
        this._carouselRef = carouselRef;
    }

    get _elementor(){
        return this._carouselRef.current._elementor;
    }

    get _locator(){
        return this._carouselRef.current._locator;
    }

    get _configurator(){
        return this._carouselRef.current._configurator;
    }

    get _controller(){
        return this._carouselRef.current._controller;
    }

    syncControlMove = (percentage: number) => {
        // 將進度比例換算成 movePx
        const moveX = this._elementor.getPercentageToMovePx(percentage);
        const x = this._elementor.slideItemEls[0].clientWidth;

        console.log('this._elementor.slideItemEls[0].clientWidth', this._elementor.slideItemEls[0].clientWidth);

        this._locator.touchStart({
            x: this._configurator.setting.isEnableLoop ? -x : 0,
        });

        this._elementor.transform(moveX);
    };

    syncControlDone = (targetIndex: number) => {
        this._controller.slideToActualIndex(targetIndex);
    };

}


export default SyncController;
