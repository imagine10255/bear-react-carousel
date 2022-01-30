import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/macro';
import {Col, Container, EColType, GridThemeProvider, Row} from 'imagine-react-styled-grid';
import ReactCarousel, {IReactCarouselObj} from 'imagine-react-carousel';


import 'imagine-react-carousel/dist/index.css';
import HomeRoot from './views/HomeRoot'
import { IBreakpoints, TContainerMaxWidths, TGridGutterWidthMedia } from 'imagine-react-styled-grid/dist/typings'


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

    return <GridThemeProvider gridTheme={{
        // gridGutterWidth: number;
        // gridColumns: number;
        // gridBreakpoints: IBreakpoints;
        // containerMaxWidths: TContainerMaxWidths;
        // gridGutterWidthMedia: Partial<TGridGutterWidthMedia>;
    }}>


       <HomeRoot/>


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
