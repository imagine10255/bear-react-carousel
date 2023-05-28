import Configurator from './Configurator';
import Controller from './Controller';
import {EDevice} from '../types';
import Elementor from './Elementor';
import log from '../log';
import {DesktopTouchEvent, MobileTouchEvent} from '../interface/DragEvent';
import AutoPlayer from './AutoPlayer';
import Locator from './Locator';


/**
 * unmount 跟 blur 都需要 停止計時器
 */
class Dragger {
    _configurator: Configurator;
    _controller: Controller;
    _elementor: Elementor;
    _autoPlayer: AutoPlayer;
    _locator: Locator;
    _device: EDevice;


    constructor(manager: {
        configurator: Configurator,
        controller: Controller,
        elementor: Elementor,
        autoPlayer: AutoPlayer,
        locator: Locator,
    }, device: EDevice) {
        this._configurator = manager.configurator;
        this._controller = manager.controller;
        this._elementor = manager.elementor;
        this._autoPlayer = manager.autoPlayer;
        this._locator = manager.locator;

        this._device = device;
    }

    mount(){
        switch (this._device){
        case EDevice.mobile:
            this._elementor.containerEl.addEventListener('touchstart', this._onMobileTouchStart, {passive: false});
            break;
        case EDevice.desktop:
            this._elementor.containerEl.addEventListener('mousedown', this._onWebMouseStart, {passive: false});
            break;
        }
    }

    /**
     * 完全移除
     */
    unmount(){
        switch (this._device){
        case EDevice.mobile:
            this._elementor.containerEl.removeEventListener('touchstart', this._onMobileTouchStart, {passive: false} as any);
            break;
        case EDevice.desktop:
            this._elementor.containerEl.removeEventListener('mousedown', this._onWebMouseStart, {passive: false} as any);
            break;
        }
    }




    /**
     * mobile phone finger press start
     * @param event
     */
    _onMobileTouchStart = (event: TouchEvent): void => {
        // if(this.props.isDebug && logEnable.onMobileTouchStart) log.printInText('[_onMobileTouchStart]');

        this._autoPlayer.pause();

        const {containerEl} = this._elementor;
        if(containerEl?.style.transitionDuration === '0ms'){
            this._controller.slideResetToMatchIndex();
            this._locator.touchStart2(new MobileTouchEvent(event), containerEl);

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
        this._controller.dragMove(movePx);
    };

    /**
     * Mobile phone finger press to end
     * @param event
     *
     * PS: Add event.preventDefault(); will affect the mobile phone click onClick event
     */
    _onMobileTouchEnd = (event: TouchEvent): void => {
        // if(this.props.isDebug && logEnable.onMobileTouchEnd) log.printInText('[_onMobileTouchEnd]');

        this._elementor.containerEl?.removeEventListener('touchmove', this._onMobileTouchMove, false);
        this._elementor.containerEl?.removeEventListener('touchend', this._onMobileTouchEnd, false);
        this._controller.dragDone();
        this._autoPlayer.play();
    };

    /**
     * Web mouse click
     * @param event
     */
    _onWebMouseStart = (event: MouseEvent): void => {
        // if(this.props.isDebug && logEnable.onWebMouseStart) log.printInText('[_onWebMouseStart]');

        this._autoPlayer.pause();
        this._controller.slideResetToMatchIndex();

        const {containerEl} = this._elementor;
        if (containerEl) {
            this._locator.touchStart2(new DesktopTouchEvent(event), containerEl);

            // if(this.resetDurationTimer) clearTimeout(this.resetDurationTimer);

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
        console.log('_onWebMouseMove');

        const movePx = this._locator.touchMove(new DesktopTouchEvent(event), this._elementor.containerEl);
        this._controller.dragMove(movePx);
    };

    /**
     * web mouse release
     * @param event
     */
    _onWebMouseEnd = (event: MouseEvent):void => {
        event.preventDefault();
        // if(this.props.isDebug && logEnable.onWebMouseEnd) log.printInText('[_onWebMouseEnd]');
console.log('_onWebMouseEnd');

        this._elementor.rootEl?.removeEventListener('mouseleave', this._onWebMouseEnd, false);
        this._elementor.containerEl?.removeEventListener('mousemove', this._onWebMouseMove, false);
        this._elementor.containerEl?.removeEventListener('mouseup', this._onWebMouseEnd, false);
        this._controller.dragDone();
        this._autoPlayer.play();
    };
}


export default Dragger;
