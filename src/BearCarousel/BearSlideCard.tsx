import React, {ReactNode, useCallback, useRef} from 'react';
import CSS from 'csstype';
import elClassName from './el-class-name';
import {useCarousel} from './BearCarouselProvider';

interface IProps {
    className?: string,
    style?: CSS.Properties,
    children?: ReactNode,
    onClickAllowTime?: number,
    onClick?: () => void,
}


const BearSlidesCard = ({
    className,
    style,
    children,
    onClick,
    onClickAllowTime = 150,
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


    return <div
        style={{
            ...style,
            minHeight: staticHeight,
        }}
        className={[className, elClassName.slideItemCard].join(' ').trim()}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
    >
        {children}
    </div>;

};



export default BearSlidesCard;
