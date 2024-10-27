import styled from 'styled-components';
import React from 'react';
import {media} from 'bear-react-grid';

interface IProps extends FCProps {
    className?: string;
}

const WaveWrapper3 = ({
    className,
}: IProps) => {
    return <WaveWrapperRoot className={className}>

        <Wave1/>
        <Wave2/>
        <Wave3/>
        <Blur>
            <BackgroundBlur1/>
            <BackgroundBlur2/>
        </Blur>
        <Wave4/>
        <Wave5/>


        <RandomWave>
            <svg style={{position: 'absolute'}}>
                <clipPath id="wave6">
                    <path
                        d="M1192 63.1469C979.197 -18.7459 969.021 -3.8326 747.038 15.147C525.055 34.1266 456.426 81.6931 291.038 63.147C125.65 44.6009 38.0215 68.2247 -41.1011 88.0053C-41.1011 175.938 -41.1013 376.556 -41.1013 376.556L1481 376.556L1481 63.1469C1481 63.1469 1405.19 145.19 1192 63.1469Z"
                        fill="url(#paint0_linear)"/>
                </clipPath>
            </svg>
        </RandomWave>
    </WaveWrapperRoot>;
};

export default WaveWrapper3;

const Wave1 = styled.div`
    position: absolute;
    width: 100%;
    background-position: center top;
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: -1;
    top: 0;
    background-image: url(https://designcode.io/images/waves/testimonial-wave1.svg);
    height: 800px;

`;

const Wave2 = styled.div`
    position: absolute;
    width: 100%;
    background-position: center top;
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: -1;
    top: 250px;
    background-image: url(https://designcode.io/images/waves/testimonial-wave2.svg);
    height: 600px;


`;

const Wave3 = styled.div`
    position: absolute;
    width: 100%;
    background-position: center top;
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: -1;
    top: 380px;
    background-image: url(https://designcode.io/images/waves/testimonial-wave3.svg);
    height: 600px;


`;


const Wave4 = styled.div`
    position: absolute;
    width: 100%;
    background-position: center top;
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: -1;
    top: 200px;
    background-image: url(https://designcode.io/images/waves/testimonial-wave4.svg);
    height: 1000px;


`;

const Wave5 = styled.div`
    position: absolute;
    width: 100%;
    background-position: center top;
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: -1;
    top: 450px;
    background-image: url(https://designcode.io/images/waves/testimonial-wave5.svg);
    height: 1000px;


`;

const BackgroundBlur2 = styled.div`
    position: absolute;
    width: 400px;
    height: 150px;
    backdrop-filter: blur(30px);
    top: 560px;
    left: auto;
    right: -50px;
`;

const BackgroundBlur1 = styled.div`
    position: absolute;
    top: 350px;
    left: -50px;
    width: 400px;
    height: 150px;
    backdrop-filter: blur(30px);
`;

const Blur = styled.div`
    filter: blur(30px);
`;

const RandomWave = styled.div`
    position: absolute;
    width: 100%;
    z-index: -1;
    overflow: hidden;
    transform-origin: left top;
    top: 800px;
    height: 500px;
    clip-path: url(#wave6);
    background: linear-gradient(rgba(31, 31, 71, 0.25) -18.72%, rgb(31, 31, 71) 37.6%);

    svg > clipPath {
        transform: scale(1.5);
        left: -1px;
    }
`;


const WaveWrapperRoot = styled.div`
    position: absolute;
    height: 1500px;
    width: 100%;
    overflow: hidden;
    animation: 1s ease 0s 1 normal forwards running jBcSpD;
    top: 120px;
    pointer-events: none;

`;
