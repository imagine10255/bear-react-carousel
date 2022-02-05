import React from 'react';
import Code from 'components/atoms/Code';
import {SubTitle} from '../../_components/Content';
import {useLocale} from 'library/intl';


/**
 * How To Use
 */
const HowToUse = () => {
    const {i18n} = useLocale();

    return <>
        <SubTitle>{i18n('common.howToUse')}</SubTitle>
        <Code language="typescript">
            {`
import BearCarousel, {SlideItem, TSlideItemDataList} from 'bear-carousel';

const slideItemData: TSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <SlideItem imageUrl={row.imageUrl}/>
    };
});

<Carousel 
    data={slideItemData} 
    staticHeight="250px"
/>

        `}
        </Code>
    </>;
};

export default HowToUse;






