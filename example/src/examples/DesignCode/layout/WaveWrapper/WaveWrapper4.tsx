import styled from 'styled-components';
import React from 'react';

interface IProps extends FCProps {
    className?: string;
}

const WaveWrapper4 = ({
    className,
}: IProps) => {
    return <WaveWrapperRoot className={className}>
        <RandomWave1>
            <svg width="1440" height="699" viewBox="0 0 1440 699" fill="none" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="wave1">
                    <path
                        d="M1075 93.4995C1018.5 85.9711 978.769 76.9106 916 41.9996C837.581 -1.61518 790.5 0.999031 669 0.999031C547.5 0.999031 484.744 53.7276 398.5 20.9992C328.97 -5.38623 314 40.9991 181.5 20.9991C49 0.999067 0.258789 0.99907 0.258789 0.99907C0.258789 87.821 0.25879 435.567 0.25879 435.567L1504.12 435.567L1504.12 155C1504.12 155 1335.5 111 1278 103C1220.5 95.0004 1203.09 145.713 1167.5 127.499C1126.21 106.367 1131.5 101.028 1075 93.4995Z"
                        fill="url(#paint0_linear)"/>
                </clipPath>
            </svg>
        </RandomWave1>

        <RandomWave2>
            <svg width="1440" height="699" viewBox="0 0 1440 699" fill="none" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="wave2">
                    <path
                        d="M1192 63.1469C979.197 -18.7459 969.021 -3.8326 747.038 15.147C525.055 34.1266 456.426 81.6931 291.038 63.147C125.65 44.6009 38.0215 68.2247 -41.1011 88.0053C-41.1011 175.938 -41.1013 376.556 -41.1013 376.556L1481 376.556L1481 63.1469C1481 63.1469 1405.19 145.19 1192 63.1469Z"
                        fill="url(#paint0_linear)"/>
                </clipPath>
            </svg>
        </RandomWave2>
    </WaveWrapperRoot>;
};

export default WaveWrapper4;





const RandomWave1 = styled.div`
    position: absolute;
    width: 100%;
    z-index: -1;
    overflow: hidden;
    transform-origin: left top;
    clip-path: url(#wave1);
    top: 0;
    height: 250px;
    animation: 1s ease 0s 1 normal forwards running jBcSpD;
    display: block;
    background: linear-gradient(rgb(23, 106, 177) 11.94%, rgb(203, 216, 241) 80.98%);

    svg > clipPath {
        transform: scale(1.5);
        left: -1px;
    }
`;

const RandomWave2 = styled.div`
    position: absolute;
    width: 100%;
    z-index: -1;
    overflow: hidden;
    transform-origin: left top;
    clip-path: url(#wave2);
    top: 83px;
    height: 600px;
    background: linear-gradient(rgba(19, 12, 62, 0.8) 0%, rgb(30, 19, 87) 28%);

    svg > clipPath {
        transform: scale(1.5);
        left: -1px;
    }
`;


const WaveWrapperRoot = styled.div`
    position: absolute;
    height: calc(100% + 250px);
    width: 100%;
    overflow: hidden;
    animation: 1s ease 0s 1 normal forwards running jBcSpD;
    top: -200px;
    z-index: -1;
    pointer-events: none;

`;
