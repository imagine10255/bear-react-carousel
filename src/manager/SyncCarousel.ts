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
        if(!this._carouselRef){
            return null;
        }

        // 將進度比例換算成 movePx
        const moveX = this._elementor.getPercentageToMovePx(percentage);
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
