import Configurator from '../Configurator';
import Eventor from '../Eventor';
import {TEventMap} from './types';
import {logEnable} from '../../config';
import logger from '../../logger';

/**
 * unmount 跟 blur 都需要 停止計時器
 */
class AutoPlayer {
    private _configurator: Configurator;
    private _timer: NodeJS.Timeout;
    private _eventor = new Eventor<TEventMap>();

    get isPlaying(){
        return this._timer;
    }

    constructor(manager: {
        configurator: Configurator,
    }) {
        this._configurator = manager.configurator;
    }

    onTimeout = (callback: TEventMap['timeout']) => {
        window.addEventListener('focus', this.play, false);
        window.addEventListener('blur', this.pause, false);

        this.play();
        this._eventor.on('timeout', callback);
    };


    /**
     * 完全移除
     */
    offTimeout = () => {
        window.removeEventListener('focus', this.play, false);
        window.removeEventListener('blur', this.pause, false);

        this.pause();
        this._eventor.off('timeout');
    };

    play = () => {
        const {setting} = this._configurator;
        if(setting.isDebug && logEnable.autoPlayer.play) logger.printInText('[AutoPlayer.play]');

        if(!this.isPlaying && setting.isEnableAutoPlay && setting.autoPlayTime > 0){

            this._timer = setInterval(() => {
                this._eventor.emit('timeout');
            }, setting.autoPlayTime);
        }
    };

    pause = () => {
        if(this._configurator.setting.isDebug && logEnable.autoPlayer.play) logger.printInText('[AutoPlayer.pause]');

        clearInterval(this._timer);
        this._timer = null;
    };
}


export default AutoPlayer;
