import {useCallback, useRef, useState} from 'react';
import styled, {css} from 'styled-components/macro';
import gridConfig from 'config/grid';
import {media} from 'bear-styled-grid';

import CSS from 'csstype';
import BearCarousel, {elClassName, ICarouselObj} from 'bear-carousel';
import {anyToNumber} from 'bear-jsutils/convert';
import {Icon} from 'bear-components/atoms';
import {Select} from 'bear-components/forms';

// Components;
import VipLevelCard from '../VipLevelCard';
import {IRules} from '../VipLevelCard/VipLevelCard';
import {ICarouselData} from '../../../../../../../src/Carousel';


interface IProps extends FCProps{
    style?: CSS.Properties,
    className?: string,
    memberLevel?: number,

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
const VipLevelCardList = ({
    className,
    style,
    memberLevel = 0,
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
                    isVipLevel={Number(memberLevel) === Number(row.level)}
                />
            </VipLevelCardArea>)
        };
    });

    const carouselLevel = carousel?.activePage ?? 1;

    const handleCarouselGoIndex = (index: number) => {
        carousel?.goToPage(index);
    };

    return (
        <VipLevelCardListRoot style={style} className={className}>
            <CarouselContainer className="d-lg-block">

                <ListControlArea>
                    <ControlAreaTitle>
                        Level
                        <LevelSelect
                            title="level"
                            options={levelOption}
                            value={carouselLevel}
                            onChange={(value) => handleCarouselGoIndex(anyToNumber(value))}
                        />
                    </ControlAreaTitle>


                </ListControlArea>

                {/* 等級列表區塊 */}
                <BearCarousel
                    isEnableLoop={false}
                    isEnableNavButton
                    setCarousel={setCarousel}
                    slidesPerView={1}
                    spaceBetween={20}
                    breakpoints={{
                        [gridConfig.gridBreakpoints.xxl]: {
                            slidesPerView: 7,
                        },
                        [gridConfig.gridBreakpoints.xl]: {
                            slidesPerView: 5,
                        },
                        [gridConfig.gridBreakpoints.lg]: {
                            slidesPerView: 3,
                        },
                        [gridConfig.gridBreakpoints.sm]: {
                            slidesPerView: 3,
                        },
                    }}
                    data={carouselData}
                />
            </CarouselContainer>
        </VipLevelCardListRoot>
    );
};

export default VipLevelCardList;

const PrevButton = styled.button`
    width: auto;
    height: auto;
    background: none;
    z-index: 2;
    border: none;
    padding: 5px 0;
    left: 0;
    border-radius: 20px;
    top: -57px;
    font-size: 12px;
    color: #737b8c;
    font-weight: bold;
    display: flex;
    align-items: center;
    transition: all .2s ease-in;
    position: absolute;

    i {
        margin-right: 5px;
        color: #737b8c;
        transition: all .2s ease-in;
    }

    ${media.lg`
        top: -90px;
        left: 15px;
        font-size: 16px;
        border-radius: 20px;
        padding: 5px 20px;

        &:hover {
            background-color: rgba(0,0,0,0.05);
            color: #00a3e0;
            i {
                color: #00a3e0;
            }
        }
    `}
`;

const NextButton = styled(PrevButton)`
    left: auto;
    right: 0;

    i {
        margin-right: unset;
        margin-left: 5px;
    }

    ${media.lg`
        left: auto;
        right: 15px

    `}
`;

const VipLevelCardArea = styled.div`
    padding: 34px 0 0;

    ${media.lg`
        padding: 50px 0 0;
    `}
`;

const CategoryIcon = styled(Icon)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -40px;

    ${media.lg`
        left: -40px;
    `}
`;

const CategoryButton = styled.button<{
    isActive: boolean,
}>`
    border: none;
    width: 50%;
    height: 100%;
    background-color: #b7b8bc;
    border-radius: 15px;
    font-size: 14px;
    font-weight: 700;
    color: #737b8c;
    position: relative;
    transition: all .5s ease;

    ${props => props.isActive && css`
        background: linear-gradient(to bottom, #fff, #fff);
        color: #00a3e0;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
        pointer-events: none;

        ${CategoryIcon}{
            color: #00a3e0;
        }
    `};

    &:last-child {
        ${CategoryIcon} {
            left: auto;
            right: -40px;

            ${media.lg`
                left: auto;
                right: -40px;
            `}
        }
    }

    ${media.lg`
        font-size: 14px;
        border-radius: 15px
    `}
`;

const SwitchButtonArea = styled.div`
    width: 188px;
    height: 30px;
    border-radius: 27px;
    background-color: #b7b8bc;
    display: flex;
    justify-content: center;
    align-items: center;

    ${media.lg`
        width: 188px;
        height: 30px;
        border-radius: 27px;
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
    position: relative;
    justify-content: center;
    padding: 132px 15px 48px 15px;
    overflow: hidden;
    
    .${elClassName.content}{
        overflow-x: unset;

        @media (max-width: 991px) {
          > div{
            > div{
                &[data-active]{
                    .vip-level-card-root{
                        &:before {
                            opacity: 1;
                        }
                        transform: scale(1.1);
                        z-index: 2;

                        // 白線調淡
                        .vip-level-item{
                            border-bottom: solid 1px rgba(232,232,232,.6);
                        }

                        .vip-level{
                            background-color: rgba(255,255,255,.2);
                        }
                        .vip-level-content{
                            .item-title{
                                color: #fff;
                                span > span {
                                    color: #000;
                                }
                            }
                            .item-value{
                                color: #f8e71c;
                                span{
                                    color: #fff;
                                    > span {
                                         color: #f8e71c;
                                    }
                                }
                            }
                        }
                        .vip-level-footer{
                            background-color: #fff;
                            .item-title{
                                color: #004e6b;
                            }
                            .item-value{
                                color: #004e6b;
                            }
                        }
                        .vip-level-card-bg{
                            opacity: .1;
                        }
                    }
                }
            }
          }
        }
    }
`;

const VipLevelCardListRoot = styled.div`
    padding: 20px 0;
    min-height: 140px;
    z-index: 2;

    ${media.lg`
        padding: 26px 0;
        min-height: 140px;
    `}
`;
