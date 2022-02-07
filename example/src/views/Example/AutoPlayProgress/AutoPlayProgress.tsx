import React, {useState} from 'react';

// Components
import Content from '../../_components/Content';
import AutoPlayProgressCarousel from './_components/AutoPlayProgressCarousel';



/**
 * AutoPlayProgress
 */
const AutoPlayProgress = () => {
    const [isLoadData, setIsLoadData] = useState<boolean>(true);

    return <Content
        title="Auto Play Progress"
        desc="Moved items as to the central position"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >
        <AutoPlayProgressCarousel isLoadData={isLoadData}/>

    </Content>;
};

export default AutoPlayProgress;



