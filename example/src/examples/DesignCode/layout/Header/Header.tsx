import styled from 'styled-components';
import React from 'react';
import {Container, Flex, Grid, GridCol} from 'bear-react-grid';
import Button from './_components/Button';

interface IProps extends FCProps {
    className?: string;
}

const Header = ({
    className,
}: IProps) => {

    const renderMockups = () => {
        return <Mockups>
            <Mockup1>
                <Mockup1Img src="https://designcode.io/images/mockups/mockup-card2.svg"/>
            </Mockup1>
            <Mockup2>
                <Mockup2Img src="https://designcode.io/images/mockups/mockup-card2.svg"/>
            </Mockup2>
            <MockupContent>
                <MockupContentImg src="https://designcode.io/images/mockups/mockup-content.svg"/>
            </MockupContent>

            <Mockup4>
                <Mockup4Img src="https://designcode.io/images/mockups/mockup2-bg.svg"/>
            </Mockup4>
            <Mockup5>
                <Mockup5Img src="https://designcode.io/images/mockups/mockup3-bg.svg"/>
            </Mockup5>

        </Mockups>;
    };


    const renderTextWrapper = () => {
        return <Flex className="flex-column gap-4">
            <Title>
                Design
                <div>and code</div>
                <span>React</span>apps
            </Title>

            <SubTitle>
                Don’t skip design. Learn design and code, by building real apps with React and Swift. Complete courses
                about the best tools.
            </SubTitle>


            <Button/>

            <P>Purchase includes access to 50+ courses, 320+ premium tutorials, 300+ hours of videos, source files and
                certificates.</P>
        </Flex>;
    };

    const renderAnimationWrapper = () => {
        return <AnimationWrapper>
            <SquareAnimation>
                {Array.from({length: 8}).map(idx => {
                    return <Square key={`square_${idx}`}/>;
                })}
            </SquareAnimation>
        </AnimationWrapper>;
    };


    return <HeaderRoot className={className}>
        <Flex className="justify-content-between">
            {/*{renderAnimationWrapper()}*/}
            {renderTextWrapper()}
            {renderMockups()}
        </Flex>
    </HeaderRoot>;
};

export default Header;


const Mockup5Img = styled.img`
  width: 414px;
  height: 273px;

  // opacity: 0;
  animation: 1s ease 0s 1 normal forwards running jBcSpD;
`;

const Mockup5 = styled.div`
  background: rgba(23, 12, 61, 0.2);
  width: 414px;
  height: 273px;
  border-radius: 10px;
  position: absolute;
  top: 250px;
  left: 410px;
  backdrop-filter: blur(10px);
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset;
`;

const Mockup4Img = styled.img`
  width: 400px;
  height: 273px;

  // opacity: 0;
  animation: 1s ease 0s 1 normal forwards running jBcSpD;
`;

const Mockup4 = styled.div`
  background: rgba(23, 12, 61, 0.2);
  width: 400px;
  height: 273px;
  border-radius: 10px;
  position: absolute;
  top: 220px;
  left: 77px;
  backdrop-filter: blur(10px);
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset;
`;

const MockupContentImg = styled.img`
  width: 701px;
  height: 428px;

  // opacity: 0;
  animation: 1s ease 0s 1 normal forwards running jBcSpD;
`;

const MockupContent = styled.div`
  background: rgba(23, 12, 61, 0.3);
  width: 701px;
  height: 428px;
  border-radius: 10px;
  position: absolute;
  top: 50px;
  left: 37px;
  backdrop-filter: blur(10px);
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset;
`;

const Mockup2Img = styled.img`
  width: 183px;
  height: 120px;

  // opacity: 0;
  animation: 1s ease 0s 1 normal forwards running jBcSpD;
`;

const Mockup2 = styled.div`
  background: linear-gradient(192.64deg, rgb(67, 22, 219) 12.72%, rgb(144, 118, 231) 54.49%, rgb(162, 238, 255) 100.01%);
  width: 183px;
  height: 120px;
  position: absolute;
  top: 0;
  left: 211px;
  border-radius: 10px;
`;


const Mockup1Img = styled.img`
  width: 183px;
  height: 120px;

  // opacity: 0;
  animation: 1s ease 0s 1 normal forwards running jBcSpD;
`;

const Mockup1 = styled.div`
  background: radial-gradient(218.51% 281.09% at 100% 100%, rgba(253, 63, 51, 0.6) 0%, rgba(76, 0, 200, 0.6) 45.83%, rgba(76, 0, 200, 0.6) 100%);
  width: 183px;
  height: 120px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset;
`;


const Mockups = styled.div`
  position: relative;
  width: 825px;
`;


const P = styled.p`

  font-weight: normal;
  font-size: 13px;
  margin: 0;
  max-width: 280px;
`;


const SubTitle = styled.div`

  font-weight: normal;
  font-size: 17px;
  margin: 0;
  max-width: 300px;
  color: black !important;
`;


const Title = styled.h1`
  word-wrap: break-word;
  color: rgb(255, 255, 255);
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    font-weight: 700;
    font-size: 60px;
  background: linear-gradient(rgb(115, 0, 64) 0%, rgb(48, 28, 190) 100%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;

 > div{
     font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
     font-weight: 700;
     font-size: 60px;
 }

  > span{
    margin: 0 5px;
    color: rgb(255, 255, 255);
    background: linear-gradient(rgb(255, 215, 255) 0%, rgb(255, 182, 255) 100%);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
`;


const TextWrapper = styled(Grid)`
  //position: relative;
  //top: 200px;
  //display: grid;
  //  width: 400px;
  //  grid-column: 1;
`;


const Square = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
  top: 0px;
  // opacity: 0;
  animation: 50s ease-in-out 0s infinite reverse none paused eoUyJr;
  transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  will-change: transform;

  :nth-child(1) {
    transform: translate(10px, 10px);
    border: 2px solid rgba(255, 255, 255, 0.5);
    animation-delay: 0.2s;
    animation-duration: 25s;
  }

  :nth-child(2) {
    transform: translate(20px, 20px);
    border: 1.5px solid rgba(255, 255, 255, 0.4);
    animation-delay: 0.4s;
    animation-duration: 24s;
  }

  :nth-child(3) {
    transform: translate(30px, 30px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    animation-delay: 0.6s;
    animation-duration: 23s;
  }

  :nth-child(4) {
    transform: translate(40px, 40px);
    border: 0.75px solid rgba(255, 255, 255, 0.3);
    animation-delay: 0.8s;
    animation-duration: 22s;
  }

  :nth-child(5) {
    transform: translate(50px, 50px);
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    animation-delay: 1s;
    animation-duration: 21s;
  }

  :nth-child(6) {
    transform: translate(60px, 60px);
    border: 0.5px solid rgba(255, 255, 255, 0.2);
    animation-delay: 1.2s;
    animation-duration: 20s;
  }

  :nth-child(7) {
    transform: translate(70px, 70px);
    border: 0.5px solid rgba(255, 255, 255, 0.2);
    animation-delay: 1.4s;
    animation-duration: 19s;
  }

  :nth-child(8) {
    transform: translate(80px, 80px);
    border: 0.5px solid rgba(255, 255, 255, 0.1);
    animation-delay: 1.6s;
    animation-duration: 18s;
  }

`;


const SquareAnimation = styled.div`
  position: relative;
  perspective: 3000px;
  animation: 2s linear 2s 1 normal forwards paused gWpsBT;
  visibility: hidden;
  will-change: opacity;
  display: none;
`;

const AnimationWrapper = styled.div`
  position: absolute;
  top: 150px;
  left: -60px;
`;


const HeaderRoot = styled(Container)`
`;

