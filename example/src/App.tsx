import React from 'react'

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
  // {id: 10, image: '/static/sample/10.jpg'},
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


const App = () => {
  return <ImreactCarousel
    isDebug={true}
    isEnablePagination={true}
    data={carouselData}
    slidesPerView={1}
    slidesPerGroup={1}
  />
}

export default App
