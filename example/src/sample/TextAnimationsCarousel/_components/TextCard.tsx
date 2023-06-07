import {BearSlideCard} from 'bear-react-carousel';
import {EDirection, Flex, media} from 'bear-react-grid';
import React from 'react';
import styled, {css} from 'styled-components';

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

    return <BearSlideCard bgUrl={imageUrl}>
        <AnimationsBox position={position}>
            <SubTitle>{subTitle}</SubTitle>
            <Title>{title}</Title>
            <Desc>{desc}</Desc>
            <Flex direction={EDirection.row}>
                <Button>Shop Now</Button>
                <Button isOutline>Home Store</Button>
            </Flex>
        </AnimationsBox>

    </BearSlideCard>;
};


export default TextCard;



export const AnimationsBox = styled.div<{
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
    
    transition: opacity 2s ease .7s, transform 2s ease .7s;
    
    ${props => css`
        ${media.md`
            ${props.position === 'left' && css`
                margin-left: 5%;
                margin-right: auto;
            `}
            ${props.position === 'right' && css`
                margin-left: auto;
                margin-right: 0%;
            `}
        `}
    `}
    
`;


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
        font-size: 16px;
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
        font-size: 16px;
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
  line-height: 100%;
    
    ${media.lg`
        font-size: 60px;
    `}
    
    ${media.xxl`
        font-size: 60px;
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
        font-size: 30px;
    `}
`;
