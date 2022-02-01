import React from 'react';
import styled from 'styled-components/macro';
import BearCarousel, {ICarouselData} from 'bear-carousel';
import Code from 'components/Code/Code';
import Content, {SubTitle} from '../../_components/Content';
import {media} from 'bear-styled-grid';


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
    // {id: 10, image: '/static/sample/10.jpg'},
];


/**
 * PerViewAuto
 */
const Centered = () => {

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
        title="Center"
        desc="Moved items as to the central position"
    >
        <CarouselBox className="mb-4">
            <BearCarousel
                data={carouselData}
                slidesPerView={4}
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




