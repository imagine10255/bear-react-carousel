import React from 'react'

import ImReactCarousel from 'imreact-carousel'
import 'imreact-carousel/dist/index.css'



const bgList = [
  {id: 1, image: '/images/01.jpeg'},
  {id: 2, image: '/images/02.jpeg'},
  {id: 3, image: '/images/03.jpeg'},
  {id: 4, image: '/images/04.jpeg'},
  {id: 5, image: '/images/05.jpeg'},
  {id: 6, image: '/images/06.jpeg'},
  {id: 7, image: '/images/07.jpeg'},
  {id: 8, image: '/images/08.jpeg'},
  {id: 9, image: '/images/09.jpeg'},
  // {id: 10, image: '/images/10.jpeg'},
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
