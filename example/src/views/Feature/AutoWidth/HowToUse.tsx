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
        children: <SlideItem imageUrl={row.image}/>
    };
});

<BearCarousel
    data={slideItemData}
    slidesPerView="auto"
    staticHeight="200px"
/>

        `}
        </Code>
    </>;
};

export default HowToUse;






