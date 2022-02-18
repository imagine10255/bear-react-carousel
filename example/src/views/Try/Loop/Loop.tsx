import BearCarousel, {BearSlideItem, TBearSlideItemDataList} from 'bear-carousel';
import {baseImage as images} from 'config/images';
import React from 'react';
import {ERowAlign, Flex} from 'bear-styled-grid';


// 輪播項目
const bearSlideItemData: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideItem imageUrl={row.imageUrl}/>
    };
});



const Loop = () => {

    return (
        <BearCarousel
            data={bearSlideItemData}
            slidesPerView={1}
            staticHeight="300px"
            isEnableLoop
            isEnableNavButton
            isEnablePagination
            moveTime={350}
            isDebug
        />
    );

};

export default Loop;
