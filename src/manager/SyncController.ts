import {calcMoveTranslatePx, checkInRange, getNextIndex, getPrevIndex, getSlideIndex} from '../utils';
import Configurator from './Configurator';
import Stater from './Stater';
import elClassName from '../el-class-name';
import Locator from './Locator';
import Elementor from './Elementor';

class SyncController {

    private readonly _configurator: Configurator;
    private readonly _stater: Stater;
    private readonly _locator: Locator;
    private readonly _elementor: Elementor;


    constructor(manager: {
        configurator: Configurator,
        stater: Stater,
        locator: Locator,
        elementor: Elementor,
    }) {
        this._configurator = manager.configurator;
        this._stater = manager.stater;
        this._locator = manager.locator;
        this._elementor = manager.elementor;
    }


    // _syncControlMove = (percentage: number) => {
    //     if(this.props.syncControlRefs?.current){
    //         const syncControl = this.props.syncControlRefs.current;
    //         // 將進度比例換算成 movePx
    //         const moveX = syncControl._getPercentageToMovePx(percentage);
    //         const {slideItemEls} = syncControl._elementor;
    //         const x = slideItemEls[0].clientWidth;
    //
    //         syncControl.positionManager.touchStart({
    //             x: this._configurator.setting.isEnableLoop ? -x : 0,
    //         });
    //
    //         syncControl._elementMove(moveX);
    //     }
    // };
    //
    // _syncControlDone = (targetIndex: number) => {
    //     if(this.props.syncControlRefs?.current){
    //         const syncControl = this.props.syncControlRefs.current;
    //         syncControl.goToActualIndex(targetIndex);
    //     }
    // };

}


export default SyncController;
