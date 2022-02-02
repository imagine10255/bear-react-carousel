import React, {useState} from 'react';
import styled from 'styled-components/macro';
import BearCarousel from 'bear-carousel';
import Code from 'components/atoms/Code';
import Content, {SubTitle} from '../../_components/Content';
import {diffRatioImages as images} from 'config/images';


// 輪播項目
const carouselData = images.map(row => {
    return {
        key: row.id,
        children: <img
            src={row.image}
            style={{
                height: '200px'
            }}
        />
    };
});


/**
 * AutoWidth
 */
const AutoWidth = () => {
    const [isLoadData, setIsLoadData] = useState<boolean>(true);

    return <Content
        title="Auto Width"
        desc="Display according to the width of the image itself"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >
        <CarouselBox className="mb-4">
            <BearCarousel
                data={isLoadData ? carouselData: []}
                slidesPerView="auto"
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
        children: <img
          src={row.image}
          style={{
              height: '200px'
          }}
        />
    };
});

<BearCarousel
    data={carouselData}
    slidesPerView="auto"
    isEnableNavButton
    isEnablePagination
/>
        `}
        </Code>

    </Content>;
};

export default AutoWidth;

const CarouselImage = styled.img`
    height: 200px;
    width: auto;
`;


const CarouselBox = styled.div`
  height: 200px;
  
`;




