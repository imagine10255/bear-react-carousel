import styled from 'styled-components';
import React from 'react';
import {auto, Grid, GridCol} from 'bear-react-grid';

interface IProps extends FCProps {
    no?: number
}

const MyLink = ({
    no,
}: IProps) => {
    return <MyLinkRoot col={auto(2)} className="gy-1">
        <No className="g-row-2">{no}</No>
        <Title className="text-ellipsis">
               Design and Code with ChatGPT and Midjourney
        </Title>
        <Desc className="text-area-overflow">
               Design and develop apps using GPT-4 and Midjourney with prompts for SwiftUI, React, CSS, app concepts, icons, and copywriting
        </Desc>
    </MyLinkRoot>;
};

export default MyLink;


const Title = styled.p`
    font-size: 15px;
    font-weight: 600;
    padding-right: 40px;
    color: rgb(255, 255, 255);
`;

const Desc = styled.p`
  font-size: 15px;
`;



const No = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50px;
    background: rgb(56, 56, 56);
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 20px;
    color: rgb(255, 255, 255);

`;

const MyLinkRoot = styled(Grid)`
  text-decoration: none;
  width: 100%;
  transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  position: relative;
  padding: 10px;
  border-radius: 10px;

  :hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset;
  }
`;

