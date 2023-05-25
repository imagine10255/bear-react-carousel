import {ITouchStart} from './types';


class Position {
    _startPosition: ITouchStart = {
        pageX: 0,
        pageY: 0,
        x: 0,
        y: 0,
    };
    translateX: 0;
    percentage: 0;

    get startPosition(){
        return this._startPosition;
    }

    public touchStart(startPosition: ITouchStart){
        this._startPosition = startPosition;
    }
}



export default Position;
