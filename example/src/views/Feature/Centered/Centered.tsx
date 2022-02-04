import React, {useState} from 'react';
import BearCarousel, {TSlideItemDataList, SlideItem} from 'bear-carousel';
import {catImages as images} from 'config/images';
import HowToUse from './HowToUse';

// Components
import Content from '../../_components/Content';



// 輪播項目
const SlideItemData: TSlideItemDataList  = images.map(row => {
    return {
        key: row.id,
        children: <SlideItem imageUrl={row.image}/>
    };
});


/**
 * Centered
 */
const Centered = () => {
    const [isLoadData, setIsLoadData] = useState<boolean>(true);


    return <Content
        title="Centered"
        desc="Moved items as to the central position"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >
        <div className="mb-4">
            <BearCarousel
                data={isLoadData ? SlideItemData: []}
                slidesPerView={3}
                spaceBetween={10}
                isCenteredSlides
                aspectRatio={{widthRatio: 32, heightRatio: 9}}
            />
        </div>

        <HowToUse/>
    </Content>;
};

export default Centered;
