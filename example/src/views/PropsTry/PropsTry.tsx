import React, {ReactNodeArray, useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/macro';
import {Col, Row} from 'bear-styled-grid';
import Carousel, {ICarouselObj, TSlideItemDataList, SlideItem} from 'bear-carousel';
import {anyToNumber} from 'bear-jsutils/convert';


import {Controller, useForm} from 'react-hook-form';
import {TextAreaField, TextField, SwitchControl} from 'bear-components/forms';
import {FormHorizontalGroup, Button} from 'bear-components/atoms';
import Content from 'views/_components/Content';
import {catImages as images} from 'config/images';
import {isNotEmpty} from 'bear-jsutils/dist/equal';


const SlideItemData: TSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <SlideItem imageUrl={row.imageUrl} imageSize="cover"/>
    };
});



export interface IFormData {
  slidesPerView: number,
  slidesPerGroup: number,
  spaceBetween: number,
  aspectRatioWidth: number,
  aspectRatioHeight: number,
  staticHeight: number,
  isAutoMode: boolean,
  isStaticHeightMode: boolean,
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
    const {control, watch, setValue} = useForm<IFormData>({
        defaultValues: {
            isMount: true,
            isEnableAutoPlay: false,
            autoPlayTime: 3000,
            aspectRatioWidth: 16,
            aspectRatioHeight: 9,
            staticHeight: 400,
            isAutoMode: false,
            isStaticHeightMode: false,
        }
    });



    const isDebug = watch('isDebug');
    const isMount = watch('isMount');
    const isEnableLoop = watch('isEnableLoop');
    const isEnablePagination = watch('isEnablePagination');
    const isEnableNavButton = watch('isEnableNavButton');
    const isEnableMouseMove = watch('isEnableMouseMove');
    const isEnableAutoPlay = watch('isEnableAutoPlay');
    const isAutoMode = watch('isAutoMode');
    const isStaticHeightMode = watch('isStaticHeightMode');

    const slidesPerGroup = watch('slidesPerGroup');
    const slidesPerView = watch('slidesPerView');
    const spaceBetween = watch('spaceBetween');
    const aspectRatioWidth = watch('aspectRatioWidth');
    const aspectRatioHeight = watch('aspectRatioHeight');
    const staticHeight = watch('staticHeight');
    const autoPlayTime = watch('autoPlayTime');
    const moveTime = watch('moveTime');



    const handleGoPage = (index: number): void => {
        carousel?.goToPage(index);
    };

    const getPageTotal = (): number => {
        return carousel?.info.pageTotal?? 0;
    };

    const handleSetCarousel = useCallback(setCarousel, []);


    useEffect(() => {
        if(isAutoMode === true){
            setValue('isStaticHeightMode',true);
        }
    }, [isAutoMode]);



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
        title="PropsTry"
        isLoadData={isLoadData}
        onLoadData={setIsLoadData}
    >

        <Row className="mb-1">
            <Col lg={24} xl={12} className="order-1 order-lg-0">
                {renderPageControl()}

                <PageControlBox>

                    <Col md={12}>
                        <FormHorizontalGroup label="isAutoMode" labelCol={12} formCol={12}>
                            <Controller
                                control={control}
                                name="isAutoMode"
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
                                        disabled={isAutoMode}
                                        {...field}
                                    />);
                                }}
                            />
                        </FormHorizontalGroup>

                    </Col>

                    <Col md={12}>
                        <FormHorizontalGroup label="isStaticHeightMode" labelCol={12} formCol={12}>
                            <Controller
                                control={control}
                                name="isStaticHeightMode"
                                render={({field}) => {
                                    return <SwitchControl
                                        {...field}
                                        disabled={isAutoMode}
                                        checked={field.value}
                                    />;
                                }}
                            />
                        </FormHorizontalGroup>
                    </Col>
                    <Col md={12}>
                        {isStaticHeightMode && (
                            <FormHorizontalGroup label="staticHeight" labelCol={12} formCol={12}>
                                <Controller
                                    control={control}
                                    name="staticHeight"
                                    render={({field}) => {
                                        return (<TextField
                                            type="number"
                                            {...field}
                                        />);
                                    }}
                                />
                            </FormHorizontalGroup>
                        )}

                        {!isStaticHeightMode && (
                            <FormHorizontalGroup label="aspectRatio" labelCol={12} formCol={12}>
                                <Controller
                                    control={control}
                                    name="aspectRatioWidth"
                                    render={({field}) => {
                                        return (<TextField
                                            type="number"
                                            {...field}
                                        />);
                                    }}
                                />
                                <Controller
                                    control={control}
                                    name="aspectRatioHeight"
                                    render={({field}) => {
                                        return (<TextField
                                            type="number"
                                            {...field}
                                        />);
                                    }}
                                />
                            </FormHorizontalGroup>
                        )}

                    </Col>




                </PageControlBox>

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

            <Col xl={12} className="order-0 order-lg-1">
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
                        slidesPerView={isAutoMode ? 'auto' : anyToNumber(slidesPerView, 1)}
                        slidesPerGroup={anyToNumber(slidesPerGroup, 1)}
                        spaceBetween={anyToNumber(spaceBetween)}
                        autoPlayTime={anyToNumber(autoPlayTime)}
                        moveTime={anyToNumber(moveTime)}
                        aspectRatio={!isStaticHeightMode && aspectRatioWidth > 0 && aspectRatioHeight > 0 ? {widthRatio: aspectRatioWidth, heightRatio: aspectRatioHeight}: undefined}
                        staticHeight={isStaticHeightMode && isNotEmpty(staticHeight) ? `${staticHeight}px` : undefined}
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
            </Col>
            <Col lg={24} xl className="order-5">
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

