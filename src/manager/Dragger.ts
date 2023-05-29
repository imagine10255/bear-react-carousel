import Configurator from './Configurator';
import Controller from './Controller';
import {EDevice} from '../types';
import Elementor from './Elementor';
import log from '../log';
import {DesktopTouchEvent, MobileTouchEvent} from '../interface/DragEvent';
import AutoPlayer from './AutoPlayer';
import Locator from './Locator';
import {calcMoveTranslatePx, checkInRange} from '../utils';
import Stater from './Stater';
import SyncCarousel from './SyncCarousel';

type TCallback = () => void

/**
 * unmount 跟 blur 都需要 停止計時器
 */
class Dragger {
    _configurator: Configurator;
    _controller: Controller;
    _elementor: Elementor;
    _locator: Locator;
    _device: EDevice;
    _stater: Stater;
    _syncCarousel: SyncCarousel;

    private events: Record<string, TCallback[]> = {};

    constructor(manager: {
        configurator: Configurator,
        controller: Controller,
        elementor: Elementor,
        stater: Stater,
        locator: Locator,
        syncCarousel: SyncCarousel,
    }, device: EDevice) {
        this._configurator = manager.configurator;
        this._controller = manager.controller;
        this._elementor = manager.elementor;
        this._elementor = manager.elementor;
        this._stater = manager.stater;
        this._locator = manager.locator;
        this._syncCarousel = manager.syncCarousel;

        this._device = device;
    }

    on(eventName: string, callback: TCallback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    emit(eventName: string) {
        if (this.events[eventName]) {
            for (const callback of this.events[eventName]) {
                callback();
            }
        }
    }

    mount = () => {
        switch (this._device){
        case EDevice.mobile:
            this._elementor.containerEl.addEventListener('touchstart', this._onMobileTouchStart, {passive: false});
            break;
        case EDevice.desktop:
            this._elementor.containerEl.addEventListener('mousedown', this._onWebMouseStart, {passive: false});
            break;
        }
    };

    /**
     * 完全移除
     */
    unmount = () => {
        switch (this._device){
        case EDevice.mobile:
            this._elementor.containerEl.removeEventListener('touchstart', this._onMobileTouchStart, {passive: false} as any);
            break;
        case EDevice.desktop:
            this._elementor.containerEl.removeEventListener('mousedown', this._onWebMouseStart, {passive: false} as any);
            break;
        }
    };




    /**
     * mobile phone finger press start
     * @param event
     */
    _onMobileTouchStart = (event: TouchEvent): void => {
        // if(this.props.isDebug && logEnable.onMobileTouchStart) log.printInText('[_onMobileTouchStart]');

        this.emit('dragStart');

        const {containerEl} = this._elementor;
        if(this._elementor.isUseAnimation === false){
            this._controller.slideResetToMatchIndex();
            this._locator.touchStart(new MobileTouchEvent(event), containerEl);

            containerEl.addEventListener('touchmove', this._onMobileTouchMove, false);
            containerEl.addEventListener('touchend', this._onMobileTouchEnd, false);
        }

    };



    /**
     * Mobile phone finger press and move
     * @param event
     */
    _onMobileTouchMove = (event: TouchEvent): void => {
        event.preventDefault();

        const movePx = this._locator.touchMove(new MobileTouchEvent(event), this._elementor.containerEl);
        this._dragMove(movePx);
    };

    /**
     * Mobile phone finger press to end
     * @param event
     *
     * PS: Add event.preventDefault(); will affect the mobile phone click onClick event
     */
    _onMobileTouchEnd = (event: TouchEvent): void => {
        // if(this.props.isDebug && logEnable.onMobileTouchEnd) log.printInText('[_onMobileTouchEnd]');
        this.emit('dragDone');

        this._elementor.containerEl?.removeEventListener('touchmove', this._onMobileTouchMove, false);
        this._elementor.containerEl?.removeEventListener('touchend', this._onMobileTouchEnd, false);
        this._dragDone();

    };

    /**
     * Web mouse click
     * @param event
     */
    _onWebMouseStart = (event: MouseEvent): void => {
        // if(this.props.isDebug && logEnable.onWebMouseStart) log.printInText('[_onWebMouseStart]');

        this.emit('dragStart');

        this._controller.slideResetToMatchIndex();

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
    _onWebMouseMove = (event: MouseEvent):void => {
        event.preventDefault();
        // if(this.props.isDebug && logEnable.onWebMouseMove) log.printInText('[_onWebMouseMove]');

        const movePx = this._locator.touchMove(new DesktopTouchEvent(event), this._elementor.containerEl);
        this._dragMove(movePx);
        // this._controller.dragMove(movePx);
    };

    /**
     * web mouse release
     * @param event
     */
    _onWebMouseEnd = (event: MouseEvent):void => {
        event.preventDefault();
        // if(this.props.isDebug && logEnable.onWebMouseEnd) log.printInText('[_onWebMouseEnd]');

        this._elementor.rootEl?.removeEventListener('mouseleave', this._onWebMouseEnd, false);
        this._elementor.containerEl?.removeEventListener('mousemove', this._onWebMouseMove, false);
        this._elementor.containerEl?.removeEventListener('mouseup', this._onWebMouseEnd, false);
        this._dragDone();

        this.emit('dragDone');
    };




    _dragMove(moveX: number) {
        //     if(this.props.isDebug && logEnable.elementMove) log.printInText('[_elementMove]');

        this._elementor.setNonSubjectTouch(false);

        const {startPosition} = this._locator;
        const {setting} = this._configurator;

        if (this._elementor.containerEl &&
            setting.isEnableMouseMove &&
            this._elementor.slideItemEls &&
            this._stater.page.pageTotal > 1
        ) {
            const translateX = calcMoveTranslatePx(startPosition.x, moveX);

            const percentage = this._elementor.getMovePercentage(translateX); //TODO: 應該移動到 Positioner

            // 取得移動進度
            // if(this.props.onElementMove){
            //     this.props.onElementMove(this.activeActualIndex, percentage);
            // }

            // 同步控制
            this._syncCarousel.syncControlMove(percentage);

            this._elementor
                .transform(translateX)
                .syncActiveState(Math.round(percentage));
        }
    }



    /**
     * The object movement ends (confirm the stop position and which Index position should be sucked)
     */
    _dragDone = (): void => {
        // if(this.props.isDebug && logEnable.elementMoveDone) log.printInText('[_elementMoveDone]');
        this._elementor.setNonSubjectTouch(true);


        if(this._elementor.slideItemEls){
            const active = this._elementor.slideItemEls.find(row => row.dataset.active === 'true');
            if(active){
                const activeSourceIndex = Number(active.dataset.actual);
                this._controller.slideToActualIndex(activeSourceIndex);
                this._syncCarousel.syncControlDone(activeSourceIndex);
            }
        }

    };


}


export default Dragger;
