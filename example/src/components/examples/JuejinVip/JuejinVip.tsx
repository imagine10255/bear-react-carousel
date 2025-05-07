import AcroolCarousel, {
    AcroolSlideCard,
    Controller,
    ICarouselState,
    TAcroolSlideItemDataList,
    TMoveEffectFn,
    TOnSlideChange} from '@acrool/react-carousel';
import {Flex, Grid, minmax} from '@acrool/react-grid';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

import Avatar from './_components/Avatar';
import Icons from './_components/Icons';
import LvAboutWrapper from './_components/LvAboutWrapper';
import NavWrapper from './_components/NavWrapper';
import Phone from './_components/Phone';
import Progress from './_components/Progress';






export const dataList = [
    {
        id: 1,
        lv: 1,
        value: 100,
        desc: 'Already achieved this level',
        progressRate: 100,
        bg: '#728cab',
        count: 1,
    },
    {
        id: 2,
        lv: 2,
        desc: 'still 51 points unlock the next level',
        value: 200,
        progressRate: 100,
        bg: '#66bddc',
        count: 2,

    },
    {
        id: 3,
        lv: 3,
        value: 300,
        desc: 'still 151 points unlock the next level',
        progressRate: 100,
        bg: '#459dde',
        count: 4,

    },
    {
        id: 4,
        lv: 4,
        value: 400,
        desc: 'still 251 points unlock the next level',
        progressRate: 100,
        bg: '#2273ec',
        count: 6,
    },
    {
        id: 5,
        lv: 5,
        value: 500,
        desc: 'still 351 points unlock the next level',
        progressRate: 9,
        bg: '#005fbd',
        status: 'Current',
        count: 7,
    },
    {
        id: 6,
        lv: 6,
        value: 500,
        desc: 'still 451 points unlock the next level',
        progressRate: 9,
        bg: '#01519f',
        status: 'Locked',
        count: 8,
    },
    {
        id: 7,
        lv: 7,
        value: 500,
        desc: 'still 551 points unlock the next level',
        progressRate: 9,
        bg: '#003a72',
        status: 'Locked',
        count: 9,

    },
    {
        id: 8,
        lv: 8,
        value: 500,
        desc: 'still 651 points unlock the next level',
        progressRate: 9,
        bg: '#001c34',
        status: 'Locked',
        count: 14,
    },
];


/**
 *
 * 線上SVG PATH工具
 * https://yqnn.github.io/svg-path-editor/
 * @constructor
 */
const JuejinVip = () => {
    const carouselMainRef = useRef<AcroolCarousel>(null);
    const carouselMetaRef = useRef<AcroolCarousel>(null);
    const carouselLineRef = useRef<AcroolCarousel>(null);
    const [carouselMainController, setMainController] = useState<Controller>();
    const [currLevel, setCurrLevel] = useState<{lv: number,count: number}|undefined>();


    useEffect(() => {
        carouselMainController?.slideToPage(1, false);
    }, [carouselMainController]);

    const customMoveEffectFn: TMoveEffectFn = useCallback((percentageInfo) => {
        const transformY = 40;
        return {
            transform: `translate(0px, ${-transformY * (percentageInfo.calcPercentage - 1)}px)`,
        };
    }, []);

    const customMoveEffectFn2: TMoveEffectFn = useCallback((percentageInfo) => {
        const transformY = -19;
        const calcPercentage = -transformY * (percentageInfo.calcPercentage - 1);
        return {
            transform: `translate(0px, ${calcPercentage}px)`,
        };
    }, []);


    const handleSlideChange: TOnSlideChange = useCallback((state: ICarouselState) => {
        const curr = dataList.find((row, index) => index === state.virtual.activeIndex);
        if(curr){
            setCurrLevel({lv: curr.lv, count: curr.count});
        }

    }, []);


    const renderSlideData = useCallback(() => {

        const data: TAcroolSlideItemDataList = dataList.map(row => {
            return <AcroolSlideCard key={row.id}>
                <LevelCard col={1} style={{backgroundColor: row.bg}} className="align-content-start row-gap-5">
                    {row.status && <CurrLv>
                        {row.status === 'Locked' && <Icons.Locked/>}
                        <span>{row.status}</span>
                    </CurrLv>}


                    <Flex className="gap-5">
                        <Level>LV.{row.lv}</Level>
                        <Value>{row.value} Experience</Value>
                    </Flex>

                    <Desc>{row.desc}</Desc>

                    <Progress value={row.progressRate}/>
                </LevelCard>
            </AcroolSlideCard>;
        });

        return data;
    }, []);


    const renderMeta = useCallback(() => {
        const metaData: TAcroolSlideItemDataList = dataList.map(row => {
            return <AcroolSlideCard key={row.id}>
                <MetaCard>
                    <MetaLv>LV.{row.lv}</MetaLv>
                    <Do/>
                </MetaCard>
            </AcroolSlideCard>;
        });

        const lineData: TAcroolSlideItemDataList = dataList.map(row => {
            return <AcroolSlideCard key={row.id} className="position-relative">
                <Line/>
            </AcroolSlideCard>;
        });


        return <LevelMeta>
            <AcroolCarousel
                ref={carouselMetaRef}
                data={metaData}
                // style={{paddingTop: '100px'}}
                height="70px"
                slidesPerView={3}
                isCenteredSlides
                isEnableNavButton={false}
                isEnablePagination={false}
                isEnableMouseMove={false}
                moveEffect={{
                    moveFn: customMoveEffectFn2,
                }}
            />

            <LevelLine>
                <LineAcroolCarousel
                    ref={carouselLineRef}
                    data={lineData}
                    height="auto"
                    slidesPerView={3}
                    isCenteredSlides
                    isEnableNavButton={false}
                    isEnablePagination={false}
                    isEnableMouseMove={false}
                />

                <svg height="100%" width="100%">
                    <clipPath id="wave12">
                        {/*跟隨線*/}
                        <path d="M 0 4 C 175 30 175 30 356 4 L 356 2 C 175 28 175 28 0 2" stroke="black" fill="transparent"/>
                    </clipPath>
                </svg>
            </LevelLine>
        </LevelMeta>;
    }, []);




    return <CardRoot col={minmax('300px', '500px')} className="gap-0 justify-content-center">
        <Phone>
            <NavWrapper/>
            <Avatar/>
            <Wave1Wapper>
                <Wave1>
                    <AcroolCarousel
                        style={{paddingTop: '20px'}}

                        ref={carouselMainRef}
                        syncCarouselRefs={[carouselMetaRef, carouselLineRef]}
                        onSlideChange={handleSlideChange}
                        setController={setMainController}
                        data={renderSlideData()}
                        slidesPerView={1.2}
                        spaceBetween={20}
                        isCenteredSlides
                        isEnableNavButton={false}
                        isEnablePagination={false}
                        moveEffect={{
                            moveFn: customMoveEffectFn,
                        }}
                    />

                    <svg height="100%" width="100%">
                        <clipPath id="wave10">
                            <path d="M 0,0 356,0 356,130 0,130" stroke="black" fill="transparent"/>
                            {/* 圓弧 */}
                            <path d="M 0 130 C 175 155 175 155 356 130" stroke="black" fill="transparent"/>
                            {/* 下箭頭 */}
                            <path d="M 140 143 L 164 153 L 166 153 L 190 143" stroke="black" fill="transparent"/>
                        </clipPath>
                    </svg>
                </Wave1>
            </Wave1Wapper>

            {renderMeta()}

            <LvAboutWrapper level={currLevel?.lv ?? 1} count={currLevel?.count ?? 1}/>
        </Phone>
    </CardRoot>;
};

export default JuejinVip;





const MetaCard = styled.div`
    text-align: center;
  padding-top: 10px;
`;


const LevelMeta = styled.div`
    position: relative;
`;


const Wave1Wapper = styled.div`
  filter: drop-shadow(0 1px 1px rgba(161, 161, 161, 0.5));
  margin-top: -1px;
`;



const MetaLv = styled.div`
    font-size: 12px;
  font-weight: 700;
  margin-bottom: 5px;
    color: #fff;
`;

const Do = styled.div`
  width: 8px;
  height: 8px;
  background-color: #0e86ff;
  box-shadow: 0 0 6px 0 #1086ff;
  border-radius: 50%;
  margin: auto;
`;

const Line = styled.div`
  width: 356px;
  height: 100px;
  background-color: #0e86ff;
  margin: auto;


`;



const LineAcroolCarousel = styled(AcroolCarousel)`
    .acrool-react-carousel__slide-item{
        &:first-child{
            ${Line}{
                width: 100px;
                margin-left: 50%;
            }
        }

        &:last-child{
            ${Line}{
                width: 55px;
                margin-right: 50%;
            }
        }
    }
`;


const LevelLine = styled.div`
    position: absolute;
    width: 100%;
    overflow: hidden;
    transform-origin: bottom center;
    clip-path: url(#wave12);

    top: 12px;
    padding-bottom: 100px;
    mask-image: linear-gradient(to right, transparent 0, white 30%, white 70%, transparent 100%);

    > svg {
        position: absolute;
        z-index: -1;
        top: 0;
        height: 0;
    }

    svg > clipPath {
        transform: translate(-15px, 2px);
    }
`;

const Wave1 = styled.div`
  width: 100%;
  overflow: hidden;
  transform-origin: bottom center;
  clip-path: url(#wave10);
  top: 0;
  background: rgb(9, 22, 44);

  > svg {
    position: absolute;
    z-index: -1;
    top: 0;
    height: 0;
  }
`;


const Desc = styled.div`
    color: #fff;
  font-size: 12px;
`;

const Value = styled.p`
    color: #fff;
  align-self: flex-end;
  font-size: 12px;
`;

const Level = styled.p`
    color: #fff;
  font-size: 22px;
  font-weight: 800;
  font-style: italic;
  line-height: 1;
`;

const CurrLv = styled.div`
  position: absolute;
  left: 1px;
  top: 1px;
  background-color: #1c1c1c;
  padding: 5px 10px;
  border-radius: 15px 0 15px 0;
  font-size: 12px;
  color: #ffe7ab;

  display: flex;
  flex-direction: row;
  gap: 3px;
  align-items: center;
`;


const LevelCard = styled(Grid)`
  height: 140px;
  border-radius: 15px;
  padding: 40px 15px;
  padding-bottom: 0;
  position: relative;
`;


const CardRoot = styled(Grid)`
  --header-bg-color: rgb(9, 22, 44);


  border-radius: 8px;
  width: 100%;
  position: relative;
    user-select: none;


`;
