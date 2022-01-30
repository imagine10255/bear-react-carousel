import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/macro';
import {Col, Container, EColType, GridThemeProvider, Row} from 'imagine-react-styled-grid';
import ReactCarousel, {IReactCarouselObj} from 'imagine-react-carousel';
import {anyToNumber} from 'imagine-js-utils/convert';


import 'imagine-react-carousel/dist/index.css';


const bgList = [
    {id: 1, image: '/static/sample/01.jpg'},
    {id: 2, image: '/static/sample/02.jpg'},
    {id: 3, image: '/static/sample/03.jpg'},
    {id: 4, image: '/static/sample/04.jpg'},
    {id: 5, image: '/static/sample/05.jpg'},
    {id: 6, image: '/static/sample/06.jpg'},
    {id: 7, image: '/static/sample/07.jpg'},
    {id: 8, image: '/static/sample/08.jpg'},
    {id: 9, image: '/static/sample/09.jpg'},
    // {id: 10, image: '/static/sample/10.jpg'},
];


const carouselData = bgList.map(row => {
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


const App = () => {
    const [isMount, setIsMount] = useState<boolean>(true);
    const [isDebug, setIsDebug] = useState<boolean>(true);
    const [isEnableMouseMove, setIsEnableMouseMove] = useState<boolean>(true);
    const [isEnableNavButton, setIsEnableNavButton] = useState<boolean>(true);
    const [isEnablePagination, setIsEnablePagination] = useState<boolean>(true);
    const [isEnableLoop, setIsEnableLoop] = useState<boolean>(true);
    const [slidesPerView, setSlidesPerView] = useState<number>(1);
    const [slidesPerGroup, setSlidesPerGroup] = useState<number>(1);
    const [moveTime, setMoveTime] = useState<number>(400);

    const [data, setData] = useState<Array<{key: number, children: React.ReactElement}>>([]);
    const [control, setCarousel] = useState<IReactCarouselObj>();

    useEffect(() => {
        // mock api get data
        setTimeout(() => {
            setData(carouselData);
        }, 400);
    }, []);

    const handleGoPage = (index: number): void => {
        control?.goToPage(index);
    };

    const getPageTotal = (): number => {
        return control?.info.pageTotal?? 0;
    };

    const handleSetCarousel = useCallback(setCarousel, []);


    /**
     * render control
     */
    const renderControlContent = () => {
        const data = [
            {name: 'isMount', state: isMount, setState: setIsMount},
            {name: 'isDebug', state: isDebug, setState: setIsDebug},
            {name: 'isEnableMouseMove', state: isEnableMouseMove, setState: setIsEnableMouseMove},
            {name: 'isEnableNavButton', state: isEnableNavButton, setState: setIsEnableNavButton},
            {name: 'isEnablePagination', state: isEnablePagination, setState: setIsEnablePagination},
            {name: 'isEnableLoop', state: isEnableLoop, setState: setIsEnableLoop},
        ];

        return data.map(row => {

            return <ControlCheckbox key={row.name}>
                <input type="checkbox"
                    checked={row.state}
                    onChange={() => row.setState(prev => !prev)}
                />
                {row.name}: {String(row.state)}
            </ControlCheckbox>;
        });
    };


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

    /**
     * render page control
     */
    const renderTextBoxControl = () => {

        const data = [
            {name: 'slidesPerView', state: slidesPerView, setState: setSlidesPerView},
            {name: 'slidesPerGroup', state: slidesPerGroup, setState: setSlidesPerGroup},
            {name: 'moveTime', state: moveTime, setState: setMoveTime},
        ];

        return data.map(row => {

            return <ControlCheckbox key={row.name}>
                <TextTitle>{row.name}</TextTitle>
                <input type="number"
                    value={row.state}
                    onChange={(event) => row.setState(anyToNumber(event.target.value))}
                />
            </ControlCheckbox>;
        });
    };


    return <GridThemeProvider gridTheme={{}}>


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



        <Container>
            <Row className="mb">
                <Col lg={24} xl={EColType.auto}>
                    {renderControlContent()}
                    {renderPageControl()}
                    {renderTextBoxControl()}

                </Col>
                <Col lg={24} xl>
                    <textarea id="console" rows={50}/>
                </Col>

            </Row>

        </Container>







    </GridThemeProvider>;

};

export default App;


const TextTitle = styled.div`
    margin-right: 8px;
`;

const PageControlBox = styled.div`
  padding: 8px;
  border: 1px dotted #00a3e0;
  width: auto;
  display: flex;
  margin-bottom: 20px;

  button{
    margin: 0 5px;
  }
  
`;

const ControlCheckbox = styled.label`
  display: flex;
  margin-bottom: 5px;
`;

const ReactCarouselBox = styled.div`
  height: 200px;
`;
