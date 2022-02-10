import React, {ReactNode, useCallback, useRef} from 'react';
import CSS from 'csstype';
import elClassName from './el-class-name';
import {useCarousel} from './BearCarouselProvider';

interface IProps {
    className?: string,
    style?: CSS.Properties,
    imageUrl: string,
    imageSize?: '100%'|'cover',
    children?: ReactNode,
    onClickAllowTime?: number,
    onClick?: () => void,
}


const BearSlideBg = ({
    className,
    style,
    imageUrl,
    imageSize= 'cover',
    children,
    onClickAllowTime = 150,
    onClick,

}: IProps) => {
    const {slidesPerView, staticHeight} = useCarousel();
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


    return <div
        style={{
            ...style,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: imageSize,
            height: staticHeight,
        }}
        className={[className, elClassName.slideItemBg].join(' ').trim()}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
    >
        {children}
    </div>;

};



export default BearSlideBg;
