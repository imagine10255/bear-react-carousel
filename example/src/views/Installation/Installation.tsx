import React from 'react';
import styled from 'styled-components/macro';
import Content, {Desc, SubTitle} from 'views/_components/Content';
import {useLocale} from 'library/intl';
import Code from 'components/atoms/Code';


/**
 * Installation
 */
const Installation = () => {
    const {i18n} = useLocale();

    return <Content
        title={i18n('page.Installation.title')}
        desc={i18n('page.Installation.desc')}
    >
        <Code language="bash">
            {`
            $ yarn add bear-carousel
        `}
        </Code>

        <Desc>{i18n('page.Installation.inYourIndex')}</Desc>
        <Code language="typescript">
            {`
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bear-carousel/dist/index.css'; // <~ add this

ReactDOM.render(<App />, document.getElementById('root'));
        `}
        </Code>


        <SubTitle>{i18n('page.Installation.fastUse')}</SubTitle>
        <Code language="typescript">
            {`
import BearCarousel, {TSlideItemDataList, SlideItem} from 'bear-carousel';

export const CustomBanner = () => {
    const images = [
        {id: 1, image: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
        {id: 2, image: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
        {id: 3, image: "https://dummyimage.com/900x400/dee2e6/6c757d.jpg"},
    ];
    
    const slideItemData: TSlideItemDataList = images.map(row => {
        return {
            key: row.id,
            children: <SlideItem imageUrl={row.image}/>
        };
    });

    return <BearCarousel 
        data={slideItemData} 
        aspectRatio={{widthRatio: 16, heightRatio: 9}}
    />
}

        `}
        </Code>

    </Content>;
};

export default Installation;




const Li = styled.li`
  color: #fff;
`;


const Ul = styled.ul`

`;
