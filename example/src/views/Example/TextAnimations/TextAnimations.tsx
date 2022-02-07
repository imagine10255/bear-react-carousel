import React, {useState} from 'react';
import Content from '../../_components/Content';
import TextAnimationsCarousel from './_components/TextAnimationsCarousel';




/**
 * Text Animations
 */
const TextAnimations = () => {
    const [isLoadData, setIsLoadData] = useState<boolean>(true);

    return <Content
        title="Text Animations"
        desc="Text display effect when swipe ends"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >
        <div className="mb-4">
            <TextAnimationsCarousel isLoadData={isLoadData}/>
        </div>


    </Content>;
};

export default TextAnimations;
