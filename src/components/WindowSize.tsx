import * as React from 'react';
import elClassName from '../el-class-name';

interface IProps {
    size: number,
}

/**
 * 顯示螢幕尺寸
 * @param size
 * @constructor
 */
const WindowsSize = ({
    size = 0,
}: IProps) => {
    return <div className={elClassName.testWindowSize}>
        {size}
    </div>;
};


export default WindowsSize;
