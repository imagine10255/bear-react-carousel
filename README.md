# imreact-carousel

> Most modern mobile touch slider with hardware accelerated transitions by react

[![NPM](https://img.shields.io/npm/v/imreact-carousel.svg)](https://www.npmjs.com/package/imreact-carousel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add imreact-carousel
```

## Usage

```tsx
import React, { Component } from 'react'

import ImreactCarousel from 'imreact-carousel'
import 'imreact-carousel/dist/index.css'


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
];

const carouselData = bgList.map(row => {
  return {
    key: String(row.id),
    children: <div
      style={{
        backgroundImage: `url(${row.image})`,
      }}
    />
  };
});


class Example extends Component {


const useBgData = bgList.map(row => {
  return {
    key: String(row.id),
    children: <div
      className="carousel_item"
      style={{
        backgroundImage: `url(${row.image})`,
      }}
    />
  };
});

  render() {
    return <ImreactCarousel
        isDebug={true}
        isEnablePagination={true}
        data={carouselData}
        slidesPerView={1}
        slidesPerGroup={1}
      />
  }
}
```

## License

MIT © [imagine10255](https://github.com/imagine10255)
