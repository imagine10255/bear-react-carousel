import React, {useState} from 'react';
import BearCarousel, {SliderItem} from 'bear-carousel';
import Code from 'components/atoms/Code';
import Content, {SubTitle} from '../../_components/Content';
import {diffRatioImages as images} from 'config/images';
import {ICarouselData} from '../../../../../src/Carousel';


// 輪播項目
const sliderItemData: ICarouselData[]  = images.map(row => {
    return {
        key: row.id,
        children: <SliderItem imageUrl={row.image}/>
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
                style={{height: '200px'}}
                data={isLoadData ? sliderItemData: []}
                slidesPerView="auto"
                isEnableNavButton
                isEnablePagination
            />
        </div>

        <SubTitle>Source Code</SubTitle>
        <Code language="typescript">
            {`
const carouselData = images.map(row => {
    return {
        key: row.id,
        children: <img
          src={row.image}
          style={{
              height: '200px'
          }}
        />
    };
});

<BearCarousel
    data={carouselData}
    slidesPerView="auto"
    isEnableNavButton
    isEnablePagination
/>
        `}
        </Code>

    </Content>;
};

export default AutoWidth;

