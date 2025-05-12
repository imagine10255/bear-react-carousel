import styles from '../../styles.module.scss';

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
        data-testid="acrool-carousel-windowSize"
        className={styles.windowSize}
    >
        {size}
    </div>;
};


export default WindowsSize;
