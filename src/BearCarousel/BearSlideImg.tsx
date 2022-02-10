import React, {ReactNode, useCallback, useRef} from 'react';
import CSS from 'csstype';
import elClassName from './el-class-name';
import {useCarousel} from './BearCarouselProvider';

interface IProps {
  className?: string,
  style?: CSS.Properties,
  imageUrl: string,
  imageAlt?: string,
  onClickAllowTime?: number,
  onClick?: () => void,
}


const BearSlideImg = ({
    className,
    style,
    imageUrl,
    imageAlt= 'cover',
    onClickAllowTime = 150,
    onClick,
}: IProps) => {
    const {staticHeight} = useCarousel();
    let lastTouchEnd = 0;


    const onMouseDown = (event: React.MouseEvent<HTMLElement>) => {
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
        style={{
            ...style,
            height: staticHeight,
        }}
        className={[className, elClassName.slideItemImg].join(' ').trim()}
        onMouseDown={onClick ? (event) => onMouseDown(event): undefined}
        onMouseUp={onClick ? (event) => onMouseUp(event): undefined}
        src={imageUrl}
        alt={imageAlt}
    />;

};



export default BearSlideImg;
