import React from 'react';
import Code from 'components/atoms/Code';
import {SubTitle} from '../../_components/Content';


/**
 * How To Use
 */
const HowToUse = () => {

    return <>
        <SubTitle>How to use</SubTitle>
        <Code language="typescript">
            {`
import BearCarousel, {SlideItem, TSlideItemDataList} from 'bear-carousel';

const slideItemData: TSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <SlideItem imageUrl={row.imageUrl}/>
    };
});

<BearCarousel
    data={slideItemData}
    slidesPerView={1}
    aspectRatio={{widthRatio: 22, heightRatio: 9}}
    isEnablePagination
    isEnableLoop
    breakpoints={{
        768: {
            slidesPerView: 2,
            aspectRatio: {widthRatio: 16, heightRatio: 9}
            isEnableLoop: false,
            isEnablePagination: false,
            isEnableNavButton: false,
        },
        1200: {
            slidesPerView: 4,
            aspectRatio: {widthRatio: 32, heightRatio: 9}
            isEnableLoop: true,
            isEnablePagination: true,
            isEnableNavButton: true,
        }
    }}
/>

        `}
        </Code>
    </>;
};

export default HowToUse;






