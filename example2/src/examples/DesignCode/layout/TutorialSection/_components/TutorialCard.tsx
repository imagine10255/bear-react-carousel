import {Grid, Flex} from 'bear-react-grid';
import styled from 'styled-components';

interface IProps extends FCProps {
   className?: string
}

const TutorialCard = ({
    className,
}: IProps) => {
    return <TutorialCardRoot className={className}>
        <Card className="align-content-start gap-2">

            <PlatformLogo src="https://designcode.io/images/logos/swiftui-logo.svg" className="justify-self-end"/>
            <Title>SwiftUI Handbook</Title>
            <Desc className="text-area-overflow">A comprehensive series of tutorials covering Xcode, SwiftUI and all the layout and development techniques</Desc>

            {Array.from({length: 2}).map((row, index) => {
                return <Flex key={`tutorialCar_${index}`} className="align-items-center justify-content-start">
                    <ImageRound>
                        <Image src="https://designcode.io/images/icons/file.svg" alt="file icon" />
                    </ImageRound>
                    <span>107 free tutorials</span>
                </Flex>;
            })}

        </Card>
        <CardB color="linear-gradient(180deg, #408DD5 0%, #630B8C 100%)"/>
    </TutorialCardRoot>;
};

export default TutorialCard;


const Image = styled.img`
    margin: auto;
    width: 20px;
    height: 20px;
`;

const ImageRound = styled.div`
    display: flex;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50px;
`;


const PlatformLogo = styled.img`
  width: 44px;
  height: 44px;
  opacity: 1;
    position: absolute;
    top: 20px;
    right: 20px;
`;


const Item = styled.div`

`;


const Desc = styled.p`
    font-size: 13px;
`;

const Title = styled.h3`
    font-size: 24px;
    width: 100px;
`;



const Card = styled(Flex)`
    width: 240px;
    flex-direction: column;

    position: relative;
    height: 280px;
    backdrop-filter: blur(40px);
    border-radius: 0 30px 40px 40px;
    padding: 20px;
    padding-top: 50px;
    z-index: 1;

    background: rgba(31, 31, 71, 0.6);
    box-shadow: rgba(0, 0, 0, 0.25) 0 40px 80px, rgba(255, 255, 255, 0.15) 0 0 0 0.5px inset;
    transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;

`;


const CardB = styled.div`
    position: absolute;
    width: 220px;
    height: 280px;
    background: linear-gradient(rgb(64, 141, 213) 0%, rgb(99, 11, 140) 100%);
    border-radius: 0 40px 40px;
    transform: skewY(8deg);
    transform-origin: left top;
    top: 0;

    transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
`;

const TutorialCardRoot = styled.div`
    position: relative;

    :hover{
        ${CardB}{
            transform: skewY(15deg);
            width: 200px;
        }

        ${Card}{
            box-shadow: rgba(0, 0, 0, 0.25) 0px 100px 100px, rgba(255, 255, 255, 0.15) 0px 0px 0px 0.5px inset;
            transform: translateY(-3px);
        }
    }
`;
