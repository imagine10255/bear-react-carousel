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
import ElState from '../Elementor/ElState';


/**
 * 托動控制器
 * unmount 跟 blur 都需要 停止計時器
 */
class Dragger {
    private _configurator: Configurator;
    private _elementor: Elementor;
    private _elState: ElState;
    private _locator: Locator;
    private _stater: Stater;
    private _eventor = new Eventor<TEventMap>();


    constructor(manager: {
        configurator: Configurator,
        elementor: Elementor,
        elState: ElState,
        stater: Stater,
    }) {
        this._configurator = manager.configurator;
        this._elementor = manager.elementor;
        this._elState = manager.elState;
        this._stater = manager.stater;
        this._locator = new Locator();
    }


    onDragStart = (callBack?: TEventMap['dragStart']) => {
        if(this._elementor.containerEl){
            this._elementor.containerEl.addEventListener('touchstart', this._onMobileTouchStart, {passive: false});
            this._elementor.containerEl.addEventListener('mousedown', this._onWebMouseStart, {passive: false});
        }

        this._eventor.on('dragStart', callBack);
    };

    onDragMove = (callBack?: TEventMap['dragMove']) => {
        this._eventor.on('dragMove', callBack);
    };

    onDragEnd = (callBack?: TEventMap['dragEnd']) => {
        this._eventor.on('dragEnd', callBack);
    };

    offDragStart = (callBack?: TEventMap['dragStart']) => {
        if(this._elementor.containerEl){
            this._elementor.containerEl.removeEventListener('touchstart', this._onMobileTouchStart, {passive: false} as any);
            this._elementor.containerEl.removeEventListener('mousedown', this._onWebMouseStart, {passive: false} as any);
        }

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
            window.addEventListener('touchmove', this._onMobileTouchMove, {passive: false});
            window.addEventListener('touchend', this._onMobileTouchEnd, {passive: false});
        }
    };



    /**
     * Mobile phone finger press and move
     * @param event
     */
    private _onMobileTouchMove = (event: TouchEvent): void => {
        event.preventDefault();
        if(this._configurator.setting.isDebug && logEnable.dragger.onMobileTouchMove) logger.printInText('[Dragger._onMobileTouchMove]');

        if(this._elementor.containerEl){
            const movePx = this._locator.touchMove(new MobileTouchEvent(event), this._elementor.containerEl);
            this._dragMove(movePx);
        }
    };

    /**
     * Mobile phone finger press to end
     * @param event
     *
     * PS: Add event.preventDefault(); will affect the mobile phone click onClick event
     */
    private _onMobileTouchEnd = (event: TouchEvent): void => {
        if(this._configurator.setting.isDebug && logEnable.dragger.onMobileTouchEnd) logger.printInText('[Dragger._onMobileTouchEnd]');

        window.removeEventListener('touchmove', this._onMobileTouchMove, false);
        window.removeEventListener('touchend', this._onMobileTouchEnd, false);
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
            window.addEventListener('mousemove', this._onWebMouseMove, false);
            window.addEventListener('mouseup', this._onWebMouseEnd, false);
        }

    };


    /**
     * Web mouse movement
     * @param event
     */
    private _onWebMouseMove = (event: MouseEvent):void => {
        event.preventDefault();
        if(this._configurator.setting.isDebug && logEnable.dragger.onWebMouseMove) logger.printInText('[Dragger._onWebMouseMove]');

        if(this._elementor.containerEl){
            const movePx = this._locator.touchMove(new DesktopTouchEvent(event), this._elementor.containerEl);
            this._dragMove(movePx);
        }
    };

    /**
     * web mouse release
     * @param event
     */
    private _onWebMouseEnd = (event: MouseEvent):void => {
        event.preventDefault();
        if(this._configurator.setting.isDebug && logEnable.dragger.onWebMouseEnd) logger.printInText('[Dragger._onWebMouseEnd]');

        window.removeEventListener('mousemove', this._onWebMouseMove, false);
        window.removeEventListener('mouseup', this._onWebMouseEnd, false);
        this._dragEnd();
    };




    private _dragMove(moveX: number) {
        if(this._configurator.setting.isDebug && logEnable.dragger.onDragMove) logger.printInText('[Dragger._dragMove]');

        this._elState.setTouching(true);

        const {startPosition} = this._locator;
        const {setting} = this._configurator;

        if (this._elementor.containerEl &&
            setting.isEnableMouseMove &&
            this._elementor.slideItemEls &&
            this._stater.page.total > 1
        ) {
            const translateX = calcMoveTranslatePx(startPosition.x, moveX);
            const percentage = this._elState.getMovePercentage(translateX); //TODO: 應該移動到 Positioner

            // 同步控制
            this._eventor.emit('dragMove', percentage);

            this._elState
                .transform(translateX)
                .moveEffect(percentage)
                .syncActiveState(Math.round(percentage));
        }
    }



    /**
     * The object movement ends (confirm the stop position and which Index position should be sucked)
     */
    private _dragEnd = (): void => {
        if(this._configurator.setting.isDebug && logEnable.dragger.onDragEnd) logger.printInText('[Dragger._dragEnd]');
        this._elState.setTouching(false);

        if(this._elementor.slideItemEls){
            const active = this._elementor.slideItemEls.find(row => row.dataset.active === '');
            this._eventor.emit('dragEnd', Number(active?.dataset.virtual ?? 0));
        }
    };


}


export default Dragger;
