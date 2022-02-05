import React, {useState} from 'react';
import BearCarousel, {TSlideItemDataList, SlideItem} from 'bear-carousel';
import {catImages as images} from 'config/images';

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
 * Breakpoints
 */
const Breakpoints = () => {
    const [isLoadData, setIsLoadData] = useState<boolean>(true);


    return <Content
        title="Breakpoints"
        desc="Display settings according to responsive size"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >
        <div className="mb-4">
            <BearCarousel
                data={isLoadData ? slideItemData: []}
                slidesPerView={1}
                aspectRatio={{widthRatio: 22, heightRatio: 9}}
                isEnablePagination
                isEnableLoop
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                        aspectRatio: {widthRatio: 16, heightRatio: 9},
                        isEnableLoop: false,
                        isEnablePagination: false,
                        isEnableNavButton: false,
                    },
                    1200: {
                        slidesPerView: 4,
                        aspectRatio: {widthRatio: 32, heightRatio: 9},
                        isEnableLoop: true,
                        isEnablePagination: true,
                        isEnableNavButton: true,
                    }
                }}

            />
        </div>

        <HowToUse/>

    </Content>;
};

export default Breakpoints;

