import styled from 'styled-components';
import React from 'react';
import {media} from 'bear-react-grid';

interface IProps extends FCProps {
   className?: string
}

const WaveWrapper1 = ({
    className,
}: IProps) => {
    return <WaveWrapperRoot className={className}>
        <Wave1/>
        <BackgroundBlur/>
        <Wave2/>
        <Wave3>
            <svg>
                <clipPath id="clip">
                    <path d="M1175.65 35.7644C962.846 -46.1285 865.751 35.6288 643.768 54.6084C421.786 73.588 391.68 33.0436 226.292 14.4975C60.9034 -4.0486 11.1228 90.8729 -67.9998 110.654C-67.9998 198.586 -67.9998 516 -67.9998 516L1508.19 516L1508.19 8.45359C1508.19 8.45359 1388.84 117.807 1175.65 35.7644Z"/>
                </clipPath>
            </svg>
        </Wave3>
        <Stars/>
    </WaveWrapperRoot>;
};

export default WaveWrapper1;





const NavigatorWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, auto);
  gap: 26px;
`;



const BackgroundBlur = styled.div`
  position: absolute;
  width: 100%;
  height: 800px;
  backdrop-filter: blur(60px);
`;



const Wave1 = styled.div`
  position: absolute;
  width: 100%;
  background-position: center top;
  background-repeat: no-repeat;
  background-size: 250%;
  top: 137px;
  height: 900px;
  background-image: url(https://designcode.io/images/waves/hero-wave1.svg);

    ${media.lg`
        background-size: 100%;
    `}
`;

const Wave2 = styled.div`
  position: absolute;
  width: 100%;
  background-position: center top;
  background-repeat: no-repeat;
  background-size: 100%;
  top: 380px;
  left: 0px;
  height: 600px;
  background-image: url(https://designcode.io/images/waves/hero-wave2.svg);
`;

const Wave3 = styled.div`
  position: absolute;
  width: 100%;
  top: 520px;
  height: 500px;
  clip-path: url(#clip);
  transform-origin: left top;
  background: linear-gradient(rgba(31, 31, 71, 0.25) -18.72%, rgb(31, 31, 71) 37.6%);

  svg > clipPath{
    transform: scale(1.5);
  }
`;

const Stars = styled.div`
    position: absolute;
    width: 100%;
    background-position: center top;
    background-repeat: repeat;
    background-image: url(https://designcode.io/images/backgrounds/stars.svg);
    height: 224px;
    top: 10px;
`;


const WaveWrapperRoot = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
    pointer-events: none;

`;
