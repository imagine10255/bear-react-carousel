export interface DragEvent {
    x: number,
    y: number,

    pageX: number,
    pageY: number,


}


/**
 * 手機瀏覽器觸控事件
 */
export class MobileTouchEvent implements DragEvent{
    _event: TouchEvent;

    get x(){
        return this._event.targetTouches[0].clientX ?? 0;
    }
    get y(){
        return this._event.targetTouches[0].clientY ?? 0;
    }

    get pageX(){
        return this._event.touches[0].pageX ?? 0;
    }
    get pageY(){
        return this._event.touches[0].pageY ?? 0;
    }



    constructor(event: TouchEvent) {
        this._event = event;
    }
}

/**
 * 桌面 瀏覽器觸控事件
 */
export class PointerTouchEvent implements DragEvent{
    _event: PointerEvent;

    get x(){
        return this._event.clientX;
    }
    get y(){
        return this._event.clientY;
    }

    get pageX(){
        return this._event.pageX;
    }
    get pageY(){
        return this._event.pageY;
    }


    constructor(event: PointerEvent) {
        this._event = event;
    }
}




