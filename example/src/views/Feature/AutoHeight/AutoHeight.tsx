import React, {useState} from 'react';
import styled from 'styled-components/macro';
import BearCarousel from 'bear-carousel';
import Code from 'components/atoms/Code';
import Content, {SubTitle} from '../../_components/Content';
import {gameImages as images} from 'config/images';
import ImportantNote from 'components/atoms/ImportantNote ';

const carouselData = images.map(row => {
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
 * AutoHeight
 */
const AutoHeight = () => {
    const [isLoadData, setIsLoadData] = useState<boolean>(true);



    return <Content
        title="Auto Height"
        desc="Use the height of the image itself"
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

        <ImportantNote>
            <p>當圖片是由非同步取得時, 你的畫面會從0px 突然把畫面撐開, 若在意這個問題, 建議可以使用 背景模式</p>
            <p>不過, 優點是你不需要管項目的大小</p>
        </ImportantNote>

        <SubTitle>Source Code</SubTitle>
        <Code language="typescript">
            {`


const carouselData = images.map(row => {
    return {
        key: row.id,
        children: <img className="img-fluid" src={row.image}/>
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

export default AutoHeight;


const CarouselBox = styled.div`
`;




