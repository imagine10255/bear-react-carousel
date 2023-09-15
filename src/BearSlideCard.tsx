import React, {ReactNode} from 'react';
import CSS from 'csstype';
import elClassName from './el-class-name';
import useLazyLoadBg, {ELoadStatus} from './hook/useLazyLoadBg';
import useDraggableClick from './hook/useDraggableClick';
import {useSlide} from './components/SlideProvider';

interface IProps {
  className?: string,
  style?: CSS.Properties,
  bgUrl?: string,
  bgSize?: '100%'|'cover',
  children?: ReactNode,
  onClick?: () => void,
  onClickAllowTime?: number,
}

const BearSlideCard = ({
    className,
    style,
    bgUrl,
    bgSize,
    children,
    onClick,
    onClickAllowTime = 150,
}: IProps) => {
    const slide = useSlide();
    const {imageRef, status, doneImageUrl} = useLazyLoadBg({isLazy: slide.isLazy, imageUrl: bgUrl});
    const {onMouseDown, onMouseUp} = useDraggableClick({onClick, onClickAllowTime});

    const imageUrl = slide.isLazy ? doneImageUrl: bgUrl;

    return <div
        ref={imageRef}
        className={[className, elClassName.slideItemCard].join(' ').trim()}
        onMouseDown={onClick ? onMouseDown: undefined}
        onMouseUp={onClick ? onMouseUp: undefined}
        data-lazy-src={slide.isLazy && status !== ELoadStatus.done ? bgUrl: undefined}
        style={{
            ...style,
            backgroundImage: (!slide.isLazy && imageUrl) ? `url(${imageUrl})` :undefined,
            backgroundSize: bgSize,
        }}
    >
        {slide.isLazy && status === ELoadStatus.loading ? <div className={elClassName.slideItemImagePreLoad}>
            {slide.renderLazyPreloader()}
        </div>: children}
    </div>;

};



export default BearSlideCard;
