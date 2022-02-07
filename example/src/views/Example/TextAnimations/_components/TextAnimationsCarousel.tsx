import React from 'react';
import BearCarousel, {elClassName, BearSlideItem, TBearSlideItemDataList} from 'bear-carousel';
import {foodImages as images} from 'config/images';
import styled, {css} from 'styled-components';
import {EDirection, Flex, media} from 'bear-styled-grid';
import {asset} from 'config/utils';

interface ITextCardProps {
    imageUrl: string,
    title: string,
    subTitle: string,
    desc: string,
    position: 'left'|'right',
}

const TextCard = ({
    imageUrl,
    title,
    subTitle,
    desc,
    position = 'left',
}: ITextCardProps) => {

    return <BearSlideItem imageUrl={imageUrl}>
        <AnimationsBox position={position}>
            <SubTitle>{subTitle}</SubTitle>
            <Title>{title}</Title>
            <Desc>{desc}</Desc>
            <Flex direction={EDirection.row}>
                <Button>Shop Now</Button>
                <Button isOutline>About Store</Button>
            </Flex>
        </AnimationsBox>

    </BearSlideItem>;
};

interface IProps {
    isLoadData: boolean,
}

/**
 * TextCarousel
 */
const TextAnimationsCarousel = ({
    isLoadData = true
}: IProps) => {

    // 輪播項目
    const slideItemData: TBearSlideItemDataList = images.map(row => {
        return {
            key: row.id,
            children: <TextCard {...row}/>
        };
    });

    return <TextAnimationsRoot>
        <BearCarousel
            data={isLoadData ? slideItemData: []}
            slidesPerView={1}
            staticHeight="calc(100vh - 300px)"
            isEnableAutoPlay
            isEnableLoop
            isEnableNavButton={false}
            isEnablePagination
            autoPlayTime={5000}
            moveTime={900}
            breakpoints={{
                576: {
                    staticHeight: '400px',
                    isEnableNavButton: false,
                },
                996: {
                    staticHeight: '500px',
                    isEnableNavButton: true,
                },
                1200: {
                    staticHeight: 'calc(100vh - 300px)',
                    isEnableNavButton: true,
                }
            }}
        />
    </TextAnimationsRoot>;
};

export default TextAnimationsCarousel;


const Button = styled.button<{
    isOutline?: boolean,
}>`
  background-color: #c4a265;
  border: 2px solid #c4a265;
  color: #fff;
  font-weight: 400;
  font-size: 14px;
  padding: 14px 10px;
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
  
  
    ${media.lg`
        font-size: 21px;
      padding: 19px 26px;

    `}
`;

const Desc = styled.h4`
    color: #a9aaab;
    font-size: 13px;
    font-weight: 400;
    text-transform: uppercase;
    line-height: 15px;
    font-family: Blatant, sans-serif;
    margin-bottom: 1rem;

    ${media.lg`
        font-size: 19px;
        line-height: 26px;

    `}

    ${media.xxl`
        font-size: 26px;
        line-height: 33px;

    `}
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
        font-size: 60px;
    `}
    
    ${media.xxl`
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
        font-size: 30px;
    `}
    
    ${media.xxl`
        font-size: 50px;
    `}
`;

const AnimationsBox = styled.div<{
    position: string,
}>`
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
    
    //will-change: opacity, transform;
    transition: opacity 2s ease .7s, transform 2s ease .7s;
    
    ${props => css`
        ${media.md`
            ${props.position === 'left' && css`
                margin-left: 10%;
                margin-right: auto;
            `}
            ${props.position === 'right' && css`
                margin-left: auto;
                margin-right: 10%;
            `}
        `}
    `}
    
`;

const TextAnimationsRoot = styled.div`
  --primary-color: #c4a265;

  .${elClassName.slideItem}{
  
      &[data-active=true]:not([data-is-clone]){
          ${AnimationsBox}{
               transform: translateY(-60px);
               opacity: 1;
          }
      }
      
      
      &:before{
        content: "";
        background: url(${asset('/sample/food/blackt-will.png')}) center center repeat;
        z-index: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
      }
  }
  
`;
