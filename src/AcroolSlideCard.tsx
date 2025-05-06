import clsx from 'clsx';
import CSS from 'csstype';
import React, {ReactNode} from 'react';

import {useSlide} from './components/SlideProvider';
import elClassName from './el-class-name';
import useLazyLoadBackground from './hooks/useLazyLoadBackground';
import {IAcroolSlideCardProps} from './types';



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
const AcroolSlideCard = ({
    className,
    style,
    bgUrl,
    bgSize = 'cover',
    children,
    onClick,
}: IAcroolSlideCardProps) => {
    const slide = useSlide();
    const {imageRef, isPending, isFetching} = useLazyLoadBackground({
        enabled: slide.isLazy,
        imageUrl: bgUrl
    });


    /**
     * 取得ImgBg變數
     */
    const getImgBgImageCSSVar = () => {
        if(bgUrl && !slide.isLazy){
            return `url("${bgUrl}")`;
        }
        return undefined;
    };


    return <div
        ref={imageRef}
        className={clsx(className, elClassName.slideItemCard, {
            [elClassName.slideItemCard100]: bgSize === '100%',
            [elClassName.slideItemCardCover]: bgSize === 'cover',
            [elClassName.slideItemCardContain]: bgSize === 'contain',
        })}
        onClick={onClick}
        data-lazy-src={slide.isLazy && isPending ? bgUrl: undefined}
        style={{
            ...style,
            '--slide-card-image': getImgBgImageCSSVar(),
        } as CSS.Properties}
    >
        {isFetching ? <div className={elClassName.slideItemImagePreLoad}>
            {slide.renderLazyPreloader()}
        </div>: children}
    </div>;

};



export default AcroolSlideCard;
