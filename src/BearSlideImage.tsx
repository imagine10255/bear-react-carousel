import React from 'react';
import CSS from 'csstype';
import elClassName from './el-class-name';
import {useCarousel} from './BearCarouselProvider';

interface IProps {
  className?: string,
  style?: CSS.Properties,
  image: string,
  alt?: string,
  onClick?: () => void,
  onClickAllowTime?: number
}


const BearSlideImage = ({
    className,
    style,
    image,
    alt,
    onClick,
    onClickAllowTime = 150,
}: IProps) => {
    const {staticHeight} = useCarousel();
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

    return <img
        style={style}
        className={[className, elClassName.slideItemImg].join(' ').trim()}
        src={image}
        alt={alt}
        height={staticHeight}
        draggable="false"
        onMouseDown={onClick ? (event) => onMouseDown(event): undefined}
        onMouseUp={onClick ? (event) => onMouseUp(event): undefined}
    />;
};



export default BearSlideImage;
