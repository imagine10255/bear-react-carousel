import {Grid, Flex} from 'bear-react-grid';
import styled from 'styled-components';
import PurchaseButton from '../../_components/PurchaseButton';


export interface IData {
    title: string,
    subTitle: string,
    desc: string,
    features: string[]
    button: {
        icon: string,
        text: string
    },
};

interface IProps extends FCProps {
    data: IData
}

const Book = ({
    className,
    data,
}: IProps) => {
    return <BookRoot className={className}>
        <Bg/>
        <Card col="column" className="align-items-center gap-3">
            <SubTitle>{data.subTitle}</SubTitle>
            <Title>{data.title}</Title>
            <Desc className="mb-2">{data.desc}</Desc>

            <Flex col="column" className="gap-2">
                {data.features.map((feat, featIndex) => {
                    return <Feature key={`feat_${data.title}_${featIndex}`} className="gap-2">
                        <img src="https://designcode.io/images/icons/check-dark.svg" alt="check"/>
                        <p dangerouslySetInnerHTML={{__html: feat}}/>
                    </Feature>;
                })}
            </Flex>

            <CustomPurchaseButton>
                <ImageBox>
                    <img src={data.button.icon} alt=""/>
                </ImageBox>
                <p>{data.button.text}</p>
            </CustomPurchaseButton>
        </Card>

    </BookRoot>;
};

export default Book;


const CustomPurchaseButton = styled(PurchaseButton)`
    width: 170px;
    p{
        color: #000;
    }
`;

const ImageBox = styled.div`
    background: linear-gradient(200.44deg, rgb(67, 22, 219) 13.57%, rgb(144, 118, 231) 98.38%);
    width: 32px;
    height: 32px;

    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;


const Feature = styled(Flex)`
    display: flex;

    color: #fff;

    img{
        filter: invert(100%);
        width: 15px;
    }
`;


const FeatureList = styled(Grid)`

`;

const Desc = styled.p`
    font-weight: 500;
    font-size: 15px;
    max-width: 200px;
    margin: 0 auto;
`;

const Title = styled.h1`
    font-size: 60px;
    color: rgb(255, 255, 255);
    font-weight: 600;
`;

const SubTitle = styled.p`
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
`;


const Card = styled(Flex)`
    flex-direction: column;
    max-width: 360px;
    min-width: 240px;
    width: 100%;

    backdrop-filter: blur(40px);
    padding: 50px 20px;
    border-radius: 0 60px 60px;
    z-index: 2;

    background: rgba(31, 31, 71, 0.6);
    box-shadow: rgba(0, 0, 0, 0.25) 0 40px 80px, rgba(255, 255, 255, 0.15) 0 0 0 0.5px inset;

    transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;

`;

const Bg = styled.div`
    position: absolute;
    max-width: 360px;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(108, 207, 238, 0.5) 0%, rgba(76, 127, 228, 0.5) 100%);
    border-radius: 0 60px 60px;
    transform: matrix(0.99, -0.14, 0.15, 0.99, 0, 0);
    transform-origin: left top;
    z-index: -1;

    transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
`;



const BookRoot = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    height: 426px;

    :hover {
        ${Bg} {
            transform: skewX(10deg) skewY(-20deg) scaleX(0.8) translateY(-3px);
        }

        ${Card} {
            transform: translateY(-3px);
        }
    }

    :nth-child(2) {
        height: 519px;

        :hover {
            ${Bg} {
                transform: skewX(-10deg) skewY(20deg) scaleX(0.8) translateY(-3px);
            }

        }

        ${Card}, ${Bg} {
            border-radius: 60px 60px 60px 0;
        }

        ${Card} {
            background: rgba(31, 31, 71, 0.6);
            box-shadow: rgba(0, 0, 0, 0.25) 0 40px 80px, rgba(255, 255, 255, 0.15) 0 0 0 0.5px inset;
            width: 100%;
            backdrop-filter: blur(40px);
            padding: 50px 20px;
            border-radius: 60px 60px 60px 0;
            z-index: 2;
        }


        ${Bg} {
            height: 519px;
            background: linear-gradient(rgb(47, 184, 255) 0%, rgb(158, 236, 217) 100%);
            transform: matrix(1, 0.14, 0, 0.99, 0, 0);
            transform-origin: left bottom;
        }

    }

    :nth-child(3) {

        :hover {
            ${Bg} {
                transform: skewX(-10deg) skewY(20deg) scaleX(0.8) translateY(-3px);
            }
        }

        ${Card}, ${Bg} {
            border-radius: 60px 0 60px 60px;
        }

        ${Bg} {
            position: absolute;
            background: linear-gradient(rgb(115, 184, 249) 11.94%, rgb(203, 216, 241) 80.98%);
            transform: matrix(0.99, 0.14, -0.15, 0.99, 0, 0);
            transform-origin: right top;
        }

    }
`;
