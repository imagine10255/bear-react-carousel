import React, {ReactNodeArray, useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/macro';
import {Col, EDirection, Flex, Row} from 'bear-styled-grid';
import Carousel, {BearSlideBg, BearSlideCard, BearSlideImg, IBearCarouselObj, TBearSlideItemDataList} from 'bear-carousel';
import {anyToNumber} from 'bear-jsutils/convert';
import cx from 'classnames';


import {Controller, useForm} from 'react-hook-form';
import {Select, SwitchControl, TextAreaField, TextField} from 'bear-components/forms';
import {Button, FormHorizontalGroup} from 'bear-components/atoms';
import {catImages, productImages, diffImages} from 'config/images';
import {decodeToJson} from 'bear-jsutils/string';


enum ESlideItemCase {
    BearSlideImg= 'BearSlideImg',
    BearSlideBg='BearSlideBg',
    BearSlideCard='BearSlideCard'
}
const SlideItemImgData: TBearSlideItemDataList = diffImages.map(row => {
    return {
        key: `SlideItemImgData-${row.id}`,
        children: <BearSlideImg onClick={() => {}} imageUrl={row.imageUrl} imageAlt={row.name}/>
    };
});
const SlideItemBgData: TBearSlideItemDataList = diffImages.map(row => {
    return {
        key: `SlideItemBgData-${row.id}`,
        children: <BearSlideBg onClick={() => {}} imageUrl={row.imageUrl} />
    };
});

const ProductImage = styled.div<{
    imageUrl: string
}>`
  padding-top: 55%;
  width: 100%;
  background: #bdbdbd no-repeat 100%;
  background-image: url('${props => props.imageUrl}');
  background-size: cover;
  position: relative;
  
  :after{
    content: 'Name';
    background-color: #495057;
    color: #fff;
    height: 25px;
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ProductContent = styled.div`
    
`;
const ProductName = styled.div`
    
`;

const ProductSize = styled.div`
    
`;
const ProductColor = styled.div`
    
`;

const SlideItemCardData: TBearSlideItemDataList = productImages.map(row => {
    return {
        key: `SlideItemCardData-${row.id}`,
        children: <BearSlideCard onClick={() => {}} >
            <Flex direction={EDirection.column} className="w-100">
                <ProductImage imageUrl={row.imageUrl}/>
                <ProductContent>
                    <ProductName>2022 春季鞋子 BB343 로제플랫</ProductName>
                    <ProductSize>Size: S-M-L</ProductSize>
                    <ProductColor>Red</ProductColor>

                </ProductContent>
            </Flex>
        </BearSlideCard>
    };
});

const slideItemCase: {[key in ESlideItemCase]: TBearSlideItemDataList} = {
    [ESlideItemCase.BearSlideImg]: SlideItemImgData,
    [ESlideItemCase.BearSlideBg]: SlideItemBgData,
    [ESlideItemCase.BearSlideCard]: SlideItemCardData,
};




export interface IFormData {
    slidesComponent: 'BearSlideImg'|'BearSlideBg'|'BearSlideCard',
    slidesPerView: number|'auto',
    slidesPerGroup: number,
    spaceBetween: number,
    aspectRatioWidth: number,
    aspectRatioHeight: number,
    addStaticHeight: string,
    staticHeight: string,
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



const STORAGE_KEY = 'bear-carousel-props';

function getStorage(){
    return decodeToJson<{
        isExpend: boolean,
    } & IFormData>(localStorage.getItem(STORAGE_KEY) ?? '');
}

interface IProps {
    isLoadData: boolean,
}

/**
 * Props Try Carousel
 */
const PropsTryCarousel = ({
    isLoadData
}: IProps) => {
    const prefixStorage = getStorage();

    const [carousel, setCarousel] = useState<IBearCarouselObj>();
    const [isExpend, toggleExpend] = useState<boolean>(prefixStorage?.isExpend ?? true);
    const {control, watch, setValue, getValues} = useForm<IFormData>({
        defaultValues: {
            slidesComponent: 'BearSlideBg',
            moveTime: 400,
            autoPlayTime: 3000,
            aspectRatioWidth: 40,
            aspectRatioHeight: 9,
            staticHeight: '400px',
            isStaticHeightMode: true,
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
            isEnableMouseMove: true,
            isEnableAutoPlay: false,
            isEnableNavButton: true,
            isEnablePagination: true,
            isEnableLoop: true,
            ...prefixStorage,
            isMount: true,
        }
    });



    const slidesComponent = watch('slidesComponent');
    const isDebug = watch('isDebug');
    const isMount = watch('isMount');
    const isEnableLoop = watch('isEnableLoop');
    const isEnablePagination = watch('isEnablePagination');
    const isEnableNavButton = watch('isEnableNavButton');
    const isEnableMouseMove = watch('isEnableMouseMove');
    const isEnableAutoPlay = watch('isEnableAutoPlay');
    const isStaticHeightMode = watch('isStaticHeightMode');

    const slidesPerGroup = watch('slidesPerGroup');
    const slidesPerView = watch('slidesPerView');
    const spaceBetween = watch('spaceBetween');
    const aspectRatioWidth = watch('aspectRatioWidth');
    const aspectRatioHeight = watch('aspectRatioHeight');
    const addStaticHeight = watch('addStaticHeight');
    const staticHeight = watch('staticHeight');
    const autoPlayTime = watch('autoPlayTime');
    const moveTime = watch('moveTime');




    const slidesCountArray = new Array(slideItemCase[slidesComponent].length).fill('');
    const slidesCountOption = slidesCountArray.map((row, index) => {
        const value = (index * 0.5) + 1;
        return {text: String(value), value: String(value)};
    });


    const handleGoPage = (index: number): void => {
        carousel?.goToPage(index);
    };

    const getPageTotal = (): number => {
        return carousel?.info.pageTotal?? 0;
    };

    const handleSetCarousel = useCallback(setCarousel, []);


    useEffect(() => {
        if(slidesPerView === 'auto'){
            setValue('isStaticHeightMode',true);
        }
    }, [slidesPerView]);

    useEffect(() => {
        if(slidesComponent === ESlideItemCase.BearSlideCard){
            setValue('isStaticHeightMode',true);
            setValue('staticHeight','auto');
        }else if(slidesComponent === ESlideItemCase.BearSlideImg){
            setValue('slidesPerView','auto');
            setValue('staticHeight','400px');
        }
    }, [slidesComponent]);

    /**
     * 同步設定持久化
     */
    useEffect(() => {
        const formData = getValues();
        localStorage.setItem(STORAGE_KEY,JSON.stringify({
            ...formData,
            isExpend,
        }));
    });


    const renderCarousel = () => {
        return <Carousel
            setCarousel={handleSetCarousel}
            data={isLoadData ? slideItemCase[slidesComponent]: []}
            isDebug={isDebug}
            isEnablePagination={isEnablePagination}
            isEnableMouseMove={isEnableMouseMove}
            isEnableNavButton={isEnableNavButton}
            isEnableLoop={isEnableLoop}
            isEnableAutoPlay={isEnableAutoPlay}
            slidesPerView={slidesPerView}
            slidesPerGroup={anyToNumber(slidesPerGroup, 1)}
            spaceBetween={anyToNumber(spaceBetween)}
            autoPlayTime={anyToNumber(autoPlayTime)}
            moveTime={anyToNumber(moveTime)}
            aspectRatio={!isStaticHeightMode && aspectRatioWidth > 0 && aspectRatioHeight > 0 ? {widthRatio: aspectRatioWidth, heightRatio: aspectRatioHeight, addStaticHeight: addStaticHeight}: undefined}
            staticHeight={isStaticHeightMode ? staticHeight: undefined}
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
        />;
    };



    const renderPageControl = () => {
        return <PageControlBox className={cx({'d-none': !isExpend})}>

            <Col col={24}>
                <FormHorizontalGroup label="slidesComponent" labelCol={12} formCol={12}>
                    <Controller
                        control={control}
                        name="slidesComponent"
                        render={({field}) => {
                            return (<Select
                                {...field}
                                options={[
                                    {text: 'BearSlideImg', value: 'BearSlideImg'},
                                    {text: 'BearSlideBg', value: 'BearSlideBg'},
                                    {text: 'BearSlideCard', value: 'BearSlideCard'},
                                ]}
                            />);
                        }}
                    />
                </FormHorizontalGroup>
            </Col>

            <Col md={24}>
                <FormHorizontalGroup label="slidesPerView" labelCol={12} formCol={12}>
                    <Controller
                        control={control}
                        name="slidesPerView"
                        render={({field}) => {
                            return (<Select
                                {...field}
                                disabled={slidesPerView === 'auto'}
                                options={[
                                    {text: 'auto(only Card, Img)', value: 'auto'},
                                    ...slidesCountOption
                                ]}
                            />);
                        }}
                    />
                </FormHorizontalGroup>

            </Col>

            <Col md={12}>
                <FormHorizontalGroup label="staticHeightMode" labelCol={12} formCol={12}>
                    <Controller
                        control={control}
                        name="isStaticHeightMode"
                        render={({field}) => {
                            return <SwitchControl
                                {...field}
                                disabled={slidesPerView === 'auto'}
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
                                return (<Select
                                    {...field}
                                    options={[
                                        {text: 'auto(only Card, Img)', value: 'auto'},
                                        {text: '200px', value: '200px'},
                                        {text: '300px', value: '300px'},
                                        {text: '400px', value: '400px'},
                                    ]}
                                />);
                            }}
                        />
                    </FormHorizontalGroup>
                )}

                {!isStaticHeightMode && (<>
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
                        <FormHorizontalGroup label="addStaticHeight" labelCol={12} formCol={12}>

                            <Controller
                                control={control}
                                name="addStaticHeight"
                                render={({field}) => {
                                    return (<TextField
                                        type="text"
                                        placeholder="1px"
                                        {...field}
                                    />);
                                }}
                            />
                        </FormHorizontalGroup>

                    </>
                )}

            </Col>
        </PageControlBox>;
    };



    /**
     * render Pagination control
     */
    const renderPaginationControl = () => {
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

            <div className="flex-grow-1 justify-content-end d-flex">
                <Button
                    color="info"
                    onClick={() => toggleExpend(prev => !prev)}
                    className="m-1"
                >
                    {isExpend ? 'hide':'expend'}
                </Button>
            </div>


        </PageControlBox>;
    };


    const renderSettingControl = () => {
        return  <Row>

            <Col md={12}>
                <FormHorizontalGroup label="isMount" labelCol={12} formCol={12}>
                    <Controller
                        control={control}
                        name="isMount"
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
                <FormHorizontalGroup label="enableLoop" labelCol={12} formCol={12}>
                    <Controller
                        control={control}
                        name="isEnableLoop"
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
                <FormHorizontalGroup label="enablePagination"  labelCol={12} formCol={12}>
                    <Controller
                        control={control}
                        name="isEnablePagination"
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
                <FormHorizontalGroup label="enableNavButton" labelCol={12} formCol={12}>
                    <Controller
                        control={control}
                        name="isEnableNavButton"
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
                <FormHorizontalGroup label="enableMouseMove" labelCol={12} formCol={12}>
                    <Controller
                        control={control}
                        name="isEnableMouseMove"
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
                <FormHorizontalGroup label="enableAutoPlay" labelCol={12} formCol={12}>
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
                        render={({field}) => {
                            return (<Select
                                {...field}
                                disabled={slidesPerView === 'auto'}
                                options={[
                                    {text: 'auto(only Card, Img)', value: 'auto'},
                                    ...slidesCountOption,
                                ]}
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
                        render={({field}) => {
                            return (<Select
                                {...field}
                                options={[
                                    {text: '0', value: '0'},
                                    {text: '5', value: '5'},
                                    {text: '10', value: '10'},
                                    {text: '15', value: '15'},
                                    {text: '20', value: '20'},
                                    {text: '40', value: '40'},
                                ]}
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
                            return (<Select
                                {...field}
                                options={[
                                    {text: '2000', value: '2000'},
                                    {text: '3000', value: '3000'},
                                    {text: '4000', value: '4000'},
                                    {text: '5000', value: '5000'},
                                ]}
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
                        render={({field}) => {
                            return (<Select
                                {...field}
                                options={[
                                    {text: '300', value: '300'},
                                    {text: '400', value: '400'},
                                    {text: '500', value: '500'},
                                    {text: '600', value: '600'},
                                ]}
                            />);

                        }}
                    />
                </FormHorizontalGroup>

            </Col>
        </Row>;
    };





    return  <Row className="mb-1">
        <Col xl={24} >
            <Row>
                <Col col={24} className="mb-4">
                    {isMount && (<>
                        {renderCarousel()}
                    </>)}

                </Col>
                <Col col={24}>
                    {renderPaginationControl()}

                </Col>
            </Row>


        </Col>

        <Col lg={24} xl={12} className={cx( {'d-none': !isExpend})}>

            {renderPageControl()}

            {renderSettingControl()}
        </Col>


        <Col lg={24} xl className="mb-4">
            <TextAreaField id="console"/>

        </Col>

    </Row>;

};

export default PropsTryCarousel;



const PageControlBox = styled.div`
  padding: 8px;
  border: 1px dotted #00a3e0;
  width: auto;
  display: flex;
  flex-wrap: wrap;
  color: #fff;
  margin-bottom: 20px;
`;

