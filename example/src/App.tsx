import React from 'react'

import ImReactCarousel from 'imreact-carousel'
import 'imreact-carousel/dist/index.css'



const bgList = [
  {id: 1, image: '/static/sample/01.jpeg'},
  {id: 2, image: '/static/sample/02.jpeg'},
  {id: 3, image: '/static/sample/03.jpeg'},
  {id: 4, image: '/static/sample/04.jpeg'},
  {id: 5, image: '/static/sample/05.jpeg'},
  {id: 6, image: '/static/sample/06.jpeg'},
  {id: 7, image: '/static/sample/07.jpeg'},
  {id: 8, image: '/static/sample/08.jpeg'},
  {id: 9, image: '/static/sample/09.jpeg'},
  // {id: 10, image: '/static/sample/10.jpeg'},
];


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


const App = () => {
  return <ImReactCarousel
    isDebug={true}
    isEnablePagination={true}
    data={useBgData}
    slidesPerView={1}
    slidesPerGroup={1}
  />
}

export default App
