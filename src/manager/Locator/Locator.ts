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
    _letItGo: boolean|null = null;

    get startPosition(){
        return this._startPosition;
    }

    public touchStart = (dropEvent: DragEvent, containerEl: HTMLDivElement) => {
        const {x, y} = getTranslateParams(containerEl);
        this._startPosition.x = dropEvent.pageX - x;
        this._startPosition.y = dropEvent.pageY - y;

        this._startPosition.pageX = dropEvent.pageX;
        this._startPosition.pageY = dropEvent.pageY;
    };

    public touchMove = (dropEvent: DragEvent, containerEl: HTMLDivElement) => {
        const startX = this._startPosition.x;
        const moveX = dropEvent.pageX;

        const startY = this._startPosition.y;
        const moveY = dropEvent.pageY;
        return {
            x: moveX - startX,
            y: moveY - startY,

        };
    };
}

export default Locator;
