import React, {useState} from 'react';
import styled from 'styled-components/macro';
import BearCarousel, {ICarouselData} from 'bear-carousel';
import Code from 'components/atoms/Code';
import Content, {SubTitle} from '../../_components/Content';
import {gameImages as images} from 'config/images';


// 輪播項目
const carouselData: ICarouselData[] = images.map(row => {
    return {
        key: row.id,
        children: <div
            style={{
                backgroundImage: `url(${row.image})`,
                backgroundSize: 'cover',
                aspectRatio: '32 / 9',
            }}/>
    };
});

/**
 * PerViewAuto
 */
const UseBackground = () => {

    const [isLoadData, setIsLoadData] = useState<boolean>(true);

    return <Content
        title="Use Background"
        desc="Use background image"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >

        <CarouselBox className="mb-4">
            <BearCarousel
                data={isLoadData ? carouselData: []}
                slidesPerView={1}
                isEnableNavButton
                isEnablePagination
            />
        </CarouselBox>

        <SubTitle>Source Code</SubTitle>
        <Code language="typescript">
            {`


const carouselData = images.map(row => {
    return {
        key: row.id,
        children: <div style={{
            backgroundImage: \`url(\$\{row.image\})\`,
            backgroundSize: 'cover',
            aspectRatio: '32 / 9',
        }}/>
    };
});

<BearCarousel
    data={carouselData}
    slidesPerView={1}
    isEnableNavButton
    isEnablePagination
/>

        `}
        </Code>

    </Content>;
};

export default UseBackground;



const CarouselBox = styled.div`
  aspect-ratio: 32 / 9;
`;




