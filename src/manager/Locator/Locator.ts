import {ITouchStart} from './types';
import {getTranslateParams} from './utils';
import {DragEvent} from '../../interface/DragEvent';

const defaultStartPosition: ITouchStart = {
    pageX: 0,
    pageY: 0,
    x: 0,
    y: 0,
    timeStamp: null
};
const defaultEndPosition: ITouchStart = {
    pageX: 0,
    pageY: 0,
    x: 0,
    y: 0,
    timeStamp: null // 不使用, 直接 End 使用 Date.now()
};

/**
 * 計算距離位置管理器
 */
class Locator {
    _startPosition = defaultStartPosition;
    _endPosition = defaultEndPosition;
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

        this._startPosition.timeStamp = Date.now();
    };

    public touchMove = (dropEvent: DragEvent, containerEl: HTMLDivElement) => {
        const startX = this._startPosition.x;
        this._endPosition.pageX = dropEvent.pageX;

        const startY = this._startPosition.y;
        this._endPosition.pageY = dropEvent.pageY;

        return {
            x: this._endPosition.pageX - startX,
            y: this._endPosition.pageY - startY,
        };
    };
}

export default Locator;
