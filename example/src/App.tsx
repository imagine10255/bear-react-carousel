import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import BearCarousel, {BearSlideItem, TBearSlideItemDataList} from 'bear-react-carousel';
import {baseImage as images} from './config/images';

import './App.css';
import './bootstrap-base.min.css';
import 'bear-react-carousel/dist/index.css';



// 輪播項目1
const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideItem as="card">
            <div className="h-100 d-flex"
                style={{fontSize: '40px', backgroundColor: row.color}}
            >
                {/*<a href="https://carousel.bearests.com" rel="noreferrer" target="_blank">{row.id}</a>*/}
            </div>
        </BearSlideItem>
    };
});

// 輪播項目2
const bearSlideItemData2: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideItem as="card">
            <div className="h-100 d-flex"
                style={{fontSize: '40px', width: '200px', height: '200px', backgroundColor: row.color}}
            >
                {/*<a href="https://carousel.bearests.com" rel="noreferrer" target="_blank">{row.id}</a>*/}
            </div>
        </BearSlideItem>
    };
});


function App() {

    return <div style={{padding: '10px', backgroundColor: '#00ff00'}}>
        <BearCarousel
            data={bearSlideItemData1}
            slidesPerView={1}
            staticHeight="200px"
            spaceBetween={20}
            isEnableNavButton
            isEnablePagination
            moveTime={400}
            // isEnableLoop
            isDebug
        />

        <BearCarousel
            data={bearSlideItemData1}
            slidesPerView={1.5}
            isCenteredSlides={true}
            staticHeight="200px"
            spaceBetween={20}
            isEnableNavButton
            isEnablePagination
            moveTime={400}
            isDebug
        />

        <BearCarousel
            data={bearSlideItemData2}
            slidesPerView="auto"
            isCenteredSlides={true}
            staticHeight="200px"
            spaceBetween={20}
            isEnableNavButton
            isEnablePagination
            moveTime={400}
            isDebug
        />
    </div>


    // return (
    //     <div className="App">
    //         <div>
    //             <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
    //                 <img src={viteLogo} className="logo" alt="Vite logo" />
    //             </a>
    //             <a href="https://reactjs.org" target="_blank" rel="noreferrer">
    //                 <img src={reactLogo} className="logo react" alt="React logo" />
    //             </a>
    //         </div>
    //         <h1>Vite + React</h1>
    //
    //         <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //         </p>
    //     </div>
    // );
}

export default App;
