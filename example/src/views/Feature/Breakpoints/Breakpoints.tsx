import React from 'react';
import styled from 'styled-components/macro';
import BearCarousel, {ICarouselData} from 'bear-carousel';
import Code from 'components/Code/Code';
import Content, {SubTitle} from '../../_components/Content';


const bgList = [
    {id: 9, image: '/static/sample/09.jpg'},
    {id: 2, image: '/static/sample/02.jpg'},
    {id: 3, image: '/static/sample/03.jpg'},
    {id: 4, image: '/static/sample/04.jpg'},
    {id: 5, image: '/static/sample/05.jpg'},
    {id: 6, image: '/static/sample/06.jpg'},
    {id: 7, image: '/static/sample/07.jpg'},
    {id: 8, image: '/static/sample/08.jpg'},
    {id: 1, image: '/static/sample/01.jpg'}
];


/**
 * Breakpoints
 */
const Breakpoints = () => {

    const carouselData: ICarouselData[] = bgList.map(row => {
        return {
            key: row.id,
            children: <div
                className="carousel_item"
                style={{
                    backgroundImage: `url(${row.image})`,
                    backgroundSize: 'cover',
                    height: '200px'
                }}
            />
        };
    });


    return <Content
        title="Breakpoints"
        desc="Display settings according to responsive size"
    >
        <CarouselBox className="mb-4">
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




