import React, {useCallback, useRef, useState} from 'react';
import styled, {css} from 'styled-components/macro';
import {Col, Container, EColType, media, Row} from 'imagine-react-styled-grid';
import ReactCarousel, {elClassName, IReactCarouselObj} from 'imagine-react-carousel';

import CSS from 'csstype';

interface FCProps {
    style?: CSS.Properties,
    className?: string,
}
interface IProps extends FCProps{
    data: Array<{
        key: string|number,
        name: string,
        image: string,
    }>
}


const setting = {
    slidesPerView: 1,
    slidesPerGroup: 1,
    isEnableMouseMove: true,
    isEnablePagination: true,
    isEnableNavButton: false,
    isEnableLoop: true,
    autoPlayTime: 5000,
    renderNavButton: (handleToPrev: Function, handleToNext: Function) => (
        <PaginateGroup className={elClassName.paginationGroup}>
            <Container>
                <Row className="justify-content-center justify-content-lg-end">
                    <Col col={EColType.auto}>
                        <NavButton type="button" onClick={() => handleToPrev()}>
                            <div>{'<'}</div>
                        </NavButton>
                    </Col>
                    <Col col={EColType.auto}>
                        <NavButton type="button" onClick={() => handleToNext()}>
                            <div>{'>'}</div>
                        </NavButton>
                    </Col>
                </Row>
            </Container>
        </PaginateGroup>
    ),
};


const HomeBanner = ({
    className,
    style,
    data = [],
}: IProps) => {
    const [control, setCarousel] = useState<IReactCarouselObj>();

    const handleGoPage = (index: number): void => {
        control?.goToPage(index);
    };

    const getPageTotal = (): number => {
        return control?.info.pageTotal?? 0;
    };

    const handleSetCarousel = useCallback(setCarousel, []);


    return (<BannerRoot className={className} style={style}>
        <ReactCarousel
            {...setting}
            setCarousel={handleSetCarousel}
            data={data.map(row => {
                return {
                    key: row.key,
                    paginationContent: <>{row.name}</>,
                    children: (<PageHeaderRoot image={row.image}>
                    </PageHeaderRoot>)
                };
            })}
        />

        <br/>
        <br/>
        {new Array(getPageTotal()).fill('').map((row, index) => {
            return <button key={`page_${index}`}
                type="button"
                style={{marginBottom: '20px',marginLeft: '5px'}}
                onClick={() => handleGoPage(index + 1)}>
                {index + 1}
            </button>;
        })}
    </BannerRoot>);
};

export default HomeBanner;

const ItemControl = styled.button`
  
`;

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


const PageHeaderRoot = styled.div<{
    image?: string,
}>`
      height: 200px;
      background: center center no-repeat;
      background-size: cover;
      color: #fff;
      

      ${props => props.image && css`
          background-image: url("${props.image}");
      `}


    ${media.sm`
        height: auto;
        padding-bottom: 36.5%;
    `}
`;

const BannerRoot = styled.div`
    height: 300px;
    .${elClassName.paginationContent}{
        display: none;

    }


    @keyframes progress-animation {
      from {width: 0;}
      to {width: 100%;}
    }


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
                background-color: #000;
                position: absolute;
                bottom: 0;
                left: 0;
            }

            &[data-active=true]:after {
                animation: progress-animation ${setting.autoPlayTime}ms linear infinite;
                animation-iteration-count: 1;
            }
        }

        .${elClassName.paginationContent}{
            display: flex;
        }
    `}
`;

