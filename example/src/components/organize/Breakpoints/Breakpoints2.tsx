import {useRef, useState, useCallback} from 'react';
import BearCarousel, {
    BearSlideCard,
    TBearSlideItemDataList,
    elClassName,
    IInfo,
    ICarouselState
} from 'bear-react-carousel';

import {Controller} from 'bear-react-carousel';
import gridTheme from '@/config/gridTheme';
import styled from 'styled-components';






function Breakpoints2() {
    const [carouselState, setCarouselState] = useState<ICarouselState>();
    const [enable, setEnable] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const controllerRef = useRef<Controller>(null);


    const slideData = useCallback(() => {
        const dataList = [
            {id: '01', imageUrl: '/sample/responsive/01.webp', desc: 'Blueberry'},
            {id: '02', imageUrl: '/sample/responsive/02.webp', desc: 'berry'},
            {id: '03', imageUrl: '/sample/responsive/03.webp', desc: 'aam'},
            // {id: '04', imageUrl: '/sample/responsive/01.webp', desc: 'aam'},
            // {id: '05', imageUrl: '/sample/responsive/02.webp', desc: 'aam'},
            // {id: '06', imageUrl: '/sample/responsive/03.webp', desc: 'aam'},
        ];

        const bearSlideItemData: TBearSlideItemDataList = dataList.map(row => {
            return {
                key: row.id,
                children: <BearSlideCard>
                    <Photo src={row.imageUrl} alt={row.desc}/>
                </BearSlideCard>
            };
        });
        return bearSlideItemData;
    }, []);

    return <div>
        {/*測試依照比例設定容器高度*/}
        {/*<BearCarousel*/}
        {/*    // className="d-lg-none"*/}
        {/*    data={slideData()}*/}
        {/*    height="auto"*/}
        {/*    slidesPerView={1}*/}
        {/*    slidesPerGroup={1}*/}

        {/*    isEnableNavButton*/}
        {/*    isEnablePagination*/}
        {/*    isEnableLoop*/}
        {/*    breakpoints={{*/}
        {/*        [gridTheme.gridBreakpoints.md]: {*/}
        {/*            slidesPerView: 3,*/}
        {/*            slidesPerGroup: 3,*/}
        {/*            isEnablePagination: false*/}
        {/*        }*/}
        {/*    }}*/}
        {/*/>*/}


        {enable && (
            <BearCarousel
                data={slideData()}
                height="200px"
                slidesPerView={1}
                slidesPerGroup={1}

                isEnableNavButton={false}
                isEnablePagination
                isEnableLoop
                breakpoints={{
                    [gridTheme.gridBreakpoints.md]: {
                        slidesPerView: 3,
                        slidesPerGroup: 1,
                        isEnablePagination: false,
                        isEnableNavButton: true,
                    }
                }}

                isDebug
            />)}



        {/*<button type="button" onClick={() => setCount(curr => curr += 1)}> count: {count}</button>*/}
        {/*<button type="button" onClick={() => setEnable(curr => !curr)}> enable: {String(enable)}</button>*/}

        {/*<br/>*/}
        {/*<pre>*/}
        {/*    {JSON.stringify(carouselState, null, '\t')}*/}
        {/*</pre>*/}
    </div>;

}

export default Breakpoints2;




const Photo = styled.img`
  border-radius: 0.5rem;
  object-fit: cover;
  height: 150px;
  width: 100%;
`;

