import {RefObject} from 'react';
import BearCarousel from '../../BearCarousel';

class SyncCarousel {
    private readonly _carouselRef: RefObject<BearCarousel>;

    constructor(carouselRef: RefObject<BearCarousel>) {
        this._carouselRef = carouselRef;
    }

    get _elementor(){
        return this._carouselRef?.current?._elementor;
    }

    get _locator(){
        return this._carouselRef?.current?._locator;
    }

    get _configurator(){
        return this._carouselRef?.current?._configurator;
    }

    get _controller(){
        return this._carouselRef?.current?._controller;
    }

    syncControlMove = (percentage: number) => {
        if(this._elementor){
            // 將進度比例換算成 movePx
            const moveX = this._elementor.getPercentageToMovePx(percentage);
            this._elementor.transform(moveX);
        }
    };

    syncControlDone = (targetIndex: number) => {
        this._controller?.slideToActualIndex(targetIndex);
    };

    slideToActualIndex = (slideIndex: number, isUseAnimation = true) => {
        this._controller?.slideToActualIndex(slideIndex, {isUseAnimation, isEmitEvent: false});
    };

}

export default SyncCarousel;
