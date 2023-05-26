import SlideSettingManager from './SlideSettingManager';
import Controller from './Controller';

class AutoPlayer {

    _setter: SlideSettingManager;
    _controller: Controller;
    _timer: NodeJS.Timeout;

    autoPlayTime = 300;

    constructor(setter: SlideSettingManager, controller: Controller) {
        this._setter = setter;
        this._controller = controller;
    }



    play(){
        this._timer = setTimeout(() => {
            this._controller.slideToNextPage();
        }, this.autoPlayTime);
    }
}


export default AutoPlayer;
