import {arraySplit} from '@acrool/js-utils/array';
import AcroolCarousel, {AcroolSlideCard, Controller, TAcroolSlideItemDataList} from '@acrool/react-carousel';
import {Col, Row} from '@acrool/react-grid';
import {Img} from '@acrool/react-img';
import {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';

import {mockData} from './mockData';
import {IBallCategoryCarouselData, IBallCategoryCarouselProps} from './types';






/**
 * Component / Molecules @ Live Event 輪播
 */
const CategoryPanel = ({
}: IBallCategoryCarouselProps) => {
    const [activeId, onSetActiveId] = useState<string|null>(null);
    const [controller, setController] = useState<Controller|null>(null);
    const [previewData, setPreviewData] = useState<IBallCategoryCarouselData[]|undefined>(undefined);
    const [startIndex, setStartIndex] = useState<number>(0);


    useEffect(() => {
        setTimeout(() => {
            setPreviewData(mockData.slice(0, 6));
        },1);
    }, []);




    const handleOnClick = (id: string) => {
        const currIndex = mockData.findIndex(row => row.id === id);
        if(currIndex === -1) return;


        const pageIndex = Math.floor(currIndex / 6);
        const startIndex = pageIndex * 6;
        const endIndex = startIndex + 6;
        const filterData = mockData.slice(startIndex, endIndex);

        setPreviewData(filterData);
        setStartIndex(startIndex);
        // setTimeout(() => {
        // }, 1);

        onSetActiveId(id);
        controller?.slideToPage(1);

    };


    const getCarouselData = (): TAcroolSlideItemDataList => {
        const dataPaginate = mockData ? arraySplit(mockData,18) : undefined;


        const dataList2 = [
            <AcroolSlideCard key={`preview_${startIndex}`}>
                <Row className="flex-nowrap g-2">
                    {
                        previewData
                            ?.map(row => {
                                const isActive = row.id === activeId;

                                return <Col col={12/6}
                                    key={`preview_col_${row.id}`}
                                >
                                    <Card $active={row.id === activeId} onClick={() => {
                                        onSetActiveId(row.id);
                                    }}>
                                        <div className="position-relative">
                                            <Img src={isActive ? row.activePath: row.path} width={28} height={28} className="mt-1"/>
                                            <Count>{row.count}</Count>
                                        </div>
                                        <Name className="text-overflow">{row.name}</Name>
                                        <ActiveLine/>
                                    </Card>
                                </Col>;
                            })
                    }
                </Row>

            </AcroolSlideCard>,
            ...dataPaginate?.map((page, idx) => {
                return <AcroolSlideCard key={`real_${idx}`}>
                    <Row>
                        {page?.map(row => {
                            const isActive = row.id === activeId;

                            return <Col
                                col={12/6}
                                key={`real_col_${row.id}`}
                            >
                                <Card $active={row.id === activeId}
                                    onClick={() => {
                                        handleOnClick(row.id);
                                    }}>
                                    <div className="position-relative">
                                        <Img src={isActive ? row.activePath: row.path} width={28} height={28} className="mt-1"/>
                                        <Count>{row.count}</Count>
                                    </div>
                                    <Name className="text-overflow">{row.name}</Name>
                                    <ActiveLine/>
                                </Card>
                            </Col>;
                        }) ?? []}
                    </Row>

                </AcroolSlideCard>;

            }) ?? []
        ];

        return dataList2;

    };


    /**
     * 渲染輪播區塊
     */
    const renderCarousel = () => {

        return <CarouselWrapper>
            <CustomAcroolCarousel
                data={getCarouselData()}
                slidesPerView={1}
                spaceBetween={16}
                height="auto"
                isAutoMaxHeight
                setController={setController}
            />
        </CarouselWrapper>;
    };


    return <BallCategoryCarouselRoot>

        {renderCarousel()}

    </BallCategoryCarouselRoot>;
};

export default CategoryPanel;






const ActiveLine = styled.div`
    width: 50%;
    height: 4px;
    border-radius: 30px;
    background: linear-gradient(276deg, #12B9CC 44.33%, #96D5DC 98.56%);

    transition: height .3s, opacity .2s, margin-top .2s;
`;


const Count = styled.div`
    position: absolute;
    top: 0;
    right: -10px;
    border-radius: 30px;
    background: var(--primary-color, #13bacc);

    color: #fff;

    font-size: 12px;
    font-weight: 600;
    padding: 0 4px;
`;


const Name = styled.div`
    color: var(--ball-category-carousel__text-active-color, #fff);
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    width: 100%;
`;




const Card = styled.div<{
    $active: boolean,
}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    width: 50px;
    height: 64px;


    position: relative;

    ${props => !props.$active && css`
        ${ActiveLine}{
            height: 0;
            opacity: 0;

        }
        ${Count}{
            background: #000;
        }
        ${Name}{
            color: var(--ball-category-carousel__text-color, #656a8e);
            text-align: center;
            font-size: 10px;
            font-weight: 400;
        }
    `}
`;


const CustomAcroolCarousel = styled(AcroolCarousel)`
    .acrool-react-carousel__container{
        //min-height: 64px;
    }
`;

const CarouselWrapper = styled.div`
    flex: 1;
    overflow: hidden;
`;

const BallCategoryCarouselRoot = styled.div`
    border-radius: 10px;
    background-color: var(--ball-category-carousel__bg-color, #23283A);
    padding: 10px 0 14px 0;
    display: flex;
    align-items: center;

    width: 100%;
    max-width: 400px;
`;
