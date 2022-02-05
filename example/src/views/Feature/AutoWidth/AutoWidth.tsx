import React, {useState} from 'react';
import BearCarousel, {SlideItem, TSlideItemDataList} from 'bear-carousel';
import {diffImages as images} from 'config/images';
import {useLocale} from 'library/intl';

// Components
import Content from '../../_components/Content';
import HowToUse from './HowToUse';
import ImportantNote from 'components/atoms/ImportantNote ';


// 輪播項目
const slideItemData: TSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <SlideItem imageUrl={row.imageUrl}/>
    };
});


/**
 * AutoWidth
 */
const AutoWidth = () => {
    const {i18n} = useLocale();
    const [isLoadData, setIsLoadData] = useState<boolean>(true);

    return <Content
        title={i18n('page.feature.autoWidth.title')}
        desc={i18n('page.feature.autoWidth.desc')}
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
        <ImportantNote text={i18n('page.feature.autoWidth.importantNote')}/>

        <HowToUse/>


    </Content>;
};

export default AutoWidth;

