import React, {useState} from 'react';
import BearCarousel, {SlideItem, TSlideItemDataList} from 'bear-carousel';
import {diffImages as images} from 'config/images';

// Components
import Content from '../../_components/Content';
import HowToUse from './HowToUse';
import ImportantNote from 'components/atoms/ImportantNote ';


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

        <ImportantNote>
            注意Safari無法使用 height100%, 需要設定直接得高度 否則會導致比例判定失效 圖片等比例但是占位撐開100%
        </ImportantNote>

    </Content>;
};

export default AutoWidth;

