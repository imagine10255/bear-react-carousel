import React, {ReactNode} from 'react';
import CSS from 'csstype';
import clsx from 'clsx';
import elClassName from './el-class-name';
import {useSlide} from './components/SlideProvider';
import useLazyLoadBg, {ELoadStatus} from './hook/useLazyLoadBg';

interface IProps {
  className?: string,
  style?: CSS.Properties,
  bgUrl?: string,
  bgSize?: '100%'|'cover'|'contain',
  children?: ReactNode,
  onClick?: () => void,
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
 */
const BearSlideCard = ({
    className,
    style,
    bgUrl,
    bgSize = 'cover',
    children,
    onClick,
}: IProps) => {
    const slide = useSlide();
    const {imageRef, status, doneImageUrl} = useLazyLoadBg({isLazy: slide.isLazy, imageUrl: bgUrl});

    const imageUrl = slide.isLazy ? doneImageUrl: bgUrl;

    return <div
        ref={imageRef}
        className={clsx(className, elClassName.slideItemCard, {
            [elClassName.slideItemCard100]: bgSize === '100%',
            [elClassName.slideItemCardCover]: bgSize === 'cover',
            [elClassName.slideItemCardContain]: bgSize === 'contain',
        })}
        onClick={onClick}
        data-lazy-src={slide.isLazy && status !== ELoadStatus.done ? bgUrl: undefined}
        style={{
            ...style,
            backgroundImage: imageUrl ? `url(${imageUrl})` :undefined,
        }}
    >
        {slide.isLazy && status === ELoadStatus.loading ? <div className={elClassName.slideItemImagePreLoad}>
            {slide.renderLazyPreloader()}
        </div>: children}
    </div>;

};



export default BearSlideCard;
