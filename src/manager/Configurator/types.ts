import {IBreakpointSetting, TSlidesPerViewActual} from '../../types';

export interface ISetting extends IBreakpointSetting {
    slidesPerViewActual?: TSlidesPerViewActual
    moveTime?: number,
    defaultActivePage?: number,
    autoPlayTime?: number,
    isDebug?: boolean,
}
