import Configurator from './Configurator';
import Controller from './Controller';


/**
 * unmount 跟 blur 都需要 停止計時器
 */
class AutoPlayer {
    _configurator: Configurator;
    _controller: Controller;
    _timer: NodeJS.Timeout;
    boundPlay: () => void;
    boundPause: () => void;

    get isPlaying(){
        return this._timer;
    }

    constructor(manager: {
        configurator: Configurator,
        controller: Controller,
    }) {
        this._configurator = manager.configurator;
        this._controller = manager.controller;

        this.boundPlay = this.play.bind(this, this._configurator);
        this.boundPause = this.pause.bind(this, this._configurator);
    }

    mount(){
        window.addEventListener('focus', this.boundPlay, false);
        window.addEventListener('blur', this.boundPause, false);

        this.play();
    }

    /**
     * 完全移除
     */
    unmount(){
        window.removeEventListener('focus', this.boundPlay, false);
        window.removeEventListener('blur', this.boundPause, false);

        this.pause();
    }

    play(){
        const {setting} = this._configurator;

        if(this.isPlaying || setting.isEnableAutoPlay || setting.autoPlayTime <= 0){
            return;
        }

        this._timer = setInterval(() => {
            this._controller.slideToNextPage();
        }, setting.autoPlayTime);
    }

    pause(){
        clearInterval(this._timer);
        this._timer = null;
    }
}


export default AutoPlayer;
