import {formatCurrency} from 'bear-jsutils/number';
import {Flex} from 'bear-react-grid';
import styled from 'styled-components';
import {asset} from '@/utils';
import {IPrice} from '@/components/organize/W99Vip/_components/Prices/types';


interface IProps extends IPrice, FCProps {
}

const Price = ({
    className,
    title,
    subTitle,
    amount,
}: IProps) => {

    const data = [
        '遊戲場館：不限館別',
        '次數限制：乙次',
    ];

    return <PriceRoot className={className}>

        <Header>
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
            <GiftImage src={asset('/images/w99_vip/gift.png')}/>
            <Amount>
                <strong>
                    ${formatCurrency(amount)}
                </strong>
                <CountText>/次</CountText>
            </Amount>
        </Header>

        <ContentUl>
            {data.map(text => {
                return <Li key={text}>
                    {text}
                </Li>;
            })}
        </ContentUl>

    </PriceRoot>;
};

export default Price;


const CountText = styled.div`
    color: #3d3d3d;
    font-family: Noto Sans TC;
    font-size: 15px;
    font-weight: 400;
    margin-top: auto;
`;


const Amount = styled(Flex)`

    strong{
        font-size: 24px;
        font-weight: 400;
        font-family: Righteous;
        color: var(--primary-color);
    }


`;


const Li = styled.div`
    color: #3D3D3D;
    font-family: "Noto Sans TC";
    font-size: 12px;
    font-weight: 400;
`;


const ContentUl = styled.ul`
    padding: 20px 0;
`;


const GiftImage = styled.img`
  width: 50px;
    height: auto;
`;


const SubTitle = styled.div`
    color: #A1A1A1;
    font-family: Righteous;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
`;


const Title = styled.div`
    color: var(--primary-color);
    font-family: "Noto Sans TC";
    font-size: 18px;
    font-weight: 700;
    text-align: center;
`;


const Header = styled(Flex)`
    flex-direction: column;
    align-items: center;
    gap: 5px;

    :after{
        content: '';
        background: linear-gradient(180deg, #E8E8E8 0%, #A1A1A1 100%);
        height: 1px;
        width: 100%;
        display: block;
        margin-top: 18px;
    }
`;


const PriceRoot = styled.div`
  //min-height: 330px;
    width: 100%;
    border-radius: 10px;
    border: 1px solid rgba(161, 161, 161, 0.30);
    padding: 20px 10px;

    background: #fff;
`;
