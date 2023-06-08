import CSS from 'csstype';
import elClassName from './el-class-name';
import useLazyLoadImage from './hook/useLazyLoadImage';
import useDraggableClick from './hook/useDraggableClick';

interface IProps {
  className?: string,
  style?: CSS.Properties,
  imageUrl: string,
  imageAlt?: string,
  isLazy?: boolean,
  preloader?: JSX.Element,
  alt?: string,
  onClick?: () => void,
  onClickAllowTime?: number
}

const BearSlideImage = ({
    className,
    style,
    imageUrl,
    imageAlt,
    isLazy = false,
    preloader = <div>loading...</div>,
    onClick,
    onClickAllowTime = 150,
}: IProps) => {
    const {imageRef, isLoading} = useLazyLoadImage({isLazy, imageUrl});
    const {onMouseDown, onMouseUp} = useDraggableClick({onClick, onClickAllowTime});

    return <>
        <img
            ref={imageRef}
            style={style}
            className={[className, elClassName.slideItemImage].join(' ').trim()}
            src={isLazy ? undefined : imageUrl}
            alt={imageAlt}
            draggable="false"
            data-lazy-src={isLazy ? imageUrl: undefined}
            onMouseDown={onClick ? onMouseDown: undefined}
            onMouseUp={onClick ? onMouseUp: undefined}
        />
        {isLazy && isLoading && <div className={elClassName.slideItemImagePreLoad}>
            {preloader}
        </div>}
    </>;
};

export default BearSlideImage;
