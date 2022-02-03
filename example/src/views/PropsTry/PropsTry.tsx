import React, {ReactNodeArray, useCallback, useState} from 'react';
import styled from 'styled-components/macro';
import {Col, Container, EColType, Flex, Row} from 'bear-styled-grid';
import Carousel, {ICarouselObj, TSlideItemDataList, SlideItem} from 'bear-carousel';
import {anyToNumber} from 'bear-jsutils/convert';


import {Controller, useForm} from 'react-hook-form';
import {TextAreaField, TextField, SwitchControl} from 'bear-components/forms';
import {FormHorizontalGroup, Button} from 'bear-components/atoms';
import Content from 'views/_components/Content';
import {racingImages as images} from 'config/images';
// import {catImages as images} from 'config/images';

const Bg = styled.div`
    background: center no-repeat;
    background-size: 100%;
    height: 100%;
`;

// const carouselData: TSlideItemDataList = images.map(row => {
//     return {
//         key: row.id,
//         children: <Bg
//             style={{
//                 backgroundImage: `url(${row.image})`,
//             }}
//         />
//     };
// });
//

const SlideItemData: TSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <SlideItem imageUrl={row.image}/>
    };
});



export interface IFormData {
  slidesPerView: number,
  slidesPerGroup: number,
  spaceBetween: number,
  autoPlayTime: number,
  moveTime: number,
  isEnableLoop: boolean,
  isEnableNavButton: boolean,
  isEnablePagination: boolean,
  isEnableMouseMove: boolean,
  isEnableAutoPlay: boolean,
  isDebug: boolean,
  isMount: boolean,
}


/**
 * Props Try
 */
const PropsTry = () => {
    const [isLoadData, setIsLoadData] = useState<boolean>(true);

    const [carousel, setCarousel] = useState<ICarouselObj>();

    const {control, watch} = useForm<IFormData>({
        defaultValues: {
            isMount: true,
            autoPlayTime: 3000,
        }
    });



    const isDebug = watch('isDebug');
    const isMount = watch('isMount');
    const isEnableLoop = watch('isEnableLoop');
    const isEnablePagination = watch('isEnablePagination');
    const isEnableNavButton = watch('isEnableNavButton');
    const isEnableMouseMove = watch('isEnableMouseMove');
    const isEnableAutoPlay = watch('isEnableAutoPlay');

    const slidesPerGroup = watch('slidesPerGroup');
    const slidesPerView = watch('slidesPerView');
    const spaceBetween = watch('spaceBetween');
    const autoPlayTime = watch('autoPlayTime');
    const moveTime = watch('moveTime');



    const handleGoPage = (index: number): void => {
        carousel?.goToPage(index);
    };

    const getPageTotal = (): number => {
        return carousel?.info.pageTotal?? 0;
    };

    const handleSetCarousel = useCallback(setCarousel, []);





    /**
   * render page control
   */
    const renderPageControl = () => {
        const pageTotal = getPageTotal();
        let pageEls: ReactNodeArray = [];

        if(pageTotal > 0){
            pageEls = new Array(pageTotal).fill('').map((row, index) => {
                return <Button color="primary" key={`page_${index}`}
                    className="m-1"
                    onClick={() => handleGoPage(index + 1)}>
                    {index + 1}
                </Button>;
            });
        }


        return <PageControlBox>
            {pageEls}
        </PageControlBox>;
    };


    return <Content
        title="Props Try"
        desc="All available incoming parameters allow you to test and preview the results"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >
        <div className="mb-4">
            {isMount && (<>
                <Carousel
                    setCarousel={handleSetCarousel}
                    data={isLoadData ? SlideItemData: []}
                    isDebug={isDebug}
                    isEnablePagination={isEnablePagination}
                    isEnableMouseMove={isEnableMouseMove}
                    isEnableNavButton={isEnableNavButton}
                    isEnableLoop={isEnableLoop}
                    isEnableAutoPlay={isEnableAutoPlay}
                    slidesPerView={anyToNumber(slidesPerView, 1)}
                    slidesPerGroup={anyToNumber(slidesPerGroup, 1)}
                    spaceBetween={anyToNumber(spaceBetween)}
                    autoPlayTime={anyToNumber(autoPlayTime)}
                    moveTime={anyToNumber(moveTime)}
                    aspectRatio={{widthRatio: 32, heightRatio: 9}}
                    // breakpoints={{
                    //     768: {
                    //         slidesPerView: 2,
                    //         isEnableLoop: false,
                    //         isEnablePagination: false,
                    //         isEnableNavButton: false,
                    //     },
                    //     1200: {
                    //         slidesPerView: 1,
                    //         isEnableLoop: true,
                    //         isEnablePagination: true,
                    //         isEnableNavButton: true,
                    //     }
                    // }}
                />
            </>)}

        </div>

        <Row className="mb">
            <Col lg={24} xl={12}>
                {renderPageControl()}

                <Row>

                    <Col md={12}>
                        <FormHorizontalGroup label="isMount" labelCol={12} formCol={12}>
                            <Controller
                                control={control}
                                name="isMount"
                                defaultValue={true}
                                render={({field}) => {
                                    return <SwitchControl
                                        {...field}
                                        checked={field.value}
                                    />;
                                }}
                            />
                        </FormHorizontalGroup>

                    </Col>
                    <Col md={12}>
                        <FormHorizontalGroup label="isDebug" labelCol={12} formCol={12}>
                            <Controller
                                control={control}
                                name="isDebug"
                                defaultValue={true}
                                render={({field}) => {
                                    return <SwitchControl
                                        {...field}
                                        checked={field.value}
                                    />;
                                }}
                            />
                        </FormHorizontalGroup>

                    </Col>
                    <Col md={12}>
                        <FormHorizontalGroup label="isEnableLoop" labelCol={12} formCol={12}>
                            <Controller
                                control={control}
                                name="isEnableLoop"
                                defaultValue={true}
                                render={({field}) => {
                                    return <SwitchControl
                                        {...field}
                                        checked={field.value}
                                    />;
                                }}
                            />
                        </FormHorizontalGroup>

                    </Col>
                    <Col md={12}>
                        <FormHorizontalGroup label="isEnablePagination"  labelCol={12} formCol={12}>
                            <Controller
                                control={control}
                                name="isEnablePagination"
                                defaultValue={true}
                                render={({field}) => {
                                    return <SwitchControl
                                        {...field}
                                        checked={field.value}
                                    />;
                                }}
                            />
                        </FormHorizontalGroup>

                    </Col>
                    <Col md={12}>
                        <FormHorizontalGroup label="isEnableNavButton" labelCol={12} formCol={12}>
                            <Controller
                                control={control}
                                name="isEnableNavButton"
                                defaultValue={true}
                                render={({field}) => {
                                    return <SwitchControl
                                        {...field}
                                        checked={field.value}
                                    />;
                                }}
                            />
                        </FormHorizontalGroup>


                    </Col>
                    <Col md={12}>
                        <FormHorizontalGroup label="isEnableMouseMove" labelCol={12} formCol={12}>
                            <Controller
                                control={control}
                                name="isEnableMouseMove"
                                defaultValue={true}
                                render={({field}) => {
                                    return <SwitchControl
                                        {...field}
                                        checked={field.value}
                                    />;
                                }}
                            />
                        </FormHorizontalGroup>

                    </Col>
                    <Col md={12}>
                        <FormHorizontalGroup label="isEnableAutoPlay" labelCol={12} formCol={12}>
                            <Controller
                                control={control}
                                name="isEnableAutoPlay"
                                defaultValue={true}
                                render={({field}) => {
                                    return <SwitchControl
                                        {...field}
                                        checked={field.value}
                                    />;
                                }}
                            />
                        </FormHorizontalGroup>

                    </Col>
                    <Col md={12}>
                        <FormHorizontalGroup label="slidesPerView" labelCol={12} formCol={12}>
                            <Controller
                                control={control}
                                name="slidesPerView"
                                defaultValue={1}
                                render={({field}) => {
                                    return (<TextField
                                        type="number"
                                        {...field}
                                    />);
                                }}
                            />
                        </FormHorizontalGroup>

                    </Col>
                    <Col md={12}>
                        <FormHorizontalGroup label="slidesPerGroup" labelCol={12} formCol={12}>
                            <Controller
                                control={control}
                                name="slidesPerGroup"
                                defaultValue={1}
                                render={({field}) => {
                                    return (<TextField
                                        type="number"
                                        {...field}
                                    />);
                                }}
                            />
                        </FormHorizontalGroup>

                    </Col>
                    <Col md={12}>
                        <FormHorizontalGroup label="spaceBetween" labelCol={12} formCol={12}>
                            <Controller
                                control={control}
                                name="spaceBetween"
                                defaultValue={0}
                                render={({field}) => {
                                    return (<TextField
                                        type="number"
                                        {...field}
                                    />);
                                }}
                            />
                        </FormHorizontalGroup>

                    </Col>
                    <Col md={12}>
                        <FormHorizontalGroup label="autoPlayTime" labelCol={12} formCol={12}>
                            <Controller
                                control={control}
                                name="autoPlayTime"
                                render={({field}) => {
                                    return (<TextField
                                        type="number"
                                        {...field}
                                    />);
                                }}
                            />
                        </FormHorizontalGroup>

                    </Col>
                    <Col md={12}>
                        <FormHorizontalGroup label="moveTime" labelCol={12} formCol={12}>
                            <Controller
                                control={control}
                                name="moveTime"
                                defaultValue={400}
                                render={({field}) => {
                                    return (<TextField
                                        type="number"
                                        {...field}
                                    />);
                                }}
                            />
                        </FormHorizontalGroup>

                    </Col>
                </Row>
















            </Col>
            <Col lg={24} xl>
                <TextAreaField id="console"/>

            </Col>

        </Row>

    </Content>;

};

export default PropsTry;



const PageControlBox = styled.div`
  padding: 8px;
  border: 1px dotted #00a3e0;
  width: auto;
  display: flex;
  flex-wrap: wrap;
  color: #fff;
  margin-bottom: 20px;
`;

