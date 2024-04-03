export interface DragEvent {
    x: number,
    endX: number, // 從文檔（即整個網頁）的左上角開始，到觸摸點的水平（x軸）距離。這個值包括了當前頁面已滾動的距離。即使頁面滾動，這個值也會隨著變化。
    endY: number,
}



/**
 * 桌面/移動 瀏覽器觸控事件
 */
export class PointerTouchEvent implements DragEvent{
    _event: PointerEvent;

    get x(){
        return this._event.clientX;
    }

    get endX(){
        return this._event.clientX;
    }
    get endY(){
        return this._event.pageY;
    }

    constructor(event: PointerEvent) {
        this._event = event;
    }
}




