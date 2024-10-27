import {Col,Flex, Row, FCProps} from '@acrool/react-grid';
import styled from 'styled-components';


import Price from './Price';
import {IPrice} from './types';



interface IProps extends FCProps {
    prices: IPrice[]
}

const Prices = ({
    className,
    prices
}: IProps) => {



    return <PricesRoot className={className}>

        <Row>
            {prices
                .map(row => {
                    return <Col col={4} key={row.title}>
                        <Price
                            title={row.title}
                            subTitle={row.subTitle}
                            amount={row.amount}
                        />
                    </Col>;
                })}
        </Row>


    </PricesRoot>;
};

export default Prices;





const PricesRoot = styled.div`
    width: 100%;
`;
