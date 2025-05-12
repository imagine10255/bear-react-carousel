import {DragEvent} from '../../interface/DragEvent';
import {ITouchEnd, ITouchStart} from './types';
import {getTranslateParams} from './utils';

const defaultStartPosition: ITouchStart = {
    pageX: 0,
    pageY: 0,
    x: 0,
    y: 0,
    timeStamp: null
};
const defaultEndPosition: ITouchEnd = {
    pageX: 0,
    pageY: 0,
    x: 0,
    y: 0,
    timeStamp: null, // 不使用, 直接 End 使用 Date.now()
    moveX: 0,
    moveY: 0,
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


        this._endPosition = {
            timeStamp: null,
            pageX: dropEvent.pageX,
            pageY: dropEvent.pageY,
            x: x,
            y: y,
            moveX: this._startPosition.pageX - this._startPosition.x,
            moveY: this._startPosition.pageY - this._startPosition.y,
        };
    };

    public touchMove = (dropEvent: DragEvent, containerEl: HTMLDivElement) => {
        const startX = this._startPosition.x;
        this._endPosition.pageX = dropEvent.pageX;

        const startY = this._startPosition.y;
        this._endPosition.pageY = dropEvent.pageY;
        this._endPosition.moveX = this._endPosition.pageX - startX;
        this._endPosition.moveY = this._endPosition.pageY - startY;

        return {
            x: this._endPosition.moveX,
            y: this._endPosition.moveY,
        };
    };
}

export default Locator;
