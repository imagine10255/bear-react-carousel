import React, { useCallback, useEffect, useState } from 'react'

import ReactCarousel from 'imagine-react-carousel';
import 'imagine-react-carousel/dist/index.css';
import { IReactCarouselObj } from '../../src/ReactCarousel'



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
    const [isEnableMouseMove, setIsEnableMouseMove] = useState<boolean>(true);
    const [data, setData] = useState<Array<{key: number, children: React.ReactElement}>>([]);
    const [control, setCarousel] = useState<IReactCarouselObj>();
    const [isVisible, setVisible] = useState<boolean>(true);

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
    }

    const handleSetCarousel = useCallback(setCarousel, [])


    return <div>

        {isVisible && (<>
            <ReactCarousel
              setCarousel={handleSetCarousel}
              isDebug={true}
              isEnablePagination={true}
              isEnableMouseMove={isEnableMouseMove}
              isEnableNavButton
              isEnableLoop={true}
              data={data}
              slidesPerView={1}
              slidesPerGroup={1}
              breakpoints={{
                  768: {
                      slidesPerView: 2,
                      isEnableLoop: false,
                      isEnablePagination: false,
                      isEnableNavButton: false,
                  },
                  1200: {
                      slidesPerView: 1,
                      isEnableLoop: true,
                      isEnablePagination: true,
                      isEnableNavButton: true,
                  }
              }}
            />



            <label style={{marginTop: '20px', marginBottom: '20px', display: 'block'}}>
                <input type="checkbox"
                       checked={isEnableMouseMove}
                       onChange={() => setIsEnableMouseMove(prev => !prev)}
                />
                isEnableMouseMove: {String(isEnableMouseMove)}
            </label>

            {new Array(getPageTotal()).fill('').map((row, index) => {
                return <button key={`page_${index}`}
                               type="button"
                               style={{marginBottom: '20px',marginLeft: '5px'}}
                               onClick={() => handleGoPage(index + 1)}>
                    {index + 1}
                </button>
            })}
        </>)}

        <label style={{marginTop: '20px', marginBottom: '20px', display: 'block'}}>
            <input type="checkbox"
                   checked={isVisible}
                   onChange={() => setVisible(prev => !prev)}
            />
            isVisible: {String(isVisible)}
        </label>


    </div>

};

export default App;
