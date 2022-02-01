import React from 'react';
import styled from 'styled-components/macro';
import BearCarousel from 'bear-carousel';
import Code from 'components/Code/Code'
import Content, {SubTitle} from '../../_components/Content'
import { media } from 'bear-styled-grid'



const imageList = [
  {id: 1, image: './static/sample/01.jpg'},
  {id: 2, image: './static/sample/auto-01.jpg'},
  {id: 4, image: './static/sample/04.jpg'},
  {id: 3, image: './static/sample/auto-02.jpg'},
  {id: 5, image: './static/sample/05.jpg'},
  {id: 6, image: './static/sample/06.jpg'},
  {id: 7, image: './static/sample/07.jpg'},
  {id: 8, image: './static/sample/08.jpg'},
  {id: 9, image: './static/sample/09.jpg'},
];



/**
 * PerViewAuto
 */
const PerViewAuto = () => {
  const imageData = imageList.map(row => {
    return {
      key: String(row.id),
      children: <CarouselImage src={row.image}/>
    };
  });


  return <Content
    title="Per View Auto"
    desc="Display according to the width of the image itself"
  >
    <CarouselBox className="mb-4">
      <BearCarousel
        data={imageData}
        slidesPerView="auto"
        isEnableNavButton
        isEnablePagination
      />
    </CarouselBox>

    <SubTitle>Source Code</SubTitle>
    <Code language="typescript">
      {`

 <BearCarousel
   data={imageData}
   slidesPerView="auto"
   isEnableNavButton
   isEnablePagination
 />
        `}
    </Code>

  </Content>;
};

export default PerViewAuto;

const CarouselImage = styled.img`
    height: 200px;
    width: auto;
`;


const CarouselBox = styled.div`
  height: 200px;
  width: 400px;
  display: block;
  flex: 0 0 100%;
  overflow: hidden;
  
  ${media.lg`
     width: 500px;
  `}
  ${media.xl`
     width: 800px;
  `}
  ${media.xxl`
     width: 1200px;
  `}
`;




