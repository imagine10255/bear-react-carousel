import {calcMoveTranslatePx} from './utils';
import {TEventMap} from './types';

import Configurator from '../Configurator';
import Elementor from '../Elementor';
import Locator from '../Locator';
import Stater from '../Stater';
import Eventor from '../Eventor';
import {MobileTouchEvent, PointerTouchEvent} from '../../interface/DragEvent';
import logger from '../../logger';
import {logEnable} from '../../config';
import ElState from '../Elementor/ElState';
import {checkIsMobile} from '../../utils';
import {checkLetItGo} from '../Stater/utils';


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
            if(checkIsMobile()){
                this._elementor.containerEl.addEventListener('touchstart', this._onMobileTouchStart, {passive: false});
            }else{
                this._elementor.containerEl.addEventListener('pointerdown', this._onWebMouseStart, {passive: false} as any);
            }
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
            if(checkIsMobile()) {
                this._elementor.containerEl.removeEventListener('touchstart', this._onMobileTouchStart, {passive: false} as any);
            }else{
                this._elementor.containerEl.removeEventListener('pointerdown', this._onWebMouseStart, {passive: false} as any);
            }
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

        event.stopPropagation();

        this._eventor.emit('dragStart');
        const {containerEl} = this._elementor;
        if (containerEl) {

            // 移動到開始位置 避免跳動
            this._locator.touchStart(new MobileTouchEvent(event), containerEl);

            // 設定移動 與 結束事件
            document.addEventListener('touchmove', this._onMobileTouchMove, {passive: false});
            document.addEventListener('touchend', this._onMobileTouchEnd, {passive: false});
        }
    };


    /**
     * Mobile phone finger press and move
     * @param event
     */
    private _onMobileTouchMove = (event: TouchEvent): void => {
        event.stopPropagation();

        const touchEvent = new MobileTouchEvent(event);
        if(this._configurator.setting.isDebug && logEnable.dragger.onMobileTouchMove) logger.printInText('[Dragger._onMobileTouchMove]');

        // 判斷是否手勢斜移，如果斜移禁止滑動
        if (this._locator._letItGo === null) {
            this._locator._letItGo = checkLetItGo({
                x: this._locator.startPosition.pageX,
                y: this._locator.startPosition.pageY,
            },{
                x: touchEvent.pageX,
                y: touchEvent.pageY
            });
        }



        if(this._elementor.containerEl){
            event.preventDefault(); // 開始滑動禁止捲動BodyScroll
            const movePx = this._locator.touchMove(touchEvent, this._elementor.containerEl);
            this._dragMove(movePx.x);
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
        event.stopPropagation();

        this._locator._letItGo = null;
        const {containerEl} = this._elementor;
        if(containerEl){
            document.removeEventListener('touchmove', this._onMobileTouchMove, false);
            document.removeEventListener('touchend', this._onMobileTouchEnd, false);
        }
        this._dragEnd();
    };





    /**
     * Web mouse click
     * @param event
     */
    private _onWebMouseStart = (event: PointerEvent): void => {
        event.preventDefault();
        if(this._configurator.setting.isDebug && logEnable.dragger.onWebMouseStart) logger.printInText('[Dragger._onWebMouseStart]');
        this._eventor.emit('dragStart');

        const {containerEl} = this._elementor;
        if (containerEl) {

            // 移動到開始位置 避免跳動
            this._locator.touchStart(new PointerTouchEvent(event), containerEl);
            const {startPosition} = this._locator;
            const translateX = calcMoveTranslatePx(startPosition.x, event.clientX);
            this._elState
                .transform(translateX, false);

            // 設定移動 與 結束事件
            document.addEventListener('pointermove', this._onWebMouseMove, false);
            document.addEventListener('pointerup', this._onWebMouseEnd, false);
            document.addEventListener('pointercancel', this._onWebMouseEnd, false);
        }

    };


    /**
     * Web mouse movement
     * @param event
     */
    private _onWebMouseMove = (event: PointerEvent):void => {
        event.preventDefault();
        if(this._configurator.setting.isDebug && logEnable.dragger.onWebMouseMove) logger.printInText('[Dragger._onWebMouseMove]');

        if(this._elementor.containerEl){
            this._elementor.containerEl.setPointerCapture(event.pointerId);
            const movePx = this._locator.touchMove(new PointerTouchEvent(event), this._elementor.containerEl);

            this._dragMove(movePx.x);
        }
    };

    /**
     * web mouse release
     * @param event
     */
    private _onWebMouseEnd = (event: PointerEvent):void => {
        event.preventDefault();
        if(this._configurator.setting.isDebug && logEnable.dragger.onWebMouseEnd) logger.printInText('[Dragger._onWebMouseEnd]');

        document.removeEventListener('pointermove', this._onWebMouseMove, false);
        document.removeEventListener('pointerup', this._onWebMouseEnd, false);
        document.removeEventListener('pointercancel', this._onWebMouseEnd, false);
        this._dragEnd();
    };




    private _dragMove(moveX: number) {
        if(this._configurator.setting.isDebug && logEnable.dragger.onDragMove) logger.printInText('[Dragger._dragMove]');

        const {setting} = this._configurator;

        if (this._elementor.containerEl &&
            setting.isEnableMouseMove &&
            this._elementor.slideItemEls &&
            this._stater.page.total > 1
        ) {
            const percentage = this._elState.getMovePercentage(moveX); //TODO: 應該移動到 Positioner

            // 同步控制
            this._eventor.emit('dragMove', percentage);

            this._elState
                .transform(moveX)
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
            const activeVirtual = active?.dataset.virtual ?? this._stater.virtual?.activeIndex ?? 0;
            this._eventor.emit('dragEnd', Number(activeVirtual));
        }
    };


}


export default Dragger;
