import React, {useState} from 'react';
import BearCarousel, {elClassName, SlideItem, TSlideItemDataList} from 'bear-carousel';
import {useLocale} from 'library/intl';
import {foodImages as images} from 'config/images';
import styled, {css} from 'styled-components';
import {EDirection, Flex, media} from 'bear-styled-grid';


interface ITextCardProps {
    imageUrl: string,
    title: string,
    subTitle: string,
    desc: string,
}

const TextCard = ({
    imageUrl,
    title,
    subTitle,
    desc,
}: ITextCardProps) => {

    return <SlideItem imageUrl={imageUrl}>
        <AnimationsBox>
            <SubTitle>{subTitle}</SubTitle>
            <Title>{title}</Title>
            <Desc>{desc}</Desc>
            <Flex direction={EDirection.row}>
                <Button>Shop Now</Button>
                <Button isOutline>About Store</Button>
            </Flex>
        </AnimationsBox>

    </SlideItem>;
};

interface IProps {
    isLoadData: boolean,
}

/**
 * TextCarousel
 */
const TextCarousel = ({
    isLoadData = true
}: IProps) => {

    // 輪播項目
    const slideItemData: TSlideItemDataList = images.map(row => {
        return {
            key: row.id,
            children: <TextCard {...row}/>
        };
    });

    return <TextAnimationsRoot>
        <BearCarousel
            data={isLoadData ? slideItemData: []}
            slidesPerView={1}
            staticHeight="800px"
            isEnableAutoPlay
            isEnableLoop
            isEnableNavButton
            isEnablePagination
            autoPlayTime={5000}
            moveTime={900}
        />
    </TextAnimationsRoot>;
};

export default TextCarousel;


const Button = styled.button<{
    isOutline?: boolean,
}>`
  background-color: #c4a265;
  border: 2px solid #c4a265;
  color: #fff;
  font-weight: 400;
  font-size: 21px;
  padding: 19px 26px;
  border-radius: 4px;
  margin-right: 20px;
  font-family: Blatant, sans-serif;
  transition: background-color .4s, color .4s;

  ${props => props.isOutline && css`
     border-color: #fff;
     background-color: transparent;
  `}
  
  :hover{
    border-color: #c4a265;
    background-color: #b89352;
  }
`;

const Desc = styled.h4`
    color: #a9aaab;
    font-size: 26px;
    font-weight: 400;
    text-transform: uppercase;
    line-height: 33px;
    font-family: Blatant, sans-serif;
    margin-bottom: 1rem;

`;


const Title = styled.h2`
    color: #b89352;
    font-size: 40px;
    font-weight: 700;
    text-transform: uppercase;
    font-family: Blatant, sans-serif;
    font-style: normal;
    margin-bottom: 1rem;
    
    ${media.lg`
        font-size: 90px;
    `}
`;


const SubTitle = styled.h3`
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    font-family: Blatant, sans-serif;
    margin-bottom: 1rem;

    
    ${media.lg`
        font-size: 50px;
    `}
`;

const AnimationsBox = styled.div`
    width: 500px;
    max-width: 100%;
    padding: 20px;
    
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    opacity: 0;
    transform: translateY(10px);
    
    will-change: opacity, transform;
    transition: opacity 2s ease .7s, transform 2s ease .7s;
    
    ${media.md`
      margin-left: 10%;
    `}
`;

const TextAnimationsRoot = styled.div`
  --primary-color: #c4a265;

  .${elClassName.slideItem}[data-active=true]:not([data-is-clone]){
      ${AnimationsBox}{
           transform: translateY(-60px);
           opacity: 1;
      }
  }
`;
