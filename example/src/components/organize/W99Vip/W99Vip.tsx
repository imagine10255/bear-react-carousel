import BearCarousel, {
    BearSlideCard,
    Controller,
    elClassName,
    TBearSlideItemDataList, TOnSlideChange, ICarouselState
} from 'bear-react-carousel';
import {Flex} from 'bear-react-grid';
import React, {useCallback, useEffect,useMemo, useState} from 'react';
import styled from 'styled-components';

// import Icon, {EIconCode} from '@/library/bear-react-icon';
// import {IGroup} from '@/library/graphql/__generated__';
// import {asset} from '@/utils/config';
// import Prices from '@/views/HomeRoot/Vip/MyVip/_components/Prices';

import VipCard from './VipCard';
import {asset} from '@/utils';
import Prices from './_components/Prices';
import {IPrice} from '@/components/organize/W99Vip/_components/Prices/types';




interface IProps {
    className?: string
}


interface IData {
    id: string
    name: string
    minValidBet: number
    keepLevelDurationMonths: number
    prices: IPrice[],
}
const data: IData[] = [
    {
        id: '1',
        name: 'VIP1',
        minValidBet: 100,
        keepLevelDurationMonths: 1,
        prices: [
            {title: '升級獎勵', subTitle: 'Upgrade Bonus', amount: 102},
            {title: '每月福利', subTitle: 'Monthly Bonus', amount: 103},
            {title: '每週福利', subTitle: 'Weekly Bonus', amount: 104},
        ],
    },
    {
        id: '2',
        name: 'VIP2',
        minValidBet: 110,
        keepLevelDurationMonths: 2,
        prices: [
            {title: '升級獎勵', subTitle: 'Upgrade Bonus', amount: 203},
            {title: '每月福利', subTitle: 'Monthly Bonus', amount: 204},
            {title: '每週福利', subTitle: 'Weekly Bonus', amount: 205},
        ],
    },
    {
        id: '3',
        name: 'VIP3',
        minValidBet: 120,
        keepLevelDurationMonths: 3,
        prices: [
            {title: '升級獎勵', subTitle: 'Upgrade Bonus', amount: 304},
            {title: '每月福利', subTitle: 'Monthly Bonus', amount: 305},
            {title: '每週福利', subTitle: 'Weekly Bonus', amount: 306},

        ],
    },
    {
        id: '4',
        name: 'VIP4',
        minValidBet: 130,
        keepLevelDurationMonths: 4,
        prices: [
            {title: '升級獎勵', subTitle: 'Upgrade Bonus', amount: 405},
            {title: '每月福利', subTitle: 'Monthly Bonus', amount: 406},
            {title: '每週福利', subTitle: 'Weekly Bonus', amount: 407},

        ],
    },
    {
        id: '5',
        name: 'VIP5',
        minValidBet: 140,
        keepLevelDurationMonths: 5,
        prices: [
            {title: '升級獎勵', subTitle: 'Upgrade Bonus', amount: 508},
            {title: '每月福利', subTitle: 'Monthly Bonus', amount: 509},
            {title: '每週福利', subTitle: 'Weekly Bonus', amount: 510},

        ],
    },
    {
        id: '6',
        name: 'VIP6',
        minValidBet: 150,
        keepLevelDurationMonths: 6,
        prices: [
            {title: '升級獎勵', subTitle: 'Upgrade Bonus', amount: 609},
            {title: '每月福利', subTitle: 'Monthly Bonus', amount: 610},
            {title: '每週福利', subTitle: 'Weekly Bonus', amount: 611},

        ],
    },
    {
        id: '7',
        name: 'VIP7',
        minValidBet: 160,
        keepLevelDurationMonths: 7,
        prices: [
            {title: '升級獎勵', subTitle: 'Upgrade Bonus', amount: 710},
            {title: '每月福利', subTitle: 'Monthly Bonus', amount: 711},
            {title: '每週福利', subTitle: 'Weekly Bonus', amount: 712},

        ],
    },
    {
        id: '8',
        name: 'VIP8',
        minValidBet: 170,
        keepLevelDurationMonths: 8,
        prices: [
            {title: '升級獎勵', subTitle: 'Upgrade Bonus', amount: 811},
            {title: '每月福利', subTitle: 'Monthly Bonus', amount: 812},
            {title: '每週福利', subTitle: 'Weekly Bonus', amount: 813},

        ],
    },
    {
        id: '9',
        name: 'VIP9',
        minValidBet: 180,
        keepLevelDurationMonths: 9,
        prices: [
            {title: '升級獎勵', subTitle: 'Upgrade Bonus', amount: 912},
            {title: '每月福利', subTitle: 'Monthly Bonus', amount: 913},
            {title: '每週福利', subTitle: 'Weekly Bonus', amount: 914},

        ],
    },
];

/**
 * VipLevelCardList
 */
function VipLevelCarousel({
    className
}: IProps){
    const [currentLv, setCurrentLv] = useState<IData|null>(null);
    const [controller, setController] = useState<Controller>();


    useEffect(() => {
        controller?.slideToPage(3, false);
    }, [controller]);


    const carouselData = (): TBearSlideItemDataList => {
        return data?.map((row, index) => {
            return {
                key: `rule_${row.id}`,
                children: (
                    <BearSlideCard>
                        <VipCard
                            level={index + 1}
                            levelName={row.name}
                            totalAmount={row.minValidBet}
                            month={row.keepLevelDurationMonths}
                        />
                    </BearSlideCard>
                )
            };
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
                <VipIcon src={asset('/images/w99_vip/crown.svg')}/>
                <span>{currentLv?.name} 福利說明</span>
            </Title>
        </Content>

        <LevelWrapper>
            <BearCarousel
                setController={setController}
                // isEnableLoop={false}
                isCenteredSlides
                isEnableNavButton
                slidesPerView={1.2}
                spaceBetween={20}
                height="auto"
                // height="200px"
                data={carouselData()}
                onSlideChange={handleSlideChange}
                isSlideItemMemo
                // renderNavButton={(toPrev, toNext) => {
                //     return <div className={elClassName.navGroup}>
                //         <button className={elClassName.navPrevButton} type="button" onClick={toPrev}>
                //             <Icon code={EIconCode.chevron_right} color="#a1a1a1" size={22} rotate={180} className={elClassName.navIcon}/>
                //         </button>
                //         <button className={elClassName.navNextButton} type="button" onClick={toNext}>
                //             <Icon code={EIconCode.chevron_right} color="#a1a1a1" size={22} rotate={180} className={elClassName.navIcon}/>
                //         </button>
                //     </div>;
                // }}
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

export default VipLevelCarousel;





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

        :hover {
            background: rgba(78, 148, 103, 0.10);


            .${elClassName.navIcon} {
                color: var(--primary-color);
            }
        }
    }
`;
