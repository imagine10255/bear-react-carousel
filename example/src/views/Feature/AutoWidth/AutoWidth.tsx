import React, {useState} from 'react';
import BearCarousel, {SlideItem, TSlideItemDataList} from 'bear-carousel';
import {diffRatioImages as images} from 'config/images';

// Components
import Content from '../../_components/Content';
import HowToUse from './HowToUse';


// 輪播項目
const slideItemData: TSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <SlideItem imageUrl={row.image}/>
    };
});


/**
 * AutoWidth
 */
const AutoWidth = () => {
    const [isLoadData, setIsLoadData] = useState<boolean>(true);

    return <Content
        title="Auto Width"
        desc="Display according to the width of the image itself"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >
        <div className="mb-4">
            <BearCarousel
                data={isLoadData ? slideItemData: []}
                slidesPerView="auto"
                staticHeight="200px"
                isEnableNavButton
                isEnablePagination
            />
        </div>

        <HowToUse/>


    </Content>;
};

export default AutoWidth;

