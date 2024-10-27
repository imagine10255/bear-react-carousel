import {Grid, media} from 'bear-react-grid';
import styled from 'styled-components';

interface IProps extends FCProps {
}

const CertificateCard = ({
    className,
    style
}: IProps) => {
    return <CertificateCardRoot
        className={className}
        style={style}
        col={2}
    >
        <Header>
            <Title className="mb-2">UI DESIGN</Title>
            <SubTitle>Certifcate</SubTitle>
        </Header>

        <PlatformLogo src="https://designcode.io/images/logos/swiftui-logo.svg" className="justify-self-end"/>


        <Grid col={1} className="gy-1 align-self-end">
            {Array.from({length: 4}).map((row, index) => {
                return <PlaceholderItem key={`placeholderItem_${index}`}/>;
            })}
        </Grid>

    </CertificateCardRoot>;
};

export default CertificateCard;


const PlaceholderItem = styled.div`
    width: 60px;
    height: 4px;
    border-radius: 2px;
    background: white;
    opacity: 0.3;

    :nth-child(2){
        width: 90px;
    }
    :nth-child(3){
        width: 80px;
    }
    :nth-child(4){
        width: 120px;
    }
`;



const PlatformLogo = styled.img`
  width: 44px;
  height: 44px;
  opacity: 1;
    top: 20px;
    right: 20px;
`;


const SubTitle = styled.p`
    font-size: 13px;
    color: rgba(255, 255, 255, .7);
`;

const Title = styled.p`
    font-weight: 600;
    font-size: 15px;
    color: rgba(255, 255, 255, .7);
`;

const Header = styled.div`

`;


const CertificateCardRoot = styled(Grid)`
    width: 335px;
    height: 220px;
    background: radial-gradient(218.51% 281.09% at 100% 100%, rgba(253, 63, 51, 0.6) 0%, rgba(76, 0, 200, 0.6) 45.83%, rgba(76, 0, 200, 0.6) 100%);
    box-shadow: rgba(39, 77, 153, 0.2) 0px 30px 60px, rgba(255, 255, 255, 0.3) 0px 0px 0px 0.5px inset;
    cursor: pointer;
    border-radius: 30px;
    backdrop-filter: blur(20px);
    padding: 20px;

    ${media.md`
       transform: scale(1);
    `}
`;
