import {EHorizontal, ITouchStart} from './types';
import {getSlideAngle, getTranslateParams} from './utils';
import {DragEvent} from '../../interface/DragEvent';

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

    get startPosition(){
        return this._startPosition;
    }

    public touchStart = (dropEvent: DragEvent, containerEl: HTMLDivElement) => {
        const {x} = getTranslateParams(containerEl);
        this._startPosition.x = dropEvent.x - x;
    };

    public touchMove = (dropEvent: DragEvent, containerEl: HTMLDivElement) => {
        return containerEl.offsetLeft + dropEvent.x;
    };

    /**
     * 根據起點和終點的返回方向
     *
     * 不能用於鎖定, 因為不滑動的會有2的判定
     *
     * @return 1:向上, 2:向下, 3:向左, 4:向右, 0:未移動
     * @param moveX
     */
    getSlideDirection(moveX: number): EHorizontal|undefined{
        const startY = 0;
        const endY = 0;
        const dy = startY - endY;
        const dx = moveX - this.startPosition.pageX;

        //如果滑動距離太短
        if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
            return undefined;
        }
        const angle = getSlideAngle(dx, dy);
        if (angle >= -45 && angle < 45) {
            // 向右
            return EHorizontal.right;
        } else if (angle >= 45 && angle < 135) {
            // 向上
            return EHorizontal.right;
        } else if (angle >= -135 && angle < -45) {
            // 向下
            return EHorizontal.left;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            // 向左
            return EHorizontal.left;
        }
        return undefined;
    }
}

export default Locator;
