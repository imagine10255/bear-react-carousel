import styled from 'styled-components';
import {Grid, GridCol, Flex, Container} from 'bear-react-grid';
import React from 'react';

interface IProps extends FCProps {

}

const Avatar = ({
    className,
}: IProps) => {
    return <AvatarRoot>
        <Container className="h-inherit">
            <Grid rowGap="5px" columnGap="10px" className="justify-content-start h-inherit">
                <img src="/img/build-anything/avatar.jpg" className="rounded-circle h-inherit" alt="Bruce Lee"/>
                <Flex className="flex-column justify-content-center text-left" gap="5px">
                    <Flex gap="8px">
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



const AvatarRoot = styled(Grid)`
  height: 40px;
  background-color: var(--header-bg-color);

  position: relative;
  z-index: 1;
`;
