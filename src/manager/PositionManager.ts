import {ITouchStart} from '../types';


const defaultPosition: ITouchStart = {
    pageX: 0,
    pageY: 0,
    x: 0,
    y: 0,
};

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
}


export default PositionManager;
