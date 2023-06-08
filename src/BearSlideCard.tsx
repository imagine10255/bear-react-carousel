import React, {ReactNode} from 'react';
import CSS from 'csstype';
import elClassName from './el-class-name';
import useLazyLoadBg from './hook/useLazyLoadBg';
import useDraggableClick from "./hook/useDraggableClick";

interface IProps {
  className?: string,
  style?: CSS.Properties,
  bgUrl?: string,
  bgSize?: '100%'|'cover',
  isLazy?: boolean,
  preloader?: JSX.Element,
  children?: ReactNode,
  onClick?: () => void,
  onClickAllowTime?: number,
}

const BearSlideCard = ({
    className,
    style,
    bgUrl,
    bgSize,
    isLazy = false,
    preloader = <div>loading...</div>,
    children,
    onClick,
    onClickAllowTime = 150,
}: IProps) => {
    const {imageRef, isLoading} = useLazyLoadBg({isLazy, imageUrl: bgUrl});
    const {onMouseDown, onMouseUp} = useDraggableClick({onClick, onClickAllowTime});

    return <div
        ref={imageRef}
        className={[className, elClassName.slideItemCard].join(' ').trim()}
        onMouseDown={onClick ? onMouseDown: undefined}
        onMouseUp={onClick ? onMouseUp: undefined}
        data-lazy-src={isLazy ? bgUrl: undefined}
        style={{
            ...style,
            backgroundImage: isLazy ? undefined: `url(${bgUrl})`,
            backgroundSize: bgSize,
        }}
    >
        {isLazy && isLoading ? <div className={elClassName.slideItemImagePreLoad}>
            {preloader}
        </div>: children}
    </div>;

};



export default BearSlideCard;
