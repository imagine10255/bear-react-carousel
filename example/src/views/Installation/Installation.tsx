import React from 'react';
import styled from 'styled-components/macro';
import Content, {Desc, SubTitle} from 'views/_components/Content';
import Code from 'components/atoms/Code';


/**
 * Props Try
 */
const Installation = () => {

    return <Content
        title="Installation"
        desc="There are few options on how to include/import BearCarousel into your project:"
    >
        <Code language="bash">
            {`
            $ npm install bear-carousel
        `}
        </Code>

        <Desc>in your index.ts (in initial)</Desc>
        <Code language="typescript">
            {`
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bear-carousel/dist/index.css';

ReactDOM.render(<App />, document.getElementById('root'));
        `}
        </Code>


        <SubTitle>How to use</SubTitle>
        <Code language="typescript">
            {`
import Carousel, {ICarouselData} from 'bear-carousel';

const bgList = [
    {id: 1, image: '/static/sample/01.jpg'},
    {id: 2, image: '/static/sample/02.jpg'},
    {id: 3, image: '/static/sample/03.jpg'},
];

export const CustomBanner = () => {
    
    const carouselData: ICarouselData[] = bgList.map(row => {
        return {
            key: row.id,
            children: <div
                style={{
                    backgroundImage: url(\`$\{row.image}\`),
                    backgroundSize: 'cover',
                    height: '200px',
                    width: '100%',
                }}
            />
        };
    });

    return <Carousel
        data={data}
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
