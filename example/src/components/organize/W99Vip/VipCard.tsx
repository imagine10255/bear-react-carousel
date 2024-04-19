import {formatCurrency} from 'bear-jsutils/number';
import {Flex} from 'bear-react-grid';
import CSS from 'csstype';
import styled from 'styled-components';


const asset = (str: string) => {
    return str;
};

interface IProps {
    style?: CSS.Properties
    className?: string
    isActive?: boolean
    level: number
    levelName: string
    totalAmount: number
    month: number
    isUseOld?: boolean
}



/**
 * VipLevelCard
 */
const VipCard = ({
    level,
    levelName,
    totalAmount,
    month,
    isUseOld = false
}: IProps) => {

    return (
        <VipCardRoot>
            <StarGroup>
                {Array.from({length: level}).map((row, index) => {
                    return <StarImage src={isUseOld ? asset('/images/w99_vip/old/star.svg'):
                        asset('/images/w99_vip/star.svg')} key={`star_${level}_${index}`}/>;
                })}
            </StarGroup>

            <Flex col="column" className="gap-1">
                <Flex className="gap-2 align-items-center">
                    <LevelIconImage src={isUseOld ? asset('/images/w99_vip/old/crown.svg'): asset('/images/w99_vip/crown.svg')}/>
                    <LevelName>{levelName}</LevelName>
                </Flex>

                <Flex className="gap-2 align-items-center">
                    <LevelIconImage src={isUseOld ? asset('/images/w99_vip/old/lightning.svg'): asset('/images/w99_vip/lightning.svg')} style={{height: '40px'}}/>
                    <LevelName>
                        <TotalAmount>
                            {formatCurrency(totalAmount)}
                        </TotalAmount>
                        <TotalAmountTitle>
                            需求流水量
                        </TotalAmountTitle>
                    </LevelName>
                </Flex>

                <Flex className="gap-2 align-items-center">
                    <LevelIconImage src={isUseOld ? asset('/images/w99_vip/old/heart.svg'): asset('/images/w99_vip/heart.svg')}/>
                    <LevelDesc>保級有效投注要求{month}個月</LevelDesc>
                </Flex>
            </Flex>




        </VipCardRoot>
    );
};

export default VipCard;



const TotalAmountTitle = styled.div`
    color: #fff;
    font-family: "Noto Sans TC";
    font-size: 12px;
    font-weight: 700;
`;

const TotalAmount = styled.div`
    color: #FFF;
    font-family: Righteous;
    font-size: 24px;
    font-weight: 900;
    text-align: left;
`;


const LevelDesc = styled.div`
    color: #fff;
    font-family: "Noto Sans TC";
    font-size: 14px;
    font-weight: 700;
`;


const LevelIconImage = styled.img`
  width: 35px;
`;


const LevelName = styled.div`
    color: #FFF;
    font-family: Righteous;
    font-size: 23px;
    font-weight: 900;
`;


const StarImage = styled.img`
    width: 20px;
    height: 20px;
`;

const StarGroup = styled(Flex)`
    justify-content: flex-end;
`;






const VipCardRoot = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 171px;
    padding: 12px 22px;
    border-radius: 13.597px;
    box-shadow: 0 10.198px 20.395px 0 rgba(224, 164, 77, 0.30), 0px -4px 0px 0px rgba(0, 0, 0, 0.15) inset;
    border: 1px solid #E1B400;
    background: linear-gradient(90deg, rgba(240, 155, 76, 0.90) 0%, rgba(245, 211, 91, 0.90) 100%);

`;
