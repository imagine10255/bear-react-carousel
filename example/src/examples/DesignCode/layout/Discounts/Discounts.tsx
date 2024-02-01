import {Container, Grid, Row, Col, Flex} from 'bear-react-grid';
import styled from 'styled-components';
import FeatureCard from './_components/FeatureCard';

interface IProps extends FCProps {

}

const Discounts = ({
    className,
}: IProps) => {

    const renderInfo = () => {
        return <>
            <SubTitle>START WITH MORE</SubTitle>
            <Title>Get discounts</Title>
            <Desc>We’ve partnered with the biggest design tools on the market to help you get started.</Desc>
        </>;
    };



    const renderFeatureList = () => {
        return <Grid col={2} md={4} className="justify-content-center justify-items-center g-3">
            {Array.from({length: 4}).map((row, index) => {
                return <FeatureCard key={`feature_${index}`}/>;
            })}
        </Grid>;
    };


    return <DiscountsRoot className={className}>
        <Row className="justify-content-lg-between">
            <Col col={12} lg={4}>
                <Col sm={8} lg={12} className="d-flex flex-column text-center text-lg-left gap-1 mx-auto  mb-4">
                    {renderInfo()}
                </Col>
            </Col>
            <Col col={12} lg="auto">
                {renderFeatureList()}
            </Col>
        </Row>
    </DiscountsRoot>;
};

export default Discounts;



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

const DiscountsRoot = styled(Container)`
    margin-bottom: 200px;
`;
