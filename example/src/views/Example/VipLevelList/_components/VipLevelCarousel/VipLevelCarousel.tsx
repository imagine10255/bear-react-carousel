import {useCallback, useRef, useState} from 'react';
import styled, {css} from 'styled-components/macro';
import gridConfig from 'config/grid';
import {media} from 'bear-styled-grid';

import CSS from 'csstype';
import BearCarousel, {elClassName, ICarouselObj, ICarouselData} from 'bear-carousel';
import {anyToNumber} from 'bear-jsutils/convert';
import {Icon} from 'bear-components/atoms';
import {Select} from 'bear-components/forms';

// Components
import VipLevelCard, {IRules} from './VipLevelCard';


interface IProps extends FCProps{
    activeLevel?: number,
    data: Array<
        {
            level: number,
            depositAmount: number,
            rule: IRules[],
        }
    >,
}


/**
 * VipLevelCardList
 */
const VipLevelCarousel = ({
    className,
    style,
    activeLevel = 0,
    data,
}: IProps) => {
    const [carousel, setCarousel] = useState<ICarouselObj>();

    const levelOption = data.map((row, index) => {
        return {
            text: String(row.level),
            value: String(index + 1),
        };
    });

    const carouselData: ICarouselData[] = data.map(row => {
        return {
            key: row.level,
            children: (<VipLevelCardArea key={row.level}>
                <VipLevelCard
                    rules={row.rule}
                    level={row.level}
                    depositAmount={row.depositAmount}
                    isVipLevel={Number(activeLevel) === Number(row.level)}
                />
            </VipLevelCardArea>)
        };
    });

    const carouselLevel = carousel?.activePage ?? 1;

    const handleCarouselGoIndex = (index: number) => {
        carousel?.goToPage(index);
    };

    const renderControlArea = () => {
        return <ListControlArea>
            <ControlAreaTitle>
                VIP Level
                <LevelSelect
                    title="level"
                    options={levelOption}
                    value={carouselLevel}
                    onChange={(value) => handleCarouselGoIndex(anyToNumber(value))}
                />
            </ControlAreaTitle>
        </ListControlArea>;
    };


    /**
     * 等級列表區塊
     */
    const renderCarousel = () => {
        return <BearCarousel
            isEnableLoop={false}
            isEnableNavButton
            setCarousel={setCarousel}
            slidesPerView="auto"
            spaceBetween={20}
            // breakpoints={{
            //     [gridConfig.gridBreakpoints.sm]: {
            //         slidesPerView: 'auto',
            //     },
            // }}
            data={carouselData}
        />;
    };

    return (
        <VipLevelCardListRoot style={style} className={className}>
            <CarouselContainer className="d-lg-block">

                {/*{renderControlArea()}*/}
                {renderCarousel()}

            </CarouselContainer>
        </VipLevelCardListRoot>
    );
};

export default VipLevelCarousel;


const VipLevelCardArea = styled.div`
    padding: 34px 0 0;

    ${media.lg`
        padding: 50px 0 0;
    `}
`;



const LevelSelect = styled(Select)`
  
`;

const ControlAreaTitle = styled.div`
    color: #737b8c;
    font-size: 12px;
    text-align: center;
    position: absolute;
   

    > span {
        margin-left: 5px;
    }

    ${media.lg`
        font-size: 16px;
        padding: 10px 0;
    `}
`;

const ListControlArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 21px 0 48px;
    width: 50%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    z-index: 6;

    ${media.lg`
        padding: 21px 0 48px;

        span {
            display: none;
        }
    `}
`;

const CarouselContainer = styled.div`
    //position: relative;
    //justify-content: center;
    //padding: 132px 15px 48px 15px;
    //overflow: hidden;
    height: 400px;
    
     .${elClassName.content}{
         padding: 50px 0;
     }
    //     overflow-x: unset;
    //
    //     @media (max-width: 991px) {
    //       > div{
    //         > div{
    //             &[data-active]{
    //                 .vip-level-card-root{
    //                     &:before {
    //                         opacity: 1;
    //                     }
    //                     transform: scale(1.1);
    //                     z-index: 2;
    //
    //                     // 白線調淡
    //                     .vip-level-item{
    //                         border-bottom: solid 1px rgba(232,232,232,.6);
    //                     }
    //
    //                     .vip-level{
    //                         background-color: rgba(255,255,255,.2);
    //                     }
    //                     .vip-level-content{
    //                         .item-title{
    //                             color: #fff;
    //                             span > span {
    //                                 color: #000;
    //                             }
    //                         }
    //                         .item-value{
    //                             color: #f8e71c;
    //                             span{
    //                                 color: #fff;
    //                                 > span {
    //                                      color: #f8e71c;
    //                                 }
    //                             }
    //                         }
    //                     }
    //                     .vip-level-footer{
    //                         background-color: #fff;
    //                         .item-title{
    //                             color: #004e6b;
    //                         }
    //                         .item-value{
    //                             color: #004e6b;
    //                         }
    //                     }
    //                     .vip-level-card-bg{
    //                         opacity: .1;
    //                     }
    //                 }
    //             }
    //         }
    //       }
    //     }
    // }
`;

const VipLevelCardListRoot = styled.div`
    // padding: 20px 0;
    // min-height: 140px;
    // z-index: 2;
    //
    // ${media.lg`
    //     padding: 26px 0;
    //     min-height: 140px;
    // `}
`;
