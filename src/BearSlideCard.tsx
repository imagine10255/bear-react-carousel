import React, {ReactNode} from 'react';
import CSS from 'csstype';
import clsx from 'clsx';
import elClassName from './el-class-name';
// import useLazyLoadBg, {ELoadStatus} from './hook/useLazyLoadBg';
import useDraggableClick from './hook/useDraggableClick';
// import {useSlide} from './components/SlideProvider';

interface IProps {
  className?: string,
  style?: CSS.Properties,
  bgUrl?: string,
  bgSize?: '100%'|'cover'|'contain',
  children?: ReactNode,
  onClick?: () => void,
  onClickAllowTime?: number,
}


/**
 * Slide Data - Card Component
 *
 * @param className
 * @param style
 * @param bgUrl
 * @param bgSize
 * @param children
 * @param onClick
 * @param onClickAllowTime
 */
const BearSlideCard = ({
    className,
    style,
    bgUrl,
    bgSize = 'cover',
    children,
    onClick,
    onClickAllowTime = 150,
}: IProps) => {
    // const slide = useSlide();
    // const {imageRef, status, doneImageUrl} = useLazyLoadBg({isLazy: slide.isLazy, imageUrl: bgUrl});
    const {onMouseDown, onMouseUp} = useDraggableClick({onClick, onClickAllowTime});

    // const imageUrl = slide.isLazy ? doneImageUrl: bgUrl;
    const imageUrl = bgUrl;

    return <div
        // ref={imageRef}
        className={clsx(className, elClassName.slideItemCard, {
            [elClassName.slideItemCard100]: bgSize === '100%',
            [elClassName.slideItemCardCover]: bgSize === 'cover',
            [elClassName.slideItemCardContain]: bgSize === 'contain',
        })}
        onMouseDown={onClick ? onMouseDown: undefined}
        onMouseUp={onClick ? onMouseUp: undefined}
        // data-lazy-src={slide.isLazy && status !== ELoadStatus.done ? bgUrl: undefined}
        style={{
            ...style,
            backgroundImage: imageUrl ? `url(${imageUrl})` :undefined,
        }}
    >
        {children}
        {/*{slide.isLazy && status === ELoadStatus.loading ? <div className={elClassName.slideItemImagePreLoad}>*/}
        {/*    {slide.renderLazyPreloader()}*/}
        {/*</div>: children}*/}
    </div>;

};



export default BearSlideCard;
