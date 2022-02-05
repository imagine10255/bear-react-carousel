import React, {useState} from 'react';
import BearCarousel, {TSlideItemDataList, SlideItem} from 'bear-carousel';
import {catImages as images} from 'config/images';
import {useLocale} from 'library/intl';
import HowToUse from './HowToUse';

// Components
import Content from '../../_components/Content';
import ImportantNote from '../../../components/atoms/ImportantNote /ImportantNote';



// 輪播項目
const slideItemData: TSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <SlideItem imageUrl={row.image}/>
    };
});


/**
 * Centered
 */
const Centered = () => {
    const {i18n} = useLocale();
    const [isLoadData, setIsLoadData] = useState<boolean>(true);


    return <Content
        title={i18n('page.feature.centered.title')}
        desc={i18n('page.feature.centered.desc')}
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >

        <div className="mb-4">
            <BearCarousel
                data={isLoadData ? slideItemData: []}
                slidesPerView={3}
                spaceBetween={10}
                isCenteredSlides
                aspectRatio={{widthRatio: 32, heightRatio: 9}}
            />
        </div>

        <ImportantNote text={i18n('page.feature.centered.importantNote')}/>

        <HowToUse/>
    </Content>;
};

export default Centered;
