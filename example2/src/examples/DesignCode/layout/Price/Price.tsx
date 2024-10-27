import styled from 'styled-components';
import {Col, Container, Grid, media} from 'bear-react-grid';
import CertificateCard from '../Profile/_components/CertificateCard';
import Info from './_components/Info';
import Book, {IData} from './_components/Book';
import Pay from './_components/Pay';

interface IProps extends FCProps {
    className?: string
}

const Price = ({
    className,
}: IProps) => {
    const books: IData[] = [
        {
            title: 'Free',
            subTitle: 'BASIC',
            desc: 'Trial',
            features: [
                'Free <span>courses</span>',
                '5 Premium <span>Videos</span>',
                'Notify me, <span>Favorite</span>',
            ],
            button: {
                icon: 'https://designcode.io/images/icons/pen-transparent.svg',
                text: 'Sign Up'
            },
        },
        {
            title: '$ 10',
            subTitle: 'PRO',
            desc: 'per month, billed annually',
            features: [
                'All courses <span>and videos</span>',
                'Source files, <span>ePub</span>',
                'Certificates, <span>Tests</span>',
                'Premium, <span>tutorials</span>',
                'UI, <span>icons, illustrations</span>',
                'Commercial, <span>use</span>',
            ],
            button: {
                icon: 'https://designcode.io/images/icons/credit-transparent.svg',
                text: 'Subscribe'
            },
        },
        {
            title: '$ 15',
            subTitle: 'TEAM',
            desc: 'per member, per month, billed annually',
            features: [
                '5 users',
                'Manage, <span>subscriptions</span>',
                'Team, <span>progress</span>',
            ],
            button: {
                icon: 'https://designcode.io/images/icons/credit-transparent.svg',
                text: 'Subscribe'
            },
        }
    ];

    return <ProfileRoot className={className}>
        <Container>
            <Col col={8} className="mx-auto">
                <Info/>
            </Col>
        </Container>

        <Container fluid="xxl" className="mb-5">
            <Grid col={1} md={3}>
                {books.map((row, index) => {
                    return <Book key={`price_${index}`} data={row}/>;
                })}
            </Grid>
        </Container>

        <Container>
            <Col col={4} className="mx-auto">
                <Pay/>
            </Col>
        </Container>
    </ProfileRoot>;
};

export default Price;



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

const CertificateCardList = styled(Grid)`
  position: relative;
  transform-origin: left top;
    width: 100%;
    transform: scale(0.6);

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

const ProfileRoot = styled.div`
    margin-bottom: 300px;
`;
