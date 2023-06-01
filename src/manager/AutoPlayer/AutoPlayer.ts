import Configurator from '../Configurator';
import Controller from '../Controller';
import Dragger from '../Dragger';

/**
 * unmount 跟 blur 都需要 停止計時器
 */
class AutoPlayer {
    private _configurator: Configurator;
    private _controller: Controller;
    private _dragger: Dragger;
    private _timer: NodeJS.Timeout;

    get isPlaying(){
        return this._timer;
    }

    constructor(manager: {
        configurator: Configurator,
        controller: Controller,
        dragger: Dragger,
    }) {
        this._configurator = manager.configurator;
        this._controller = manager.controller;
        this._dragger = manager.dragger;
    }

    onTimeout = () => {
        window.addEventListener('focus', this.play, false);
        window.addEventListener('blur', this.pause, false);

        this._controller.onSlideBefore(this.pause);
        this._controller.onSlideAfter(this.play);
        this._dragger.onDrapStart(this.pause);

        this.play();
    };


    /**
     * 完全移除
     */
    offTimeout = () => {
        window.removeEventListener('focus', this.play, false);
        window.removeEventListener('blur', this.pause, false);
        this._controller.offSlideBefore();
        this._controller.offSlideAfter();
        this._dragger.offDrapStart();

        this.pause();
    };

    play = () => {
        const {setting} = this._configurator;

        if(!this.isPlaying && setting.isEnableAutoPlay && setting.autoPlayTime > 0){
            this._timer = setInterval(() => {
                this._controller.slideToNextPage();
            }, setting.autoPlayTime);
        }
    };

    pause = () => {
        clearInterval(this._timer);
        this._timer = null;
    };
}


export default AutoPlayer;
