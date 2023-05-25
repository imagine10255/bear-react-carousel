import {IPropsBreakpoints} from '../types';
import {getSizeByRange} from '../utils';

class WindowSizeCalculator {
    private _breakpoints: IPropsBreakpoints;

    constructor(breakpoints: IPropsBreakpoints) {
        this._breakpoints = breakpoints;
    }

    private calculateSize() {
        return getSizeByRange(window.innerWidth, Object.keys(this._breakpoints).map(Number));
    }

    get size() {
        return this.calculateSize();
    }
}


export default WindowSizeCalculator;
