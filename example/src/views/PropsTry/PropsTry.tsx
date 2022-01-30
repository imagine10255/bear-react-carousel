import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/macro';
import {Col, Container, EColType, GridThemeProvider, Row} from 'imagine-react-styled-grid';
import ReactCarousel, {IReactCarouselObj} from 'imagine-react-carousel';
import {anyToNumber} from 'imagine-js-utils/convert';


import 'imagine-react-carousel/dist/index.css';
import FormHorizontalGroup from '../../components/forms/FormHorizontalGroup';
import {Controller, useForm} from 'react-hook-form';
import TextField from 'components/forms/TextField';
import SwitchControl from 'components/forms/SwitchControl';
import TextAreaField from '../../components/forms/TextAreaField';

type ICarouselData = Array<{key: number, children: React.ReactElement}>;

const bgList = [
    {id: 9, image: '/static/sample/09.jpg'},
    {id: 2, image: '/static/sample/02.jpg'},
    {id: 3, image: '/static/sample/03.jpg'},
    {id: 4, image: '/static/sample/04.jpg'},
    {id: 5, image: '/static/sample/05.jpg'},
    {id: 6, image: '/static/sample/06.jpg'},
    {id: 7, image: '/static/sample/07.jpg'},
    {id: 8, image: '/static/sample/08.jpg'},
    {id: 1, image: '/static/sample/01.jpg'},
    // {id: 10, image: '/static/sample/10.jpg'},
];


const carouselData: ICarouselData = bgList.map(row => {
    return {
        key: row.id,
        children: <div
            className="carousel_item"
            style={{
                backgroundImage: `url(${row.image})`,
                backgroundSize: 'cover',
                height: '200px'
            }}
        />
    };
});



export interface IFormData {
  slidesPerView: number,
  slidesPerGroup: number,
  moveTime: number,
  isEnableMouseMove: boolean,
  isEnableNavButton: boolean,
  isEnablePagination: boolean,
  isEnableLoop: boolean,
  isDebug: boolean,
  isMount: boolean,
  isLoadData: boolean,
}




const PropsTry = () => {
    const [data, setData] = useState<ICarouselData>(carouselData);
    const [carousel, setCarousel] = useState<IReactCarouselObj>();

    const {control, watch} = useForm<IFormData>({
        defaultValues: {
            isMount: true,
        }
    });



    const [slidesPerView, slidesPerGroup, moveTime, isEnableMouseMove, isEnableNavButton, isEnablePagination, isEnableLoop, isDebug, isMount] = watch([
        'slidesPerView',
        'slidesPerGroup',
        'moveTime',
        'isEnableMouseMove',
        'isEnableNavButton',
        'isEnablePagination',
        'isEnableLoop',
        'isDebug',
        'isMount',
    ]
    );


    const handleLoadData = (data: ICarouselData) => {
        setData(data);
    };

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

        const pages = new Array(getPageTotal()).fill('').map((row, index) => {
            return <button key={`page_${index}`}
                type="button"
                onClick={() => handleGoPage(index + 1)}>
                {index + 1}
            </button>;
        });

        return <PageControlBox>
            {pages}
        </PageControlBox>;
    };


    return <ContentRoot>

        <Container>

            <Title>Props Try</Title>
            <Desc>
        All available incoming parameters allow you to test and preview the results
            </Desc>

            <ReactCarouselBox className="mb-4">
                {isMount && (<>
                    <ReactCarousel
                        setCarousel={handleSetCarousel}
                        isDebug={isDebug}
                        isEnablePagination={isEnablePagination}
                        isEnableMouseMove={isEnableMouseMove}
                        isEnableNavButton={isEnableNavButton}
                        isEnableLoop={isEnableLoop}
                        data={data}
                        slidesPerView={slidesPerView}
                        slidesPerGroup={slidesPerGroup}
                        moveTime={moveTime}
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

            </ReactCarouselBox>




            <Row className="mb">
                <Col lg={24} xl>
                    {renderPageControl()}

                    <FormHorizontalGroup label="isLoadData">
                        <Controller
                            control={control}
                            name="isLoadData"
                            defaultValue={true}
                            render={({field}) => {
                                return <SwitchControl
                                    {...field}
                                    onChange={(checked) => {
                                        handleLoadData(checked ? carouselData: []);
                                        field.onChange(checked);
                                        return;
                                    }}
                                    checked={field.value}
                                />;
                            }}
                        />
                    </FormHorizontalGroup>

                    <FormHorizontalGroup label="isMount">
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

                    <FormHorizontalGroup label="isDebug">
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

                    <FormHorizontalGroup label="isEnableLoop">
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

                    <FormHorizontalGroup label="isEnablePagination">
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

                    <FormHorizontalGroup label="isEnableNavButton">
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

                    <FormHorizontalGroup label="isEnableMouseMove">
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

                    <FormHorizontalGroup label="slidesPerView">
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

                    <FormHorizontalGroup label="slidesPerGroup">
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

                    <FormHorizontalGroup label="moveTime">
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
                <Col lg={24}  xl={EColType.auto}>
                    <TextAreaField id="console"/>

                </Col>

            </Row>
        </Container>









    </ContentRoot>;

};

export default PropsTry;


const Desc = styled.p`
  margin-top: 0;
  margin-bottom: 21.25px;
      color: rgb(245, 246, 247);
font-size: 17px;
`;

const TextTitle = styled.div`
    margin-right: 8px;
`;

const PageControlBox = styled.div`
  padding: 8px;
  border: 1px dotted #00a3e0;
  width: auto;
  display: flex;
  margin-bottom: 20px;
  color: #fff;

  button{
    margin: 0 5px;
  }
  
`;

const ControlCheckbox = styled.label`
  display: flex;
  margin-bottom: 5px;
  color: #fff;
`;

const ReactCarouselBox = styled.div`
  height: 200px;
`;



const Title = styled.h1`
  font-size: 51px;
  color: rgb(245, 246, 247);
  margin-block-start: 0;
    margin-block-end: 0;
    margin-bottom: 26.5625px

`;

const ContentRoot = styled.div`
  
`;
