import {forwardRef, CSSProperties} from 'react';
import elClassName from '../../el-class-name';
import {booleanToDataAttr} from '../../utils';
import CSS from 'csstype';
import {ISetting} from '../../types';


interface IProps {
    style: CSS.Properties
    className: string
    setting?: ISetting
    children?: JSX.Element | JSX.Element[]
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
        data-testid="bear-carousel"
        style={{
            ...style,
            ...extendStyle,
        }}
        className={[className, elClassName.root].join(' ').trim()}
        data-gpu-render={booleanToDataAttr(isEnableGpuRender)}
        data-per-view-auto={booleanToDataAttr(setting?.slidesPerView === 'auto')}
        data-mouse-move={booleanToDataAttr(setting?.isEnableMouseMove)}
        // data-actual={[actual.minIndex, actual.firstIndex, actual.lastIndex, actual.maxIndex].join(' / ')}
        data-debug={booleanToDataAttr(isDebug)}
    >
        {children}
    </div>;
});


export default CarouselRoot;
