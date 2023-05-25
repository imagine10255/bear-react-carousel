import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import BearCarousel, {BearSlideItem, TBearSlideItemDataList} from 'bear-react-carousel';
import {baseImage as images} from './config/images';

import './App.css';
import './bootstrap-base.min.css';
import 'bear-react-carousel/dist/index.css';



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
    const [value, setValue] = useState(0);
    const [isEnable, setEnable] = useState<boolean>(false);





    // 輪播項目1
    const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
        const active = value === row.id;
        return {
            key: `${row.id}_${active}`,
            children: <div className="h-100 d-flex"
                onClick={() => setValue(row.id)} data-my={active}
                style={{fontSize: '40px', width: '100%', height: '100%', backgroundColor: row.color, border: active ?'5px solid red': 'none'}}
            >
                {/*<a href="https://carousel.bearests.com" rel="noreferrer" target="_blank">{row.id}</a>*/}
            </div>
        };
    });



    return <div>

        value: {value}

        <button type="button" onClick={() => setEnable(curr => !curr)}>
            set data
        </button>

        <BearCarousel
            data={isEnable ? bearSlideItemData1 : undefined}
            slidesPerView={3}
            // isCenteredSlides={true}
            staticHeight="300px"
            spaceBetween={20}
            isEnableNavButton
            isEnablePagination
            moveTime={400}
            isDebug
        />

        {/*<BearCarousel*/}
        {/*    data={bearSlideItemData2}*/}
        {/*    slidesPerView="auto"*/}
        {/*    isCenteredSlides={true}*/}
        {/*    staticHeight="300px"*/}
        {/*    spaceBetween={20}*/}
        {/*    isEnableNavButton*/}
        {/*    isEnablePagination*/}
        {/*    moveTime={400}*/}
        {/*    isDebug*/}
        {/*/>*/}
    </div>;


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
