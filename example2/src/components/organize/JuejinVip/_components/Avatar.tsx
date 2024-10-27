import styled from 'styled-components';
import {Grid, Flex, Container, auto} from 'bear-react-grid';
import React from 'react';
import {asset} from '@/utils';

interface IProps extends FCProps {

}

const Avatar = ({
    className,
}: IProps) => {
    return <AvatarRoot>
        <Container className="h-inherit">
            <Grid col={auto(2)} className="justify-content-start h-inherit gap-2">
                <img src={asset('/images/avatar.jpg')} className="rounded-circle h-inherit" alt="Bruce Lee"/>
                <Flex className="flex-column justify-content-center text-left gap-2">
                    <Flex className="gap-2">
                        <Name>Imagine Chiu</Name>
                        <Level>LV5</Level>
                    </Flex>
                    <Title>Experience 511</Title>
                </Flex>
            </Grid>
        </Container>

    </AvatarRoot>;
};

export default Avatar;

const Level = styled.div`
  background-color: #005fbd;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
  font-style: italic;
`;


const Title = styled.div`
  color: rgb(238, 238, 238);
  font-size: 12px;
`;

const Name = styled.div`
    color: #fff;
  font-size: 14px;
  font-weight: 500;
`;



const AvatarRoot = styled.div`
  height: 40px;
  background-color: var(--header-bg-color);

  position: relative;
  z-index: 1;
`;
