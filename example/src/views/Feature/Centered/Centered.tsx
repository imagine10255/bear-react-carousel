import React, {useState} from 'react';
import styled from 'styled-components/macro';
import BearCarousel, {ICarouselData} from 'bear-carousel';
import Code from 'components/atoms/Code';
import Content, {SubTitle} from '../../_components/Content';
import {gameImages as images} from 'config/images';




// 輪播項目
const carouselData: ICarouselData[] = images.map(row => {
    return {
        key: row.id,
        children: <div
            style={{
                backgroundImage: `url(${row.image})`,
                backgroundSize: 'cover',
                aspectRatio: '16 / 9',
            }}/>
    };
});


/**
 * Centered
 */
const Centered = () => {
    const [isLoadData, setIsLoadData] = useState<boolean>(true);


    return <Content
        title="Centered"
        desc="Moved items as to the central position"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >
        <CarouselBox className="mb-4">
            <BearCarousel
                data={isLoadData ? carouselData: []}
                slidesPerView={3}
                spaceBetween={10}
                isEnableMouseMove
                isEnablePagination
                isCenteredSlides
            />
        </CarouselBox>

        <SubTitle>Source Code</SubTitle>
        <Code language="typescript">
            {`

<BearCarousel
    data={carouselData}
    slidesPerView={4}
    spaceBetween={10}
    isEnableMouseMove
    isEnablePagination
    isCenteredSlides
/>
       `}
        </Code>

    </Content>;
};

export default Centered;


const CarouselBox = styled.div`
  height: 200px;
  display: block;
  overflow: hidden;
 
`;




