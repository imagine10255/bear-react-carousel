import React, { useState } from 'react'
import styled from 'styled-components/macro';
import BearCarousel, {ICarouselData} from 'bear-carousel';
import Code from 'components/atoms/Code';
import Content, {SubTitle} from '../../_components/Content';
import { gameImages as images } from '../../../config/images'



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
 * Breakpoints
 */
const Breakpoints = () => {
    const [isLoadData, setIsLoadData] = useState<boolean>(true);


    return <Content
        title="Breakpoints"
        desc="Display settings according to responsive size"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >
        <CarouselBox className="mb-4">
            <BearCarousel
                data={isLoadData ? carouselData: []}
                slidesPerView={1}
                isEnableMouseMove
                isEnablePagination
                isCenteredSlides
                isEnableLoop
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                        isEnableLoop: false,
                        isEnablePagination: false,
                        isEnableNavButton: false,
                    },
                    1200: {
                        slidesPerView: 4,
                        isEnableLoop: true,
                        isEnablePagination: true,
                        isEnableNavButton: true,
                    }
                }}

            />
        </CarouselBox>

        <SubTitle>Source Code</SubTitle>
        <Code language="typescript">
            {`

<BearCarousel
    data={carouselData}
    slidesPerView={1}
    isEnableMouseMove
    isEnablePagination
    isCenteredSlides
    isEnableLoop
    breakpoints={{
      768: {
        slidesPerView: 2,
        isEnableLoop: false,
        isEnablePagination: false,
        isEnableNavButton: false,
        isEnableMouseMove: false
      },
      1200: {
        slidesPerView: 4,
        isEnableLoop: true,
        isEnablePagination: true,
        isEnableNavButton: true,
        isEnableMouseMove: true
      }
    }}
/>
        `}
        </Code>

    </Content>;
};

export default Breakpoints;


const CarouselBox = styled.div`
  height: 200px;
  display: block;
  overflow: hidden;
 
`;




