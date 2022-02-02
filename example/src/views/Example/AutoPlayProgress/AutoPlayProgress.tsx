import React from 'react';
import styled, {css, keyframes} from 'styled-components/macro';
import BearCarousel, {elClassName, ICarouselData , TCarouselSetting} from 'bear-carousel';
import Code from 'components/atoms/Code';
import {Icon} from 'bear-components/atoms';
import {Col, Container, EColType, media, Row} from 'bear-styled-grid';

import Content, {SubTitle} from '../../_components/Content';

const bgList = [
    {id: 9, name: 'Rose', image: '/static/sample/09.jpg'},
    {id: 2, name: 'Violets', image: '/static/sample/02.jpg'},
    {id: 3, name: 'Purple Poppies', image: '/static/sample/03.jpg'},
    {id: 4, name: 'Red Poppies', image: '/static/sample/04.jpg'},
    {id: 5, name: 'Lavender', image: '/static/sample/05.jpg'},
    {id: 6, name: 'Meeting', image: '/static/sample/06.jpg'},
];


const setting: TCarouselSetting = {
    slidesPerView: 1,
    slidesPerGroup: 1,
    isEnableMouseMove: true,
    isEnablePagination: true,
    isEnableNavButton: false,
    isEnableLoop: true,
    autoPlayTime: 5000,
    isEnableAutoPlay: true,
    renderNavButton: (toPrev, toNext) => (
        <PaginateGroup className={elClassName.navGroup}>
            <Container>
                <Row className="justify-content-center justify-content-lg-end">
                    <Col col={EColType.auto}>
                        <NavButton type="button" onClick={() => toPrev()}>
                            <Icon code="arrow-right" rotate={180}/>
                        </NavButton>
                    </Col>
                    <Col col={EColType.auto}>
                        <NavButton type="button" onClick={() => toNext()}>
                            <Icon code="arrow-right"/>
                        </NavButton>
                    </Col>
                </Row>
            </Container>
        </PaginateGroup>
    ),
};


/**
 * AutoPlayProgress
 */
const AutoPlayProgress = () => {

    const carouselData: ICarouselData[] = bgList.map(row => {
        return {
            key: row.id,
            paginationContent: <>{row.name}</>,
            children: (<Banner image={row.image}/>)
        };
    });


    return <Content
        title="Auto Play Progress"
        desc="Moved items as to the central position"
    >
        <CarouselBox className="mb-4 mb-lg-5">
            <BearCarousel
                {...setting}
                data={carouselData}
            />
        </CarouselBox>


    </Content>;
};

export default AutoPlayProgress;




const NavButton = styled.button`
    width: 28px;
    height: 28px;
    border-radius: 99em;
    -webkit-backdrop-filter: blur(3.8px);
    backdrop-filter: blur(3.8px);
    box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.5);
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    i {
        font-size: 20px;
    }

    ${media.md`
        width: 32px;
        height: 32px;
    `}

    ${media.xxl`
        width: 50px;
        height: 50px;

        i {
            font-size: 25px;
        }
    `}
`;

const PaginateGroup = styled.div`
    position: absolute;
    bottom: 60px;
    z-index: 1;
    width: 100%;
`;

const progress = keyframes`
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
`;

const Banner = styled.div<{
    image?: string,
}>`
      height: 100%;
      padding-bottom: 46%;
      background: center center no-repeat;
      background-size: cover;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      flex: 0 0 auto;

      ${props => props.image && css`
          background-image: url("${props.image}");
      `}

      :after{
          content: '';
          background: repeat center;
          z-index: 1;
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: .5;
      }

    ${media.sm`
        padding-bottom: 36.5%;
    `}
`;

const CarouselBox = styled.div`
    height: 147px;
    .${elClassName.paginationContent}{
        display: none;
    }

    ${media.px2vw`
        height: 147px;
    `}

    ${media.sm`
        height: auto;
    `}

    ${props => css`
       ${media.xl`
            margin-bottom: 40px;
    
            .${elClassName.paginationGroup}{
                position: absolute;
                left: 0;
                right: 0;
                bottom: -35px;
                z-index: 1;
                background-color: #fff;
                height: 70px;
                width: 70%;
                margin: auto;
                display: flex;
                box-shadow: none;
    
                > [data-grid="row"] {
                    height: inherit;
                }
            }
    
             .${elClassName.paginationButton}{
                display: flex;
                justify-content: center;
                align-items: center;
                height: inherit;
                font-size: 12px;
                font-weight: bold;
                color: #000;
                cursor: pointer;
                position: relative;
                flex: 1;
                background: transparent;
                border: solid 1px #ededed;
                border-radius: 0;
                margin: 0;
                padding: 0;
                box-shadow: none;
    
                &:after {
                    content: '';
                    width: 0;
                    height: 4px;
                    background-color: ${props.theme.primaryColor};
                    position: absolute;
                    bottom: 0;
                    left: 0;
                }
    
                &[data-active=true]:after {
                    animation: ${progress} ${setting.autoPlayTime}ms linear infinite;
                    animation-iteration-count: 1;
                }
            }
    
            .${elClassName.paginationContent}{
                display: flex;
            }
        `}
    `}   
    
`;


