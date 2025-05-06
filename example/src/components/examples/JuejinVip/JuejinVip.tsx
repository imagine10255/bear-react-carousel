import styled from 'styled-components';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Grid, Flex, minmax} from '@acrool/react-grid';
import Icons from './_components/Icons';
import BearCarousel, {
    TMoveEffectFn,
    TBearSlideItemDataList,
    BearSlideCard,
    elClassName,
    Controller,
    TOnSlideChange,
    ICarouselState
} from '@acrool/react-carousel';
import Phone from './_components/Phone';
import Avatar from './_components/Avatar';
import Progress from './_components/Progress';
import NavWrapper from './_components/NavWrapper';
import LvAboutWrapper from './_components/LvAboutWrapper';






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
    const carouselMainRef = useRef<BearCarousel>(null);
    const carouselMetaRef = useRef<BearCarousel>(null);
    const carouselLineRef = useRef<BearCarousel>(null);
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

        const data: TBearSlideItemDataList = dataList.map(row => {
            return <BearSlideCard key={row.id}>
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
            </BearSlideCard>;
        });

        return data;
    }, []);


    const renderMeta = useCallback(() => {
        const metaData: TBearSlideItemDataList = dataList.map(row => {
            return <BearSlideCard key={row.id}>
                <MetaCard>
                    <MetaLv>LV.{row.lv}</MetaLv>
                    <Do/>
                </MetaCard>
            </BearSlideCard>;
        });

        const lineData: TBearSlideItemDataList = dataList.map(row => {
            return <BearSlideCard key={row.id} className="position-relative">
                <Line/>
            </BearSlideCard>;
        });


        return <LevelMeta>
            <BearCarousel
                ref={carouselMetaRef}
                data={metaData}
                // style={{paddingTop: '100px'}}
                height="70px"
                slidesPerView={3}
                isCenteredSlides={true}
                isEnableNavButton={false}
                isEnablePagination={false}
                isEnableMouseMove={false}
                moveEffect={{
                    moveFn: customMoveEffectFn2,
                }}
            />

            <LevelLine>
                <LineBearCarousel
                    ref={carouselLineRef}
                    data={lineData}
                    height="auto"
                    slidesPerView={3}
                    isCenteredSlides={true}
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
                    <BearCarousel
                        style={{paddingTop: '20px'}}

                        ref={carouselMainRef}
                        syncCarouselRefs={[carouselMetaRef, carouselLineRef]}
                        onSlideChange={handleSlideChange}
                        setController={setMainController}
                        data={renderSlideData()}
                        slidesPerView={1.2}
                        spaceBetween={20}
                        isCenteredSlides={true}
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
  //position: absolute;
  //left: 0;
  //right: 0;
  //bottom: 0;
  margin: auto;


`;



const LineBearCarousel = styled(BearCarousel)`
    .${elClassName.slideItem}:first-child{
        ${Line}{
          width: 100px;
          margin-left: 50%;
        }
    }
    .${elClassName.slideItem}:last-child{
        ${Line}{
          width: 55px;
          margin-right: 50%;
        }
    }
`;


const LevelLine = styled.div`
    position: absolute;
    width: 100%;
    //z-index: -1;
    overflow: hidden;
    transform-origin: bottom center;
    clip-path: url(#wave12);

    //clip-path: ellipse(80% 20% at 50% 0%);
    //clip-path: polygon(10% 10%,90% 10%,91.00% 63.00%,10.00% 63.00%);
    top: 12px;
    //min-height: 250px;
    //height: 100%;
  padding-bottom: 100px;
  //background-color: #000;
   mask-image: linear-gradient(to right, transparent 0, white 30%, white 70%, transparent 100%);
  //  background: linear-gradient(200.44deg, rgb(67, 22, 219) 13.57%, rgb(144, 118, 231) 58.38%);
    //opacity: 0.2;

  > svg{
    position: absolute;
    z-index: -1;
    top: 0;
    height: 0;
  }
    //svg {
    //  width: 100%;
    //  padding: 200px;
    //  //transform: rotate(180deg);
    //  left: -20px;
    //  position: absolute;
    //}
    svg > clipPath {
      transform: translate(-15px, 2px);

      //transform: scale(.5);
    }
`;

const Wave1 = styled.div`
  //position: absolute;
  width: 100%;
  //z-index: -1;
  overflow: hidden;
  transform-origin: bottom center;
  clip-path: url(#wave10);

  //clip-path: ellipse(80% 20% at 50% 0%);
  //clip-path: polygon(10% 10%,90% 10%,91.00% 63.00%,10.00% 63.00%);
  top: 0;
  //min-height: 240px;
  //height: 100%;
  background: rgb(9, 22, 44);
  //opacity: 0.2;
  //margin-bottom: 15px;

  > svg {
    position: absolute;
    z-index: -1;
    top: 0;
    height: 0;
  }

  //svg {
  //  width: 100%;
  //  padding: 200px;
  //  //transform: rotate(180deg);
  //  left: -20px;
  //  position: absolute;
  //}
  //svg > clipPath {
  //
  //  transform: scale(.5);
  //}
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
  //background-color: #fff;
  //height: 400px;
  width: 100%;
  position: relative;
    user-select: none;


`;
