import React from 'react';
import styled from 'styled-components/macro';
import BearCarousel from 'bear-carousel';
import Code from 'components/Code/Code';
import Content, {SubTitle} from '../../_components/Content';
import {media} from 'bear-styled-grid';
import {gameImages} from 'config/images';



/**
 * PerViewAuto
 */
const AutoHeight = () => {
    const carouselData = gameImages.map(row => {
        return {
            key: row.id,
            children: <img className="img-fluid" src={row.image}/>
        };
    });


    return <Content
        title="Auto Height"
        desc="Use the height of the image itself"
    >
        <CarouselBox className="mb-4">
            <BearCarousel
                data={carouselData}
                slidesPerView={1}
                isEnableNavButton
                isEnablePagination
            />
        </CarouselBox>

        <SubTitle>Source Code</SubTitle>
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

    </Content>;
};

export default AutoHeight;


const CarouselBox = styled.div`
`;




