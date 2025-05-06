import clsx from 'clsx';
import CSS from 'csstype';
import React, {ReactNode} from 'react';

import {useSlide} from './components/SlideProvider';
import useLazyLoadBackground from './hooks/useLazyLoadBackground';
import styles from './styles.module.scss';
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
        className={clsx(className, styles.slideItemCard, {
            [styles.slideItemCard100]: bgSize === '100%',
            [styles.slideItemCardCover]: bgSize === 'cover',
            [styles.slideItemCardContain]: bgSize === 'contain',
        })}
        onClick={onClick}
        data-lazy-src={slide.isLazy && isPending ? bgUrl: undefined}
        style={{
            ...style,
            '--slide-card-image': getImgBgImageCSSVar(),
        } as CSS.Properties}
    >
        {isFetching ? <div className={styles.slideItemImagePreLoad}>
            {slide.renderLazyPreloader()}
        </div>: children}
    </div>;

};



export default AcroolSlideCard;
