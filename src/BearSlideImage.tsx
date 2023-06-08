import React, {useCallback, useEffect, useRef, useState} from 'react';
import CSS from 'csstype';
import elClassName from './el-class-name';
import useLazyLoadBg from "./hook/useLazyLoadBg";
import useLazyLoadImage from "./hook/useLazyLoadImage";

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
    let lastTouchEnd = 0;
    const {imageRef, isLoading} = useLazyLoadImage({isLazy, imageUrl});


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

    return <>
        <img
            ref={imageRef}
            style={style}
            className={[className, elClassName.slideItemImage].join(' ').trim()}
            src={isLazy ? undefined : imageUrl}
            alt={imageAlt}
            draggable="false"
            data-lazy-src={isLazy ? imageUrl: undefined}
            onMouseDown={onClick ? (event) => onMouseDown(event): undefined}
            onMouseUp={onClick ? (event) => onMouseUp(event): undefined}
        />
        {isLazy && isLoading && <div className={elClassName.slideItemImagePreLoad}>
            {preloader}
        </div>}

    </>;
};



export default BearSlideImage;
