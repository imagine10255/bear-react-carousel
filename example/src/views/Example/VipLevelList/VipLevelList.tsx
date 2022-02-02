import React from 'react';
import styled, {css, keyframes} from 'styled-components/macro';
import Content, {SubTitle} from '../../_components/Content';
import VipLevelCarousel from './_components/VipLevelCarousel';

const vipData = new Array(12).fill('').map((row, index) => {
    return {
        level: index,
        depositAmount: 100 * index,
        rule: [
            {title: 'deposit', value: 200 * index, hasUpTo: true,},
            {title: 'cash out', value: 120 * index, hasUpTo: true,}
        ],
    };
});




/**
 * Vip Level List
 */
const VipLevelList = () => {

    return <Content
        title="Vip Level List"
        desc="Multi card and control page"
    >
        <CarouselBox className="mb-4 mb-lg-5">
            <VipLevelCarousel
                activeLevel={2}
                data={vipData}
            />
        </CarouselBox>


    </Content>;
};

export default VipLevelList;


const CarouselBox = styled.div`
    

`;


