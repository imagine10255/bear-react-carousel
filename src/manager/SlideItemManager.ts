import {IBreakpointSettingActual} from '../types';
import {getMediaInfo} from '../utils';
import SlideSettingManager from './SlideSettingManager';

class SlideItemManager {
    private _slideSettingManager: SlideSettingManager;

    constructor(slideSettingManager: SlideSettingManager) {
        this._slideSettingManager = slideSettingManager;
    }

    // get info() {
    //     return this._setting;
    // }
    //
    // setSetting(setting: IBreakpointSettingActual) {
    //     this._setting = setting;
    // }
}


export default SlideItemManager;
