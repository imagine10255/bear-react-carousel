import React from 'react';
import styled from 'styled-components/macro';
import Content, {Desc, SubTitle} from 'views/_components/Content';




/**
 * Props Try
 */
const About = () => {

    return <Content
        title="About"
        desc={`
    This is a carousel developed directly using React + Flexbox,<br/>
    Regarding Bear Carousel, it's a carousel that only contains the features you need,<br/> 
    not too many cool effects, because those may make you useless and add other potential problems <br/> (complex usage, exceptions, file too large)
    `
        }
    >
        <SubTitle>what i want to achieve</SubTitle>
        <Ul>
            <Li>Use React + Flexbox directly, not javascript in secondary development into React</Li>
            <Li>Simple to use</Li>
            <Li>Supports both Web, Mobile</Li>
            <Li>Responsive Control Setting</Li>
            <Li>Navigation button placement to move directly outside the picture area</Li>
            <Li>easier to customize</Li>
            <Li>Using Flexbox, don't write width in inline style</Li>
            <Li>Conditional limit re-rendering</Li>
            <Li>Make sure BearCarousel mounts, but the image data is showing problems due to slow loading of asynchronous data</Li>
        </Ul>
        <SubTitle>some advices</SubTitle>
        <Ul>
            <Li>自定義外容器高度 來讓 項目跟著高度100%, 因為當圖片是由非同步取得時, 你的畫面會從0px 突然把畫面撐開, 對使用者體驗不佳, 那如果這樣, 不如直接使用這個策略</Li>
            <Li>Customize the height of the outer container to make the item follow the height of 100%, because when the image is obtained asynchronously, your screen will suddenly stretch the screen from 0px, which is not good for the user experience. If so, it is better to use this directly Strategy</Li>
        </Ul>
        <SubTitle>Precautions</SubTitle>
        <Ul>
            <Li>當你使用 auto 模式時, 你必須自訂外容器並指定高度, 因為position absolute overflow-x:hidden 無法只限制 x 軸, 若不使用 absolute, 則項目會將外容器100%擠開</Li>
            <Li>When you use auto mode, you must customize the outer container and specify the height, because position absolute overflow-x:hidden cannot limit only the x-axis, if you do not use absolute, the item will squeeze the outer container 100% away</Li>
        </Ul>
    </Content>;
};

export default About;




const Li = styled.li`
  color: #fff;
`;


const Ul = styled.ul`

`;
