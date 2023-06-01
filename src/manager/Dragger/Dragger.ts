import {calcMoveTranslatePx} from './utils';
import {TEventMap} from './types';

import Configurator from '../Configurator';
import Controller from '../Controller';
import Elementor from '../Elementor';
import Locator from '../Locator';
import Stater from '../Stater';
import SyncCarousel from '../SyncCarousel';
import Eventor from '../Eventor';
import {DesktopTouchEvent, MobileTouchEvent} from '../../interface/DragEvent';


/**
 * unmount 跟 blur 都需要 停止計時器
 */
class Dragger {
    private _configurator: Configurator;
    private _controller: Controller;
    private _elementor: Elementor;
    private _locator: Locator;
    private _stater: Stater;
    private _syncCarousel: SyncCarousel;
    private _eventor = new Eventor<TEventMap>();


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


    onDrapStart = (callBack?: TEventMap['dragStart']) => {
        this._elementor.containerEl.addEventListener('touchstart', this._onMobileTouchStart, {passive: false});
        this._elementor.containerEl.addEventListener('mousedown', this._onWebMouseStart, {passive: false});

        this._eventor.on('dragStart', callBack);
    };

    onDragEnd = (callBack?: TEventMap['dragEnd']) => {
        this._eventor.on('dragEnd', callBack);
    };

    offDrapStart = () => {
        this._elementor.containerEl.removeEventListener('touchstart', this._onMobileTouchStart, {passive: false} as any);
        this._elementor.containerEl.removeEventListener('mousedown', this._onWebMouseStart, {passive: false} as any);
        this._eventor.off('dragStart');
    };

    offDragEnd = () => {
        this._eventor.off('dragEnd');
    };


    /**
     * mobile phone finger press start
     * @param event
     */
    private _onMobileTouchStart = (event: TouchEvent): void => {
        // if(this.props.isDebug && logEnable.onMobileTouchStart) log.printInText('[_onMobileTouchStart]');

        this._eventor.emit('dragStart');

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
    private _onMobileTouchMove = (event: TouchEvent): void => {
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
    private _onMobileTouchEnd = (event: TouchEvent): void => {
        // if(this.props.isDebug && logEnable.onMobileTouchEnd) log.printInText('[_onMobileTouchEnd]');

        this._elementor.containerEl?.removeEventListener('touchmove', this._onMobileTouchMove, false);
        this._elementor.containerEl?.removeEventListener('touchend', this._onMobileTouchEnd, false);
        this._dragEnd();
        this._eventor.emit('dragEnd');
    };

    /**
     * Web mouse click
     * @param event
     */
    private _onWebMouseStart = (event: MouseEvent): void => {
        // if(this.props.isDebug && logEnable.onWebMouseStart) log.printInText('[_onWebMouseStart]');
        this._eventor.emit('dragStart');

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
    private _onWebMouseMove = (event: MouseEvent):void => {
        event.preventDefault();
        // if(this.props.isDebug && logEnable.onWebMouseMove) log.printInText('[_onWebMouseMove]');

        const movePx = this._locator.touchMove(new DesktopTouchEvent(event), this._elementor.containerEl);
        this._dragMove(movePx);
    };

    /**
     * web mouse release
     * @param event
     */
    private _onWebMouseEnd = (event: MouseEvent):void => {
        event.preventDefault();
        // if(this.props.isDebug && logEnable.onWebMouseEnd) log.printInText('[_onWebMouseEnd]');

        this._elementor.rootEl?.removeEventListener('mouseleave', this._onWebMouseEnd, false);
        this._elementor.containerEl?.removeEventListener('mousemove', this._onWebMouseMove, false);
        this._elementor.containerEl?.removeEventListener('mouseup', this._onWebMouseEnd, false);
        this._dragEnd();
        this._eventor.emit('dragEnd');
    };




    private _dragMove(moveX: number) {
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
    private _dragEnd = (): void => {
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
