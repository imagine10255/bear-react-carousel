import BearCarousel, {BearSlideItem, TBearSlideItemDataList} from 'bear-react-carousel';
import {baseImage as images} from 'config/images';
import React from 'react';
import {ERowAlign, Flex} from 'bear-react-grid';


// 輪播項目
const bearSlideItemData: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideItem as="card">
            <Flex horizontal={ERowAlign.center}
                vertical={ERowAlign.center}
                className="h-100"
                style={{fontSize: '40px', backgroundColor: row.color}}
            >
                {/*<a href="https://carousel.bearests.com" rel="noreferrer" target="_blank">{row.id}</a>*/}
            </Flex>
        </BearSlideItem>
    };
});



const BaseUsed = () => {

    return (
        <BearCarousel
            data={bearSlideItemData}
            slidesPerView={1}
            staticHeight="300px"
            isEnableNavButton
            isEnablePagination
            moveTime={400}
            isDebug
        />
    );

};

export default BaseUsed;
