import {EDirection, ITouchStart} from '../types';
import {DragEvent} from '../interface/DragEvent';
import {getSlideDirection, getTranslateParams} from '../utils';


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
    translateX: 0;
    percentage: 0;
    moveDirection: EDirection|undefined;

    get startPosition(){
        return this._startPosition;
    }

    public touchStart(startPosition: Partial<ITouchStart>){
        this._startPosition = {...defaultPosition, ...startPosition};
    }

    public touchStart2(dropEvent: DragEvent, containerEl: HTMLDivElement){
        const {x} = getTranslateParams(containerEl);
        this._startPosition.x = dropEvent.x - x;
    }

    public touchMove(dropEvent: DragEvent, containerEl: HTMLDivElement){
        const {endX, endY} = dropEvent;

        this.moveDirection = getSlideDirection(this.startPosition.x, this.startPosition.y, endX, endY);
        // if(this.props.isDebug && logEnable.onMobileTouchMove) log.printInText(`[_onMobileTouchMove] ${startPosition.moveDirection}`);

        // 水平移動
        // if(this.moveDirection === EDirection.horizontal){
        return containerEl.offsetLeft + dropEvent.x;
        // }
        return 0;
    }



}


export default Locator;
