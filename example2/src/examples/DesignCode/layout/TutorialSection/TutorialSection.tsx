import styled from 'styled-components';
import React from 'react';
import {Col, Container, Flex, Grid, GridCol, media, Row, auto} from 'bear-react-grid';
import CourseButton from '../_components/CourseButton';
import TutorialCard from './_components/TutorialCard';

interface IProps extends FCProps {
    className?: string;
}

const TutorialSection = ({
    className,
}: IProps) => {


    return <TutorialSectionRoot className={className} fluid="sm">
        <Row>
            <Col col={8} lg={4} className="mx-auto mx-lg-0 mr-lg-auto mb-5">
                <Flex className="flex-column align-items-center align-items-lg-start text-center text-lg-left mb-3 gap-3">
                    <SubTitle>PREMIUM TUTORIALS</SubTitle>
                    <Title>Tutorials to guide you beyond</Title>
                    <Desc>Once you’ve completed the courses, learn from our quick design and code tutorials to strengthen your knowledge</Desc>

                    <CourseButton href="/" isOutline>
                        <img src="https://designcode.io/images/icons/tutorials.svg" alt="more"/>
                        <span>More tutorials</span>
                    </CourseButton>
                </Flex>
            </Col>


            <Col col={12} lg="auto">
                <Grid col={auto(2)} className="justify-content-center">
                    {Array.from({length: 2}).map((row, index) => {
                        return <TutorialCard key={`tutorial_${index}`}/>;
                    })}
                </Grid>
            </Col>
        </Row>
    </TutorialSectionRoot>;
};

export default TutorialSection;


const Desc = styled.p`
    font-size: 17px;
    line-height: 130%;
`;

const Title = styled.h2`
    font-weight: bold;
    font-size: 40px;
`;

const SubTitle = styled.div`

`;



const Info = styled(Grid)`
    max-width: 420px;
`;

const TutorialSectionRoot = styled(Container)`
  margin-bottom: 200px;
`;
