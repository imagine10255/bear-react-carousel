import React, {useState} from 'react';
import BearCarousel, {TSlideItemDataList, SlideItem} from 'bear-carousel';
import {racingImages as images} from 'config/images';

// Components
import Code from 'components/atoms/Code';
import Content, {SubTitle} from '../../_components/Content';



// 輪播項目
const slideItemData: TSlideItemDataList  = images.map(row => {
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
                isEnableMouseMove
                isEnablePagination
                isEnableLoop
                aspectRatio={{widthRatio: 22, heightRatio: 9}}
                breakpoints={{
                    768: {
                        slidesPerView: 2,
                        isEnableLoop: false,
                        isEnablePagination: false,
                        isEnableNavButton: false,
                        aspectRatio: {widthRatio: 16, heightRatio: 9}
                    },
                    1200: {
                        slidesPerView: 4,
                        isEnableLoop: true,
                        isEnablePagination: true,
                        isEnableNavButton: true,
                        aspectRatio: {widthRatio: 32, heightRatio: 9}
                    }
                }}

            />
        </div>

        <SubTitle>Source Code</SubTitle>
        <Code language="typescript">
            {`

<BearCarousel
    data={carouselData}
    slidesPerView={1}
    isEnableMouseMove
    isEnablePagination
    isCenteredSlides
    isEnableLoop
    breakpoints={{
      768: {
        slidesPerView: 2,
        isEnableLoop: false,
        isEnablePagination: false,
        isEnableNavButton: false,
        isEnableMouseMove: false
      },
      1200: {
        slidesPerView: 4,
        isEnableLoop: true,
        isEnablePagination: true,
        isEnableNavButton: true,
        isEnableMouseMove: true
      }
    }}
/>
        `}
        </Code>

    </Content>;
};

export default Breakpoints;

