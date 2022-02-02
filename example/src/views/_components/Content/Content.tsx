import React from 'react';
import styled from 'styled-components/macro';
import {Col, EColType, ERowAlign, Flex, Row} from 'bear-styled-grid';
import {SwitchControl} from 'bear-components/forms';

interface IProps extends FCChildrenProps{
    title: string
    desc?: string
    isLoadData?: boolean,
    onLoadData?: (isChecked: boolean) => void,
}

const Content = ({
    title,
    desc = '',
    isLoadData,
    onLoadData,
    children
}: IProps) => {
    return <>
        <Title>{title}</Title>
        <Row>
            <Col col>
                <Desc dangerouslySetInnerHTML={{__html: desc}}/>
            </Col>

            {onLoadData && (
                <Col col={EColType.auto}>
                    <Flex horizontal={ERowAlign.end}>
                        <Label>
                            <LabelText>Load Data</LabelText>
                            <SwitchControl
                                onChange={onLoadData}
                                checked={isLoadData}
                            />
                        </Label>

                    </Flex>
                </Col>
            )}


        </Row>
        {children}
    </>;
};

export default Content;



const LabelText = styled.div`
    color: rgb(245, 246, 247);  
    font-size: 13px;
    padding-right: 10px;
    
`;

const Label = styled.label`
  display: flex;
  align-items: center;
`;

export const Desc = styled.p`
  margin-top: 0;
  margin-bottom: 21.25px;
      color: rgb(245, 246, 247);
font-size: 17px;
`;


export const SubTitle = styled.h2`
  font-size: 30px;
  color: rgb(245, 246, 247);
  margin-block-start: 0;
    margin-block-end: 0;
    margin-bottom: 10px
`;

const Title = styled.h1`
  font-size: 51px;
  color: rgb(245, 246, 247);
  margin-block-start: 0;
    margin-block-end: 0;
    margin-bottom: 26.5625px

`;
