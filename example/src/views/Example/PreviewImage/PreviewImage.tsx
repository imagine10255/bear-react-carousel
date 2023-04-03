import React, { useState } from 'react';
import BearCarousel, {BearSlideItem, TBearSlideItemDataList} from 'bear-react-carousel';
import {preViewImage as images} from 'config/images';
import {ERowAlign, Flex} from 'bear-react-grid';
import CarouselModal from './CarouselModal';


// 輪播項目
const bearSlideItemData: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideItem as="card">
            <Flex horizontal={ERowAlign.center}
                vertical={ERowAlign.center}
                className="h-100"
                style={{fontSize: '40px'}}
            >
                {/*<a href="https://carousel.bearests.com" rel="noreferrer" target="_blank">{row.id}</a>*/}
            </Flex>
        </BearSlideItem>
    };
});





const PreviewImage = () => {
    const [visiblePage, setVisiblePage] = useState<number|undefined>(undefined);



    return <div className="d-flex flex-wrap">

        {typeof visiblePage !== 'undefined' && <CarouselModal onClose={() => setVisiblePage(undefined)} defaultPage={visiblePage}/>}

        {images.map((row, index) => {
            return <button type="button" onClick={() => setVisiblePage(index + 1)}>
                <img src={row.imageUrl} width={250} height="auto" className="mr-2 mb-2"/>
            </button>
        })}
    </div>


};

export default PreviewImage;
