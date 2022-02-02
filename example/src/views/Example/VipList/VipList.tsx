import React from 'react';
import styled, {css, keyframes} from 'styled-components/macro';
import Content, {SubTitle} from '../../_components/Content';
import VipLevelCardList from './_components/VipLevelCardList';

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
 * Vip List
 */
const VipList = () => {

    return <Content
        title="Vip List"
        desc="Multi card and control page"
    >
        <CarouselBox className="mb-4 mb-lg-5">
            <VipLevelCardList
                memberLevel={2}
                data={vipData}
            />
        </CarouselBox>


    </Content>;
};

export default VipList;


const CarouselBox = styled.div`
    

`;


