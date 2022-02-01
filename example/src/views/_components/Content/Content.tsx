import React from 'react';
import styled from 'styled-components/macro';

interface IProps extends FCChildrenProps{
    title: string
    desc: string
}

const Content = ({
    title,
    desc,
    children
}: IProps) => {
    return <>
        <Title>{title}</Title>
        <Desc dangerouslySetInnerHTML={{__html: desc}}/>
        {children}
    </>;
};

export default Content;



export const Desc = styled.p`
  margin-top: 0;
  margin-bottom: 21.25px;
      color: rgb(245, 246, 247);
font-size: 17px;
`;


export const SubTitle = styled.h2`
  font-size: 40px;
  color: rgb(245, 246, 247);
  margin-block-start: 0;
    margin-block-end: 0;
    margin-bottom: 26.5625px
`;

const Title = styled.h1`
  font-size: 51px;
  color: rgb(245, 246, 247);
  margin-block-start: 0;
    margin-block-end: 0;
    margin-bottom: 26.5625px

`;
