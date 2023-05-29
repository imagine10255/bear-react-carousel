import {calcMoveTranslatePx, checkInRange, getNextIndex, getPrevIndex, getSlideIndex} from '../utils';
import Configurator from './Configurator';
import Stater from './Stater';
import elClassName from '../el-class-name';
import Locator from './Locator';
import Elementor from './Elementor';
import BearCarousel from '../BearCarousel';
import {IRefObject} from '../types';
import {MobileTouchEvent} from '../interface/DragEvent';

class SyncCarousel {
    private readonly _carouselRef: IRefObject<BearCarousel>;

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
        if(!this._carouselRef){
            return null;
        }
        const moveX = this._elementor.getPercentageToMovePx2(percentage);

        
        console.log('percentage', percentage, moveX);

        this._locator.touchStart({
            // x: this._configurator.setting.isEnableLoop ? -x : 0,
            x: 0,
        });

        // console.log('this._elementor', this._elementor.containerEl);
        // console.log('this._elementor', this._locator.id, this._locator._startPosition);
        this._elementor.transform(moveX);
    };

    syncControlDone = (targetIndex: number) => {
        if(!this._carouselRef){
            return null;
        }
        this._controller.slideToActualIndex(targetIndex);
    };

    slideToActualIndex = (slideIndex: number, isUseAnimation = true) => {
        if(!this._carouselRef){
            return null;
        }
        this._controller.slideToActualIndex(slideIndex, isUseAnimation);
    };

}


export default SyncCarousel;
