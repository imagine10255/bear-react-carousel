import {IBreakpointSetting, TSlidesPerViewActual} from '../../types';

export interface ISetting extends IBreakpointSetting {
    slidesPerViewActual?: TSlidesPerViewActual
    moveTime?: number,
    autoPlayTime?: number,
    initStartPlayTime?: number,
    isDebug?: boolean,
}
