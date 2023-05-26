import {getTranslateParams} from '../utils';


interface DragEvent {
    x: number,
}

export class MobileTouchEvent implements DragEvent{
    _containerEl: HTMLElement;
    _event: TouchEvent;

    constructor(event: TouchEvent, containerEl: HTMLElement) {
        this._containerEl = containerEl;
        this._event = event;
    }

    get x(){
        const {x} = getTranslateParams(this._containerEl);
        return this._event.targetTouches[0].pageX - x;
    }


    // init(event){
    //     this.positionManager.touchStart({
    //         pageX: event.targetTouches[0].pageX,
    //         pageY: event.targetTouches[0].pageY,
    //         x: event.targetTouches[0].pageX - movePosition.x,
    //         y: event.targetTouches[0].pageY - containerEl.offsetTop,
    //     });
    //
    //     const endX = event.targetTouches[0].clientX;
    //     const endY = event.targetTouches[0].pageY;
    //     const pageX = event.targetTouches[0].pageX;
    // }

}


export class DesktopTouchEvent {
    _containerEl: HTMLElement;
    _event: MouseEvent;

    get x(){
        const {x} = getTranslateParams(this._containerEl);
        return this._event.clientX - x;
    }

    constructor(event: MouseEvent, containerEl: HTMLElement) {
        this._containerEl = containerEl;
        this._event = event;
    }


    // init(event: MouseEvent){
    //     this.positionManager.touchStart({
    //         pageX: event.clientX,
    //         pageY: event.clientY,
    //         x: event.clientX - movePosition.x,
    //         y: event.clientY - containerEl.offsetTop,
    //     });
    //
    //     const moveX = event.clientX;
    // }


}




export default DragEvent;
