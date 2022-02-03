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


const carouselData = images.map(row => {
    return {
        key: row.id,
        children: <img className="img-fluid" src={row.image}/>
    };
});

<BearCarousel
    data={carouselData}
    slidesPerView={1}
    isEnableNavButton
    isEnablePagination
/>

        `}
        </Code>
    </>;
};

export default HowToUse;






