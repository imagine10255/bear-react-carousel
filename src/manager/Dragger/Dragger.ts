import Configurator from '../Configurator';
import Controller from '../Controller';
import {EDevice} from '../../types';
import Elementor from '../Elementor';
import {DesktopTouchEvent, MobileTouchEvent} from '../../interface/DragEvent';
import Locator from '../Locator';
import {calcMoveTranslatePx, checkInRange} from '../../utils';
import Stater from '../Stater';
import SyncCarousel from '../SyncCarousel';


type DragEvent = 'dragStart'|'dragDone';
type TCallback = () => void;
/**
 * unmount 跟 blur 都需要 停止計時器
 */
class Dragger {
    _configurator: Configurator;
    _controller: Controller;
    _elementor: Elementor;
    _locator: Locator;
    _stater: Stater;
    _syncCarousel: SyncCarousel;

    private events: Map<string, TCallback[]> = new Map();

    constructor(manager: {
        configurator: Configurator,
        controller: Controller,
        elementor: Elementor,
        stater: Stater,
        locator: Locator,
        syncCarousel: SyncCarousel,
    }) {
        this._configurator = manager.configurator;
        this._controller = manager.controller;
        this._elementor = manager.elementor;
        this._elementor = manager.elementor;
        this._stater = manager.stater;
        this._locator = manager.locator;
        this._syncCarousel = manager.syncCarousel;

    }

    on(eventName: DragEvent, callback: TCallback) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName).push(callback);
    }

    off(eventName: DragEvent, callback: TCallback) {
        if (this.events.has(eventName)) {
            const callbacks = this.events.get(eventName);
            const idx = callbacks.indexOf(callback);
            if (idx >= 0) {
                callbacks.splice(idx, 1);
            }
        }
    }

    emit(eventName: DragEvent) {
        if (this.events.has(eventName)) {
            for (const callback of this.events.get(eventName)) {
                callback();
            }
        }
    }

    mount = () => {
        this._elementor.containerEl.addEventListener('touchstart', this._onMobileTouchStart, {passive: false});
        this._elementor.containerEl.addEventListener('mousedown', this._onWebMouseStart, {passive: false});
    };

    /**
     * 完全移除
     */
    unmount = () => {
        this._elementor.containerEl.removeEventListener('touchstart', this._onMobileTouchStart, {passive: false} as any);
        this._elementor.containerEl.removeEventListener('mousedown', this._onWebMouseStart, {passive: false} as any);
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

        this._elementor.containerEl?.removeEventListener('touchmove', this._onMobileTouchMove, false);
        this._elementor.containerEl?.removeEventListener('touchend', this._onMobileTouchEnd, false);
        this._dragDone();
        this.emit('dragDone');
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
