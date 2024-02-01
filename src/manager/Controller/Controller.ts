import {TEventMap} from './types';
import {getNextIndex, getPrevIndex, getSlideIndex} from './utils';

import Configurator from '../Configurator';
import Stater from '../Stater';
import Eventor from '../Eventor';
import {logEnable} from '../../config';
import logger from '../../logger';
import ElState from '../Elementor/ElState';


class Controller {
    private readonly _configurator: Configurator;
    private readonly _stater: Stater;
    private readonly _elState: ElState;
    private _eventor = new Eventor<TEventMap>();

    constructor(manager: {
        configurator: Configurator,
        stater: Stater,
        elState: ElState,
    }) {
        this._configurator = manager.configurator;
        this._stater = manager.stater;
        this._elState = manager.elState;
    }

    onSlideBefore = (callback: TEventMap['slideBefore']) => {
        this._eventor.on('slideBefore', callback);
    };


    onSlideAfter = (callback: TEventMap['slideAfter']) => {
        this._eventor.on('slideAfter', callback);
    };


    offSlideBefore = (callback: TEventMap['slideBefore']) => {
        this._eventor.off('slideBefore', callback);
    };

    offSlideAfter = (callback: TEventMap['slideAfter']) => {
        this._eventor.off('slideAfter', callback);
    };


    /**
     * reset page position (Only LoopMode)
     * PS: If the element is isClone then return to the position where it should actually be displayed
     */
    slideResetToMatchIndex = (): void => {
        if(this._configurator.setting.isDebug && logEnable.controller.onSlideResetToMatchIndex) logger.printInText('[Controller.slideResetToMatchIndex]');
        const {virtual, formatElement} = this._stater;

        if (formatElement[virtual.activeIndex]?.isClone) {
            this.slideToVirtualIndex(formatElement[virtual.activeIndex].matchIndex, {isUseAnimation: false});
        }
    };


    /**
     * 包含 Clone 的 Index
     * @param slideIndex
     * @param options
     */
    slideToSourceIndex = (slideIndex: number, options?: {isUseAnimation?: boolean, isEmitEvent?: boolean}) => {
        const isEmitEvent = options?.isEmitEvent ?? true;
        if(isEmitEvent) this._eventor.emit('slideBefore', slideIndex, options?.isUseAnimation ?? false);

        // 轉成範圍內的 Index //@Check
        const selected = this._stater.formatElement.find(row => row.sourceIndex === slideIndex && !row.isClone);
        if(selected){
            this.slideToVirtualIndex(selected.virtualIndex, options);
        }
    };


    /**
     * 包含 Clone 的 Index
     * @param slideIndex
     * @param options
     */
    slideToVirtualIndex = (slideIndex: number, options?: {isUseAnimation?: boolean, isEmitEvent?: boolean}) => {
        const isEmitEvent = options?.isEmitEvent ?? true;
        if(isEmitEvent) this._eventor.emit('slideBefore', slideIndex, options?.isUseAnimation ?? false);

        // 轉成範圍內的 Index
        const inRangeIndex = this._stater.getInRangeIndex(slideIndex);

        const {formatElement} = this._stater;
        this._stater.setActiveActual(inRangeIndex, formatElement[inRangeIndex]?.inPage ?? 1);

        // 移動EL位置
        const position = this._elState.getMoveDistance(inRangeIndex);
        this._elState
            .transform(position, options?.isUseAnimation ?? true)
            .moveEffect(slideIndex, options?.isUseAnimation ?? true)
            .syncActiveState(inRangeIndex);


        if(isEmitEvent) this._eventor.emit('slideAfter', inRangeIndex, options?.isUseAnimation);
    };

    /**
     * 移動到指定頁面
     * @param page
     * @param isUseAnimation 是否開啟動畫
     * ex: slideView: 2, slideGroup: 2, total: 4
     * page1 -> (1-1) * 2) + 1 + (firstIndex -1) = 1
     */
    slideToPage(page: number, isUseAnimation = true){
        const {setting} = this._configurator;
        page = page > this._stater.page?.total ? this._stater.page?.total: page;

        const slideIndex = getSlideIndex(page, setting.slidesPerGroup);
        this.slideToSourceIndex(slideIndex, {isUseAnimation});
    }

    /**
     * 移動到下一頁
     */
    slideToNextPage = (): void => {
        getNextIndex(this._elState, this._stater, this._configurator)
            .forEach(action => this.slideToVirtualIndex(action.index, {isUseAnimation: action.isUseAnimation}));
    };

    /**
     * go to previous
     */
    slideToPrevPage = (): void => {
        getPrevIndex(this._elState, this._stater, this._configurator)
            .forEach(action => this.slideToVirtualIndex(action.index, {isUseAnimation: action.isUseAnimation}));

    };

}


export default Controller;
