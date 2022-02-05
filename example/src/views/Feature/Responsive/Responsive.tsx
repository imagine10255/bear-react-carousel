import React, {useState} from 'react';
import BearCarousel, {TSlideItemDataList, SlideItem} from 'bear-carousel';
import {useLocale} from 'library/intl';
import {catImages as images} from 'config/images';

// Components
import Content from '../../_components/Content';
import HowToUse from './HowToUse';
import ImportantNote from '../../../components/atoms/ImportantNote /ImportantNote';



// 輪播項目
const slideItemData: TSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <SlideItem imageUrl={row.imageUrl}/>
    };
});


/**
 * Breakpoints
 */
const Responsive = () => {
    const {i18n} = useLocale();
    const [isLoadData, setIsLoadData] = useState<boolean>(true);


    return <Content
        title={i18n('page.feature.responsive.title')}
        desc={i18n('page.feature.responsive.desc')}
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

        <ImportantNote text={i18n('page.feature.responsive.importantNote')}/>

        <HowToUse/>

    </Content>;
};

export default Responsive;

