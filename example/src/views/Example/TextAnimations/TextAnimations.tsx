import React, {useState} from 'react';
import {useLocale} from 'library/intl';
import Content from '../../_components/Content';
import TextCarousel from './TextCarousel';




/**
 * Text Animations
 */
const TextAnimations = () => {
    const {i18n} = useLocale();
    const [isLoadData, setIsLoadData] = useState<boolean>(true);

    return <Content
        title={i18n('page.example.textAnimations.title')}
        desc={i18n('page.example.textAnimations.desc')}
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >
        <div className="mb-4">
            <TextCarousel isLoadData={isLoadData}/>
        </div>


    </Content>;
};

export default TextAnimations;
