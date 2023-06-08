import React, {ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import CSS from 'csstype';
import elClassName from './el-class-name';
import useLazyLoadBg from './hook/useLazyLoadBg';

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
    let lastTouchEnd = 0;

    const {imageRef, isLoading} = useLazyLoadBg({isLazy, imageUrl: bgUrl});

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

    return <div
        ref={imageRef}
        className={[className, elClassName.slideItemCard].join(' ').trim()}
        onMouseDown={onMouseDown}
        onClick={onMouseUp}
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
