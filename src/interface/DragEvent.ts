export interface DragEvent {
    pageX: number
    pageY: number

    timeStamp: number | null
}


/**
 * 手機瀏覽器觸控事件
 */
export class MobileTouchEvent implements DragEvent{
    _event: TouchEvent;

    get pageX(){
        return this._event.touches[0].pageX ?? 0;
    }
    get pageY(){
        return this._event.touches[0].pageY ?? 0;
    }
    get timeStamp(){
        return this._event.timeStamp;
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

    get pageX(){
        return this._event.pageX;
    }
    get pageY(){
        return this._event.pageY;
    }

    get timeStamp(){
        return this._event.timeStamp;
    }

    constructor(event: PointerEvent) {
        this._event = event;
    }
}




