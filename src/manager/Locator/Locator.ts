import {ITouchStart} from './types';
import {getTranslateParams} from './utils';
import {DragEvent} from '../../interface/DragEvent';

const defaultPosition: ITouchStart = {
    pageX: 0,
    pageY: 0,
    x: 0,
    y: 0,
};

/**
 * 計算距離位置管理器
 */
class Locator {
    _startPosition = defaultPosition;

    get startPosition(){
        return this._startPosition;
    }

    public touchStart = (dropEvent: DragEvent, containerEl: HTMLDivElement) => {
        const {x} = getTranslateParams(containerEl);
        this._startPosition.x = dropEvent.x - x;
    };

    public touchMove = (dropEvent: DragEvent, containerEl: HTMLDivElement) => {
        return containerEl.offsetLeft + dropEvent.x;
    };
}

export default Locator;
