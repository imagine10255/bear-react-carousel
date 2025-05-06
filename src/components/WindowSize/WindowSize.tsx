import elClassName from '../../el-class-name';

interface IProps {
    size: number
}

/**
 * 顯示螢幕尺寸
 * @param size
 * @constructor
 */
const WindowsSize = ({
    size = 0,
}: IProps) => {
    return <div
        data-testid="bear-carousel-windowSize"
        className={elClassName.testWindowSize}
    >
        {size}
    </div>;
};


export default WindowsSize;
