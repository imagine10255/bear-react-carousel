import React, {useState} from 'react';
import Content from '../../_components/Content';
import TextCarousel from './TextCarousel';




/**
 * Text Animations
 */
const TextAnimations = () => {
    const [isLoadData, setIsLoadData] = useState<boolean>(true);

    return <Content
        title="TextAnimations"
        desc="Text Animations"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >
        <div className="mb-4">
            <TextCarousel isLoadData={isLoadData}/>
        </div>


    </Content>;
};

export default TextAnimations;
