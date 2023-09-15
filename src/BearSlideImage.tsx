import CSS from 'csstype';
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
  alt?: string,
  onClick?: () => void,
  onClickAllowTime?: number
}

const BearSlideImage = ({
    className,
    style,
    imageUrl,
    imageAlt,
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
            className={[className, elClassName.slideItemImage].join(' ').trim()}
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
