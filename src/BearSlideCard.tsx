import React, {ReactNode} from 'react';
import CSS from 'csstype';
import elClassName from './el-class-name';

interface IProps {
  className?: string,
  style?: CSS.Properties,
  bgUrl?: string,
  bgSize?: '100%'|'cover',
  children?: ReactNode,
  onClick?: () => void,
  onClickAllowTime?: number,
}

const BearSlideCard = ({
    className,
    style,
    bgUrl,
    bgSize,
    children,
    onClick,
    onClickAllowTime = 150,
}: IProps) => {
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

    return <div
        className={[className, elClassName.slideItemDiv].join(' ').trim()}
        onMouseDown={onMouseDown}
        onClick={onMouseUp}
        style={{
            ...style,
            backgroundImage: bgUrl ? `url(${bgUrl})`: undefined,
            backgroundSize: bgSize,
        }}
    >
        {children}
    </div>;

};



export default BearSlideCard;
