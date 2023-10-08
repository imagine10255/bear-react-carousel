import {RefObject} from 'react';
import BearCarousel from '../../BearCarousel';
import {logEnable} from '../../config';
import logger from '../../logger';

class SyncCarousel {
    private readonly _carouselRef: RefObject<BearCarousel>;

    constructor(carouselRef: RefObject<BearCarousel>) {
        this._carouselRef = carouselRef;
    }

    get _elementor(){
        return this._carouselRef?.current?._elementor;
    }

    get _configurator(){
        return this._carouselRef?.current?._configurator;
    }

    get _controller(){
        return this._carouselRef?.current?._controller;
    }

    syncControlMove = (percentage: number) => {
        if(this._configurator?.setting.isDebug && logEnable.syncCarousel.onSyncControlMove) logger.printInText('[SyncCarousel.syncControlMove]');

        if(this._elementor){
            // 將進度比例換算成 movePx
            const moveX = this._elementor.getPercentageToMovePx(percentage);
            this._elementor
                .transform(moveX)
                .moveEffect(percentage)
                .syncActiveState(Math.round(percentage));
        }
    };

    syncControlDone = (targetIndex: number) => {
        if(this._configurator?.setting.isDebug && logEnable.syncCarousel.onSyncControlDone) logger.printInText('[SyncCarousel.syncControlDone]');

        this._controller?.slideToVirtualIndex(targetIndex);
    };

    slideToSourceIndex = (slideIndex: number, isUseAnimation = true) => {
        if(this._configurator?.setting.isDebug && logEnable.syncCarousel.onSlideToSourceIndex) logger.printInText('[SyncCarousel.slideToSourceIndex]');

        this._controller?.slideToSourceIndex(slideIndex, {isUseAnimation, isEmitEvent: false});
    };

}

export default SyncCarousel;
