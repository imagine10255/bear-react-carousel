import Configurator from './Configurator';
import Controller from './Controller';

class AutoPlayer {
    _configurator: Configurator;
    _controller: Controller;
    _timer: NodeJS.Timeout;


    constructor(configurator: Configurator, controller: Controller) {
        this._configurator = configurator;
        this._controller = controller;
    }

    play(){
        const {setting} = this._configurator;

        if(this._timer || setting.autoPlayTime <= 0){
            return;
        }

        this._timer = setInterval(() => {
            this._controller.slideToNextPage();
        }, setting.autoPlayTime);
    }

    pause(){
        console.log('pause');
        clearInterval(this._timer);
        this._timer = null;
    }

}


export default AutoPlayer;
