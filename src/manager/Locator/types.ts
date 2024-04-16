export enum EDirection {
    vertical= 'vertical',
    horizontal = 'horizontal',
}

export interface ITouchStart {
    pageX: number
    pageY: number
    x: number
    y: number
    timeStamp: number|null
}
export interface ITouchEnd extends ITouchStart{
    moveX: number
    moveY: number
}
