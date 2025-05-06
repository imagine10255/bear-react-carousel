import clsx from 'clsx';
import CSS from 'csstype';

import {useSlide} from './components/SlideProvider';
import styles from './styles.module.scss';
import useLazyLoadImage from './hooks/useLazyLoadImage';
import {IAcroolSlideImageProps} from './types';



/**
 * Slide Data - Image Component
 *
 * @param className
 * @param style
 * @param imageUrl
 * @param imageAlt
 * @param imageSize
 * @param onClick
 */
const AcroolSlideImage = ({
    className,
    style,
    imageUrl,
    imageAlt,
    imageSize,
    onClick,
}: IAcroolSlideImageProps) => {
    const slide = useSlide();
    const {imageRef, isPending, isFetching} = useLazyLoadImage({
        enabled: slide.isLazy ?? false,
        imageUrl
    });


    return <>
        <img
            ref={imageRef}
            style={style}
            className={clsx(className, styles.slideItemImage, {
                [styles.slideItemImageNone]: imageSize === 'none',
                [styles.slideItemImageCover]: imageSize === 'cover',
                [styles.slideItemImageContain]: imageSize === 'contain',
                [styles.slideItemImageScaleDown]: imageSize === 'scaleDown',
            })}
            src={(!slide.isLazy && imageUrl) ? imageUrl :undefined}
            alt={imageAlt}
            draggable="false"
            data-lazy-src={slide.isLazy && isPending ? imageUrl: undefined}
            onClick={onClick}
        />
        {isFetching && <div className={styles.slideItemImagePreLoad}>
            {slide.renderLazyPreloader()}
        </div>}
    </>;
};

export default AcroolSlideImage;
