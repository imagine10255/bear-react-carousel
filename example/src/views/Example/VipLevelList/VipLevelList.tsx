import React, {useState} from 'react';
import Content from '../../_components/Content';
import VipLevelCarousel from './_components/VipLevelCarousel';


const vipData = new Array(12).fill('').map((row, index) => {
    return {
        level: index,
        totalAmount: 100 * index,
        rule: [
            {title: 'Rem', value: 200 * index, hasUpTo: true,},
            {title: 'Cache', value: 120 * index, hasUpTo: true,}
        ],
    };
});


/**
 * Vip Level List
 */
const VipLevelList = () => {
    const [isLoadData, setIsLoadData] = useState<boolean>(true);

    return <Content
        title="Vip List"
        desc="Card list"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >
        <div className="mb-4 mb-lg-5">
            <VipLevelCarousel
                activeLevel={2}
                data={isLoadData ? vipData: []}
            />
        </div>


    </Content>;
};

export default VipLevelList;


