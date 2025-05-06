import CSS from 'csstype';
import {CSSProperties, forwardRef, ReactNode} from 'react';

import styles from '../../styles.module.scss';
import {ISetting} from '../../types';
import {booleanToDataAttr} from '../../utils';


interface IProps {
    style?: CSS.Properties
    className?: string
    setting?: ISetting
    children?: ReactNode
    extendStyle?: CSSProperties
    isDebug?: boolean
    isEnableGpuRender?: boolean
}

const CarouselRoot = forwardRef<HTMLDivElement, IProps>(({
    style,
    className,
    setting,
    isDebug= false,
    extendStyle,
    isEnableGpuRender = true,
    children,
}, ref) => {

    return <div
        ref={ref}
        data-testid="acrool-carousel"
        style={{
            ...style,
            ...extendStyle,
        }}
        className={[className, styles.root].join(' ').trim()}
        data-gpu-render={booleanToDataAttr(isEnableGpuRender)}
        data-per-view-auto={booleanToDataAttr(setting?.slidesPerView === 'auto')}
        data-mouse-move={booleanToDataAttr(setting?.isEnableMouseMove ?? false)}
        // data-actual={[actual.minIndex, actual.firstIndex, actual.lastIndex, actual.maxIndex].join(' / ')}
        data-debug={booleanToDataAttr(isDebug)}
    >
        {children}
    </div>;
});


export default CarouselRoot;
