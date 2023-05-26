import {ITouchStart} from '../types';
import DragEvent from './DragEvent';
import {getMoveDistance, getStartPosition} from '../utils';


const defaultPosition: ITouchStart = {
    pageX: 0,
    pageY: 0,
    x: 0,
    y: 0,
};


/**
 * 計算距離位置管理器
 */
class PositionManager {
    _startPosition = defaultPosition;
    translateX: 0;
    percentage: 0;

    get startPosition(){
        return this._startPosition;
    }

    public touchStart(startPosition: Partial<ITouchStart>){
        this._startPosition = {...defaultPosition, ...startPosition};
    }

    public touchStart2(dropEvent: DragEvent){
        this._startPosition.x = dropEvent.x;
    }



}


export default PositionManager;
