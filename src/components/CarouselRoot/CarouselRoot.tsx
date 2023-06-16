import {forwardRef} from 'react';
import elClassName from '../../el-class-name';
import {booleanToDataAttr} from '../../utils';
import CSS from 'csstype';
import {ISetting} from '../../manager/Configurator/types';


interface IProps {
    style: CSS.Properties
    className: string
    id: string,
    setting: ISetting
    children: JSX.Element[]
    extendStyle?: string
    isDebug?: boolean
    isEnableGpuRender?: boolean
}

const CarouselRoot = forwardRef<HTMLDivElement, IProps>(({
    id,
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
        id={id}
        data-testid="bear-carousel"
        style={style}
        className={[className, elClassName.root].join(' ').trim()}
        data-gpu-render={booleanToDataAttr(isEnableGpuRender)}
        data-per-view-auto={booleanToDataAttr(setting.slidesPerView === 'auto')}
        data-mouse-move={setting.isEnableMouseMove}
        // data-actual={[actual.minIndex, actual.firstIndex, actual.lastIndex, actual.maxIndex].join(' / ')}
        data-debug={booleanToDataAttr(isDebug)}
    >
        <style scoped dangerouslySetInnerHTML={{__html: extendStyle}}/>
        {children}
    </div>;
});


export default CarouselRoot;
