import {calcMoveTranslatePx} from './utils';
import {TEventMap} from './types';

import Configurator from '../Configurator';
import Elementor from '../Elementor';
import Locator from '../Locator';
import Stater from '../Stater';
import Eventor from '../Eventor';
import {DesktopTouchEvent, MobileTouchEvent} from '../../interface/DragEvent';
import logger from '../../logger';
import {logEnable} from '../../config';
import Controller from "../Controller";


/**
 * unmount 跟 blur 都需要 停止計時器
 */
class Dragger {
    private _configurator: Configurator;
    private _elementor: Elementor;
    private _locator: Locator;
    private _stater: Stater;
    private _controller: Controller;
    private _eventor = new Eventor<TEventMap>();


    constructor(manager: {
        configurator: Configurator,
        elementor: Elementor,
        stater: Stater,
        controller: Controller,
    }) {
        this._configurator = manager.configurator;
        this._elementor = manager.elementor;
        this._stater = manager.stater;
        this._controller = manager.controller;
        this._locator = new Locator();
    }


    onDragStart = (callBack?: TEventMap['dragStart']) => {
        this._elementor.containerEl.addEventListener('touchstart', this._onMobileTouchStart, {passive: false});
        this._elementor.containerEl.addEventListener('mousedown', this._onWebMouseStart, {passive: false});
        this._eventor.on('dragStart', callBack);
    };

    onDragMove = (callBack?: TEventMap['dragMove']) => {
        this._eventor.on('dragMove', callBack);
    };

    onDragEnd = (callBack?: TEventMap['dragEnd']) => {
        this._eventor.on('dragEnd', callBack);
    };

    offDragStart = (callBack?: TEventMap['dragStart']) => {
        this._elementor.containerEl.removeEventListener('touchstart', this._onMobileTouchStart, {passive: false} as any);
        this._elementor.containerEl.removeEventListener('mousedown', this._onWebMouseStart, {passive: false} as any);
        this._eventor.off('dragStart', callBack);
    };

    offDragMove = (callBack?: TEventMap['dragMove']) => {
        this._eventor.off('dragMove', callBack);
    };

    offDragEnd = (callBack?: TEventMap['dragEnd']) => {
        this._eventor.off('dragEnd', callBack);
    };


    /**
     * mobile phone finger press start
     * @param event
     */
    private _onMobileTouchStart = (event: TouchEvent): void => {
        if(this._configurator.setting.isDebug && logEnable.dragger.onMobileTouchStart) logger.printInText('[Dragger._onMobileTouchStart]');
        this._eventor.emit('dragStart');

        const {containerEl} = this._elementor;
        if (containerEl) {
            this._locator.touchStart(new MobileTouchEvent(event), containerEl);
            containerEl.addEventListener('touchmove', this._onMobileTouchMove, false);
            containerEl.addEventListener('touchend', this._onMobileTouchEnd, false);
        }
    };



    /**
     * Mobile phone finger press and move
     * @param event
     */
    private _onMobileTouchMove = (event: TouchEvent): void => {
        event.preventDefault();
        if(this._configurator.setting.isDebug && logEnable.dragger.onMobileTouchMove) logger.printInText('[Dragger._onMobileTouchMove]');

        const movePx = this._locator.touchMove(new MobileTouchEvent(event), this._elementor.containerEl);
        this._dragMove(movePx);
    };

    /**
     * Mobile phone finger press to end
     * @param event
     *
     * PS: Add event.preventDefault(); will affect the mobile phone click onClick event
     */
    private _onMobileTouchEnd = (event: TouchEvent): void => {
        if(this._configurator.setting.isDebug && logEnable.dragger.onMobileTouchEnd) logger.printInText('[Dragger._onMobileTouchEnd]');

        this._elementor.containerEl?.removeEventListener('touchmove', this._onMobileTouchMove, false);
        this._elementor.containerEl?.removeEventListener('touchend', this._onMobileTouchEnd, false);
        this._dragEnd();
    };

    /**
     * Web mouse click
     * @param event
     */
    private _onWebMouseStart = (event: MouseEvent): void => {
        if(this._configurator.setting.isDebug && logEnable.dragger.onWebMouseStart) logger.printInText('[Dragger._onWebMouseStart]');
        this._eventor.emit('dragStart');

        const {containerEl} = this._elementor;
        if (containerEl) {
            this._locator.touchStart(new DesktopTouchEvent(event), containerEl);
            this._elementor.rootEl?.addEventListener('mouseleave', this._onWebMouseEnd, false);
            containerEl.addEventListener('mousemove', this._onWebMouseMove, false);
            containerEl.addEventListener('mouseup', this._onWebMouseEnd, false);
        }

    };


    /**
     * Web mouse movement
     * @param event
     */
    private _onWebMouseMove = (event: MouseEvent):void => {
        event.preventDefault();
        if(this._configurator.setting.isDebug && logEnable.dragger.onWebMouseMove) logger.printInText('[Dragger._onWebMouseMove]');

        const movePx = this._locator.touchMove(new DesktopTouchEvent(event), this._elementor.containerEl);
        this._dragMove(movePx);
    };

    /**
     * web mouse release
     * @param event
     */
    private _onWebMouseEnd = (event: MouseEvent):void => {
        event.preventDefault();
        if(this._configurator.setting.isDebug && logEnable.dragger.onWebMouseEnd) logger.printInText('[Dragger._onWebMouseEnd]');

        this._elementor.rootEl?.removeEventListener('mouseleave', this._onWebMouseEnd, false);
        this._elementor.containerEl?.removeEventListener('mousemove', this._onWebMouseMove, false);
        this._elementor.containerEl?.removeEventListener('mouseup', this._onWebMouseEnd, false);
        this._dragEnd();
    };




    private _dragMove(moveX: number) {
        if(this._configurator.setting.isDebug && logEnable.dragger.onDragMove) logger.printInText('[Dragger._dragMove]');

        this._elementor.setNonSubjectTouch(false);

        const {startPosition} = this._locator;
        const {setting} = this._configurator;

        const isMinPx = 0;
        let oneElWidth = this._elementor.slideItemEls[0].clientWidth;
        const isMaxPx = -(oneElWidth * this._stater.actual.lastIndex);
        // console.log('isLastPx',isMinPx, isMaxPx);

        const translateX = calcMoveTranslatePx(startPosition.x, moveX);
        // console.log('translateX',translateX);

        if(translateX <= isMaxPx){
            this._elementor.syncOrder(this._stater.actual.activeIndex);
            this._controller.slideToActualIndex(this._stater.actual.activeIndex, {isUseAnimation: false});
            // const currEl = this._stater.formatElement.find(row => row.order === 0);
            const currEl = this._elementor.slideItemEls.find(row => Number(row.dataset.actual) === this._stater.actual.activeIndex);

            const percentage = this._elementor.getMovePercentage(translateX); //TODO: 應該移動到 Positioner
            const formatPercentage = Math.round(percentage - 1) % this._stater.element.total;
            // const activeIndex = formatPercentage % 3;
            // const firstEl = this._stater.formatElement.find(row => row.order === 0);
            // console.log('firstEl',firstEl.actualIndex);

            // const currOrder = this._stater.formatElement.find(row => row.actualIndex === this._stater.actual.activeIndex).order;
            const currOrder = this._stater.formatElement.find(row => row.order === formatPercentage);
            console.log(`============ reset: ${percentage}(${formatPercentage})/order:${currOrder.actualIndex} ============`);


            this._elementor.transform(translateX + oneElWidth)
                .syncActiveState(currOrder.actualIndex);

            console.log('oneElWidth');
            return;
        }else{
            const percentage = this._elementor.getMovePercentage(translateX); //TODO: 應該移動到 Positioner
            const formatPercentage = Math.round(percentage) % this._stater.element.total;

            console.log(`============ normal: ${percentage}(${formatPercentage}) ============`);
            oneElWidth = 0;
        }


        if (this._elementor.containerEl &&
            setting.isEnableMouseMove &&
            this._elementor.slideItemEls &&
            this._stater.page.pageTotal > 1
        ) {


            // const translateX = calcMoveTranslatePx(startPosition.x, moveX);
            const percentage = this._elementor.getMovePercentage(translateX); //TODO: 應該移動到 Positioner

            // 同步控制
            this._eventor.emit('dragMove', percentage);

            this._elementor
                .transform(translateX)
                .syncActiveState(Math.round(percentage));
        }
    }



    /**
     * The object movement ends (confirm the stop position and which Index position should be sucked)
     */
    private _dragEnd = (): void => {
        if(this._configurator.setting.isDebug && logEnable.dragger.onDragEnd) logger.printInText('[Dragger._dragEnd]');
        this._elementor.setNonSubjectTouch(true);

        if(this._elementor.slideItemEls){
            const active = this._elementor.slideItemEls.find(row => row.dataset.active === 'true');
            if(active){
                const activeSourceIndex = Number(active.dataset.actual);
                this._eventor.emit('dragEnd', activeSourceIndex);
            }
        }

    };


}


export default Dragger;
