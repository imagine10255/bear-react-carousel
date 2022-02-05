import React, {useState} from 'react';
import BearCarousel, {SlideItem, TSlideItemDataList} from 'bear-carousel';
import Content from '../../_components/Content';
import {catImages as images} from 'config/images';
import HowToUse from './HowToUse';
import {useLocale} from 'library/intl';

// 輪播項目
const slideItemData: TSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <SlideItem imageUrl={row.imageUrl}/>
    };
});



/**
 * Aspect Ratio
 */
const AspectRatioHeight = () => {
    const {i18n} = useLocale();
    const [isLoadData, setIsLoadData] = useState<boolean>(true);


    return <Content
        title={i18n('page.feature.aspectRatioHeight.title')}
        desc={i18n('page.feature.aspectRatioHeight.desc')}
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >
        <div className="mb-4">
            <BearCarousel
                data={isLoadData ? slideItemData: []}
                slidesPerView={1}
                aspectRatio={{widthRatio: 16, heightRatio: 9}}
                isEnableNavButton
                isEnablePagination
            />
        </div>

        <HowToUse/>

    </Content>;
};

export default AspectRatioHeight;
