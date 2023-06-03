import React, {ReactNode} from 'react';
import CSS from 'csstype';
import elClassName from './el-class-name';
import {useCarousel} from './BearCarouselProvider';

interface IProps {
  className?: string,
  style?: CSS.Properties,
  as?: 'image'|'card',
  imageUrl?: string,
  imageSize?: '100%'|'cover',
  imageAlt?: string,
  children?: ReactNode,
  onClick?: () => void,
}

const onClickAllowTime = 150;

const BearSlideItem = ({
    className,
    style,
    as = 'card',
    imageUrl,
    imageSize,
    imageAlt,
    children,
    onClick,
}: IProps) => {
    const {slidesPerView, staticHeight} = useCarousel();
    let lastTouchEnd = 0;


    const onMouseDown = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        lastTouchEnd = (new Date()).getTime();
    };


    const onMouseUp = (event: React.MouseEvent<HTMLElement>) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= onClickAllowTime) {
            event.preventDefault();
            if(onClick) onClick();
        }
    };



    if(as === 'image'){
        return <img
            style={style}
            className={[className, elClassName.slideItemImg].join(' ').trim()}
            src={imageUrl}
            alt={imageAlt}
            height={staticHeight}
            draggable="false"
            onMouseDown={onClick ? (event) => onMouseDown(event): undefined}
            onMouseUp={onClick ? (event) => onMouseUp(event): undefined}
        />;
    }

    return <div
        className={[className, elClassName.slideItemDiv].join(' ').trim()}
        onMouseDown={onMouseDown}
        onClick={onMouseUp}
        style={{
            ...style,
            backgroundImage: imageUrl ? `url(${imageUrl})`: undefined,
            backgroundSize: imageSize,
        }}
    >
        {children}
    </div>;

};



export default BearSlideItem;
