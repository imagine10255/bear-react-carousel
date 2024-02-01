import styled from 'styled-components';
import {Grid, Container, GridCol, Flex, Row, Col} from 'bear-react-grid';
import TrustedCard from './_components/TrustedCard';
import CourseButton from '../_components/CourseButton';

interface IProps extends FCProps {

}

const Trusted = ({
    className,
}: IProps) => {
    return <TrustedRoot className={className}>
        <Row className="g-5">
            <Col col={12} xl className="order-1 order-xl-0">
                <FeatureList col={1} md={2}>
                    {Array.from({length: 2}).map((row, index) => {
                        return <TrustedCard key={`trusted_${index}`}/>;
                    })}
                </FeatureList>
            </Col>
            <Col col={8} xl className="mx-auto">
                <Flex className="flex-column text-center align-items-center text-xl-left mx-auto gap-3">
                    <SubTitle>TRUSTED BY TEAMS</SubTitle>
                    <Title>110,000 people</Title>
                    <Desc>Many startups look for designers who code and developers who design. They use our courses to help train new hires and expand skill sets.</Desc>

                    <CourseButton isOutline>
                        <img src="https://designcode.io/images/icons/chat.svg" alt="Create account"/>
                        <span>More stories</span>
                    </CourseButton>
                </Flex>
            </Col>
        </Row>

    </TrustedRoot>;
};

export default Trusted;




const FeatureList = styled(Grid)`

`;

const Desc = styled.p`
    font-size: 17px;
`;

const Title = styled.div`
    font-weight: bold;
    font-size: 40px;
`;

const SubTitle = styled.div`
    font-weight: 600;
    font-size: 15px;
`;


const TrustedRoot = styled(Container)`
    margin-bottom: 50px;
`;
