import React, {ReactNode} from 'react';
import CSS from 'csstype';
import elClassName from './el-class-name';
import {useCarousel} from './CarouselProvider';

interface IProps {
  className?: string,
  style?: CSS.Properties,
  as?: 'image'|'card',
  imageUrl?: string,
  imageSize?: '100%'|'cover',
  children?: ReactNode,
}

const SlideItem = ({
    className,
    style,
    as = 'image',
    imageUrl,
    imageSize= 'cover',
    children,
}: IProps) => {
    const {slidesPerView, staticHeight} = useCarousel();

    if(as === 'image' && slidesPerView === 'auto'){
        return <img
            style={style}
            className={[className, elClassName.slideItemImg].join(' ').trim()}
            src={imageUrl}
            alt=""
            height={staticHeight}
        />;
    }

    return <div
        className={[className, elClassName.slideItemDiv].join(' ').trim()}
        style={{
            ...style,
            backgroundImage: imageUrl ? `url(${imageUrl})`: undefined,
            backgroundSize: imageUrl ? imageSize: 'cover',
        }}
    >
        {children}
    </div>;

};



export default SlideItem;
