import CSS from 'csstype';
import clsx from 'clsx';
import elClassName from './el-class-name';
import useLazyLoadImage from './hook/useLazyLoadImage';
import useDraggableClick from './hook/useDraggableClick';
import {useSlide} from './components/SlideProvider';
import {ELoadStatus} from './hook/useLazyLoadBg';

interface IProps {
  className?: string,
  style?: CSS.Properties,
  imageUrl: string,
  imageAlt?: string,
  imageSize?: 'none'|'cover'|'contain'|'scaleDown',
  alt?: string,
  onClick?: () => void,
  onClickAllowTime?: number
}


/**
 * Slide Data - Image Component
 *
 * @param className
 * @param style
 * @param imageUrl
 * @param imageAlt
 * @param imageSize
 * @param onClick
 * @param onClickAllowTime
 */
const BearSlideImage = ({
    className,
    style,
    imageUrl,
    imageAlt,
    imageSize,
    onClick,
    onClickAllowTime = 150,
}: IProps) => {
    const slide = useSlide();
    const {imageRef, status} = useLazyLoadImage({isLazy: slide.isLazy, imageUrl});
    const {onMouseDown, onMouseUp} = useDraggableClick({onClick, onClickAllowTime});


    return <>
        <img
            ref={imageRef}
            style={style}
            className={clsx(className, elClassName.slideItemImage, {
                [elClassName.slideItemImageNone]: imageSize === 'none',
                [elClassName.slideItemImageCover]: imageSize === 'cover',
                [elClassName.slideItemImageContain]: imageSize === 'contain',
                [elClassName.slideItemImageScaleDown]: imageSize === 'scaleDown',
            })}
            src={(!slide.isLazy && imageUrl) ? imageUrl :undefined}
            alt={imageAlt}
            draggable="false"
            data-lazy-src={slide.isLazy && status !== ELoadStatus.done ? imageUrl: undefined}
            onMouseDown={onClick ? onMouseDown: undefined}
            onMouseUp={onClick ? onMouseUp: undefined}
        />
        {slide.isLazy && status === ELoadStatus.loading && <div className={elClassName.slideItemImagePreLoad}>
            {slide.renderLazyPreloader()}
        </div>}
    </>;
};

export default BearSlideImage;
