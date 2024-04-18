import styled from 'styled-components';
import {Col, FCChildrenProps, Flex, Grid} from 'bear-react-grid';

interface IProps extends FCChildrenProps {
    name: string
    desc: string
}

const Card = ({
    className,
    name,
    desc,
    children
}: IProps) => {
    return <CardRoot className={className}>
        <Flex col="column" className="px-4 py-5 my-5 gap-2 text-center">
            <h1>{name}</h1>
            <Col col={12} lg={6} className="mx-auto">
                <p className="mb-4">{desc}</p>

                <Grid col={1} className="g-3 justify-content-center">
                    {children}
                </Grid>
            </Col>
        </Flex>
    </CardRoot>;
};

export default Card;





const CardRoot = styled.div`

`;
