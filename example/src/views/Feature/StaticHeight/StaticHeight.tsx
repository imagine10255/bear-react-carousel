import React, {useState} from 'react';
import styled from 'styled-components/macro';
import BearCarousel, {SlideItem, TSlideItemDataList} from 'bear-carousel';
import Content, {SubTitle} from '../../_components/Content';
import ImportantNote from 'components/atoms/ImportantNote ';
import {catImages as images} from 'config/images';
import HowToUse from './HowToUse';

// 輪播項目
const slideItemData: TSlideItemDataList  = images.map(row => {
    return {
        key: row.id,
        children: <SlideItem imageUrl={row.image}/>
    };
});



/**
 * StaticHeight
 */
const StaticHeight = () => {
    const [isLoadData, setIsLoadData] = useState<boolean>(true);



    return <Content
        title="Static Height"
        desc="Use the height of the image itself"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >
        <CarouselBox className="mb-4">
            <BearCarousel
                data={isLoadData ? slideItemData: []}
                slidesPerView={1}
                staticHeight="200px"
                isEnableNavButton
                isEnablePagination
            />
        </CarouselBox>

        <ImportantNote>
            <p>當圖片是由非同步取得時, 你的畫面會從0px 突然把畫面撐開, 若在意這個問題, 建議可以使用 背景模式</p>
            <p>不過, 優點是你不需要管項目的大小</p>
        </ImportantNote>

        <HowToUse/>



    </Content>;
};

export default StaticHeight;


const CarouselBox = styled.div`
`;




