import React, {useState} from 'react';
import Content from '../../_components/Content';
import VipLevelCarousel from './_components/VipLevelCarousel';




/**
 * Vip Level List
 */
const VipLevelList = () => {
    const [isLoadData, setIsLoadData] = useState<boolean>(true);

    return <Content
        title="Vip List"
        desc="Multi card and control page"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >
        <div className="mb-4 mb-lg-5">
            <VipLevelCarousel isLoadData={isLoadData}/>
        </div>


    </Content>;
};

export default VipLevelList;


