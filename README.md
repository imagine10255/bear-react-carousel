# react-carousel

> Most modern mobile touch slider with hardware accelerated transitions by react

[![NPM](https://img.shields.io/npm/v/imagine-react-carousel.svg)](https://www.npmjs.com/package/imagine-react-carousel)
[![npm](https://img.shields.io/npm/dm/imagine-react-carousel.svg)](https://www.npmjs.com/package/imagine-react-carousel)

This project [demo](https://imagine10255.github.io/react-carousel/)

## Install

```bash
yarn add imagine-react-carousel
```

## Usage

```tsx
import React from 'react'

import ReactCarousel from 'imagine-react-carousel'
import 'imagine-react-carousel/dist/index.css'


const imageList = [
  {id: 1, imageUrl: '/static/sample/01.jpg'},
  {id: 2, imageUrl: '/static/sample/02.jpg'},
  {id: 3, imageUrl: '/static/sample/03.jpg'},
  {id: 4, imageUrl: '/static/sample/04.jpg'},
  {id: 5, imageUrl: '/static/sample/05.jpg'},
  {id: 6, imageUrl: '/static/sample/06.jpg'},
  {id: 7, imageUrl: '/static/sample/07.jpg'},
  {id: 8, imageUrl: '/static/sample/08.jpg'},
  {id: 9, imageUrl: '/static/sample/09.jpg'},
];

// use background image
const carouselData = imageList.map(row => {
  return {
    key: row.id,
    children: <div
      style={{
        height: '100px',   <~ you need give hieght or use padding-bottom: %
        backgroundSize: 'cover',
        backgroundImage: `url(${row.imageUrl})`,
      }}
    />
  };
});


class ExampleComponent () => {

    const setting = {
        slidesPerView: 1,
        slidesPerGroup: 1,
        isEnableMouseMove: true,
        isEnablePagination: true,
        isEnableNavButton: false,
        isEnableLoop: true,
        autoPlayTime: 5000,
        breakpoints: {
            768: {
                slidesPerView: 2,
                isEnableLoop: false,
                isEnablePagination: false,
                isEnableNavButton: false,
                isEnableMouseMove: false,
            },
            1200: {
                slidesPerView: 4,
                isEnableLoop: true,
                isEnablePagination: true,
                isEnableNavButton: true,
                isEnableMouseMove: true,
            }
        }
        renderNavButton: (handleToPrev: Function, handleToNext: Function) => (
            <PaginateGroup className={elClassName.paginationGroup}>
                <Container>
                    <Row className="justify-content-center justify-content-lg-end">
                        <Col col="auto">
                            <NavButton type="button" onClick={() => handleToPrev()}>
                                <div>{'<'}</div>
                            </NavButton>
                        </Col>
                        <Col col="auto">
                            <NavButton type="button" onClick={() => handleToNext()}>
                                <div>{'>'}</div>
                            </NavButton>
                        </Col>
                    </Row>
                </Container>
            </PaginateGroup>
        ),
    };


    return <ReactCarousel
        {...setting}
        data={carouselData}
        
    />
}
```

There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-carousel-9h6eu)



## if your need control by out component, but not use loop

```tsx
const HomeBanner = ({
    const controlRef = useRef(undefined);
    
    const handleGoItem = (index: number) => {
        if(controlRef.current){
            controlRef.current.goToActualIndex(index);
        }
    };

    <ReactCarousel
        setControlRef={(ref) => controlRef.current = ref}
        {...setting}
        data={carouselData}
    />
}
```

## npm Push
```bash
npm publish --access public
```


## License

MIT © [imagine10255](https://github.com/imagine10255)
