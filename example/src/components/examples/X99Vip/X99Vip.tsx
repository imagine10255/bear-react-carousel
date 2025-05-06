import BearCarousel, {
    BearSlideCard,
    Controller,
    elClassName,
    TBearSlideItemDataList, TOnSlideChange, ICarouselState
} from '@acrool/react-carousel';
import {Flex} from '@acrool/react-grid';
import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';

import VipCard from './VipCard';
import {asset} from '../../../utils';
import Prices from './_components/Prices';
import {IData} from "./type";
import {data} from "./data";




interface IProps {
    className?: string
}



/**
 * VipLevelCardList
 */
function X99VIP({
    className
}: IProps){
    const [currentLv, setCurrentLv] = useState<IData|null>(null);
    const [controller, setController] = useState<Controller>();


    useEffect(() => {
        controller?.slideToPage(3, false);
    }, [controller]);


    const carouselData = (): TBearSlideItemDataList|undefined => {
        return data.map((row, index) => {
            return <BearSlideCard key={index}>
                <VipCard
                    level={index + 1}
                    levelName={row.name}
                    totalAmount={row.minValidBet}
                    month={row.keepLevelDurationMonths}
                    isUseOld={false} // 測試渲染卡頓的圖
                />
            </BearSlideCard>;
        });

    };


    const handleSlideChange: TOnSlideChange = useCallback((state: ICarouselState) => {
        const curr = data?.find((row, index) => index === state.virtual.activeIndex);
        if(curr){
            setCurrentLv(curr);
        }

    }, []);




    return <W99VipRoot className={className}>

        <Content>
            <Title>
                <VipIcon src={asset('/images/x99_vip/crown.svg')}/>
                <span>{currentLv?.name} Benefit description</span>
            </Title>
        </Content>

        <LevelWrapper>
            <BearCarousel
                setController={setController}
                isCenteredSlides
                isEnableNavButton
                slidesPerView={1.2}
                spaceBetween={20}
                height="auto"
                isEnableGPURender={false}
                data={carouselData()}
                onSlideChange={handleSlideChange}
            />


        </LevelWrapper>




        <Content className="mt-3">
            {currentLv && (
                <Prices
                    prices={currentLv.prices}
                />
            )}
        </Content>


    </W99VipRoot>;

}

export default X99VIP;





const VipIcon = styled.img`
    width: 22px;
    height: auto;
`;


const Content = styled.div`
    margin-bottom: 20px;
`;


const Title = styled(Flex)`
    color: var(--primary-color);
    font-weight: 600;
    font-size: 16px;

    align-items: center;
    gap: 10px;
`;

const LevelWrapper = styled.div`

`;


const W99VipRoot = styled.div`
    width: 100%;

    --primary-color: #3e8564;

    .${elClassName.navGroup} {
        justify-content: flex-end;
        position: absolute;
        right: 20px;
        top: -45px;
        display: flex;
        gap: 20px;
        align-items: center;

    }

    .${elClassName.slideItem} {
        transition: filter .3s;

        &:not([data-active]) {
            filter: grayscale(100%);
        }
    }


    .${elClassName.navPrevButton}, .${elClassName.navNextButton} {
        position: static;
        border-radius: 7px;
        color: #4E9467;
        font-weight: 800;
        width: 26px;
        padding: 0;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background: rgba(78, 148, 103, 0.10);


            .${elClassName.navIcon} {
                color: var(--primary-color);
            }
        }
    }
`;
