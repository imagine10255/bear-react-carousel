import styled from 'styled-components';
import {Col, Container, Grid, media, Row} from 'bear-react-grid';
import CertificateCard from './_components/CertificateCard';
import Info from './_components/Info';

interface IProps extends FCProps {
    className?: string
}

const Profile = ({
    className,
}: IProps) => {

    const renderCards = () => {
        return <CertificateCardList>
            {Array.from({length: 4}).map((row, index) => {
                return <CustomCertificateCard
                    key={`certificateCard_${index}`}
                />;
            })}
        </CertificateCardList>;
    };

    return <ProfileRoot className={className}>
        <Row className="align-items-start justify-items-center justify-content-xl-between">
            <Col col={12} lg="auto">
                {renderCards()}
            </Col>
            <Col col={12} lg className="order-first order-lg-last mb-4">
                <Info/>
            </Col>
        </Row>
    </ProfileRoot>;
};

export default Profile;



const CustomCertificateCard = styled(CertificateCard)`
    position: absolute;
    top: 0;
    left: 0;
    transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0s;
    z-index: 4;


    :nth-child(2) {
        top: 20px;
        left: 200px;
        z-index: 3;
        background: radial-gradient(120% 154.37% at 100% 100%, rgba(51, 253, 241, 0.1) 0%, rgba(200, 96, 0, 0.1) 100%);
        box-shadow: rgba(39, 77, 153, 0.2) 0 30px 60px, rgba(0, 0, 0, 0.2) 0 0 0 0.5px inset;
    }

    :nth-child(3) {
        top: 40px;
        left: 280px;
        z-index: 2;
        background: radial-gradient(100% 128.38% at 100% 100%, rgba(51, 168, 253, 0.2) 0%, rgba(76, 0, 200, 0.2) 100%);
        box-shadow: rgba(39, 77, 153, 0.2) 0 30px 60px, rgba(0, 0, 0, 0.2) 0 0 0 0.5px inset;
    }

    :nth-child(4) {
        top: 60px;
        left: 310px;
        z-index: 1;
        background: linear-gradient(rgb(117, 224, 230) 0%, rgb(57, 19, 184) 100%);
        box-shadow: rgba(39, 77, 153, 0.2) 0 30px 60px, rgba(0, 0, 0, 0.2) 0 0 0 0.5px inset;
    }
`;

const CertificateCardList = styled.div`
  position: relative;
  transform-origin: left top;
    width: 100%;
    transform: scale(0.6);
    height: 350px;

    ${media.md`
        transform: scale(1);
        width: 700px;
    `}

    :hover{
        ${CustomCertificateCard}:nth-child(1){
          transform: translate(-30px, 0px) skewX(-10deg) rotateZ(-10deg) scaleX(0.9);

          ${media.xl`
              :hover{
                  transform: translate(-30px, -30px) skewX(-10deg) rotateZ(-10deg) scaleX(0.9);
              }
          `}

        }
        ${CustomCertificateCard}:nth-child(2){
          transform: translate(-120px, -10px) skewX(-10deg) rotateZ(-10deg) scaleX(0.9);

            ${media.xl`
              :hover{
                transform: translate(-120px, -40px) skewX(-10deg) rotateZ(-10deg) scaleX(0.9);
              }
          `}

        }
        ${CustomCertificateCard}:nth-child(3){
          transform: translate(-90px, -20px) skewX(-10deg) rotateZ(-10deg) scaleX(0.9);


            ${media.xl`
               :hover{
                transform: translate(-90px, -50px) skewX(-10deg) rotateZ(-10deg) scaleX(0.9);
            }
          `}


        }
        ${CustomCertificateCard}:nth-child(4){
            transform: translate(-30px, -30px) skewX(-10deg) rotateZ(-10deg) scaleX(0.9);


            ${media.xl`
               :hover{
                    transform: translate(-30px, -60px) skewX(-10deg) rotateZ(-10deg) scaleX(0.9);
                }
          `}

        }
    }
`;

const ProfileRoot = styled(Container)`
    margin-bottom: 300px;
`;
