export interface DragEvent {
    x: number,
    pageX: number,
    pageY: number,

    endX: number, // 從文檔（即整個網頁）的左上角開始，到觸摸點的水平（x軸）距離。這個值包括了當前頁面已滾動的距離。即使頁面滾動，這個值也會隨著變化。
    endY: number,
}


/**
 * 手機瀏覽器觸控事件
 */
export class MobileTouchEvent implements DragEvent{
    _event: TouchEvent;

    get x(){
        // const {x} = getTranslateParams(this._containerEl);
        // return this._event.targetTouches[0].pageX - x;
        return this._event.targetTouches[0].clientX ?? 0;
    }

    get pageX(){
        return this._event.touches[0].pageX ?? 0;
    }
    get pageY(){
        return this._event.touches[0].pageY ?? 0;
    }

    get endX(){
        return this._event.touches[0].pageX ?? 0;
    }
    get endY(){
        return this._event.touches[0].pageY ?? 0;
    }

    constructor(event: TouchEvent) {
        this._event = event;
    }
}

/**
 * 桌面瀏覽器觸控事件
 */
export class DesktopTouchEvent implements DragEvent{
    // _containerEl: HTMLElement;
    _event: MouseEvent;

    get x(){
        // const {x} = getTranslateParams(this._containerEl);
        // return this._event.clientX - x;
        return this._event.clientX;
    }

    get pageX(){
        return this._event.pageX;
    }
    get pageY(){
        return this._event.pageY;
    }

    get endX(){
        return this._event.clientX;
    }
    get endY(){
        return this._event.pageY;
    }

    constructor(event: MouseEvent) {
        this._event = event;
    }
}




