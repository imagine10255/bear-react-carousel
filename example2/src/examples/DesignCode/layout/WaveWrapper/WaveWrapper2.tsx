import styled from 'styled-components';
import React from 'react';

interface IProps extends FCProps {
    className?: string;
}

const WaveWrapper2 = ({
    className,
}: IProps) => {
    return <WaveWrapperRoot className={className}>
        <Wave1>
            <svg width="1440" height="699" viewBox="0 0 1440 699" fill="none" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="wave1">
                    <path
                        d="M872.997 77.086C660.195 -4.80687 653.497 83.6068 489.997 97.5861C326.497 111.565 310.746 85.3511 145.358 66.805C-20.0297 48.2589 -65.6199 90.9733 -144.742 110.754C-144.742 198.686 -150 739 -150 739L1508.86 739L1508.86 0.403809C1508.86 0.403809 1086.19 159.129 872.997 77.086Z"/>
                </clipPath>
            </svg>
        </Wave1>
        <Wave2>
            <svg width="1440" height="699" viewBox="0 0 1440 699" fill="none" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="wave2">
                    <path
                        d="M1175.8 62.9028C962.86 -18.9901 952.676 -4.07674 730.548 14.9028C508.419 33.8824 439.745 81.449 274.248 62.9029C108.752 44.3568 21.0657 67.9805 -58.1089 87.7612C-58.1089 175.694 -58.1091 584 -58.1091 584L1464.99 584L1464.99 62.9027C1464.99 62.9027 1389.13 144.946 1175.8 62.9028Z"/>
                </clipPath>
            </svg>
        </Wave2>
        <Wave3>
            <svg width="1440" height="699" viewBox="0 0 1440 699" fill="none" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="wave3">
                    <path
                        d="M1175.8 62.9028C962.86 -18.9901 952.676 -4.07674 730.548 14.9028C508.419 33.8824 439.745 81.449 274.248 62.9029C108.752 44.3568 21.0657 67.9805 -58.1089 87.7612C-58.1089 175.694 -58.1091 584 -58.1091 584L1464.99 584L1464.99 62.9027C1464.99 62.9027 1389.13 144.946 1175.8 62.9028Z"/>
                </clipPath>
            </svg>
        </Wave3>
        <Line/>
    </WaveWrapperRoot>;
};

export default WaveWrapper2;






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
    z-index: -1;
    overflow: hidden;
    transform-origin: left top;
    clip-path: url(#wave1);
    top: 0;
    //height: 250px;
    background: linear-gradient(200.44deg, rgb(67, 22, 219) 13.57%, rgb(144, 118, 231) 58.38%);
    opacity: 0.2;

    svg > clipPath {
        transform: scale(1.5);
        left: -20px;
    }
`;

const Wave2 = styled.div`
    position: absolute;
    width: 100%;
    z-index: -1;
    overflow: hidden;
    transform-origin: left top;
    clip-path: url(#wave2);
    top: 80px;
    //height: 250px;
    background: linear-gradient(132.86deg, rgb(255, 36, 36) -4.28%, rgb(193, 52, 122) 14.43%, rgb(73, 30, 184) 34.1%);


    svg > clipPath {
      transform: scale(1.1);
      left: -1px;
    }
`;

const Wave3 = styled.div`
    position: absolute;
    width: 100%;
    z-index: -1;
    overflow: hidden;
    transform-origin: left top;
    clip-path: url(#wave3);
    top: 40px;
    //height: 500px;
    //background: linear-gradient(rgba(242, 246, 255, 0.5) 0%, rgb(242, 246, 255) 40%);
    backdrop-filter: saturate(200%);
    background: linear-gradient(rgba(31, 31, 71, 0.25) -18.72%, rgb(31, 31, 71) 37.6%);



    svg > clipPath {
        transform: scale(2.2);
        left: -1px;
    }
`;

const Line = styled.div`
    position: absolute;
    background-position: center top;
    background-repeat: no-repeat;
    top: 380px;
    background-image: url(https://designcode.io/images/waves/certificate-lines.svg);
    height: 600px;
    background-size: 1440px;
    width: 100%;
    z-index: 0;
`;


const WaveWrapperRoot = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;

    height: 1500px;

    width: 100%;
    overflow: hidden;
    display: block;
    pointer-events: none;

`;
