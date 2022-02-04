import React from 'react';
import styled from 'styled-components/macro';
import Content, {Desc, SubTitle} from 'views/_components/Content';
import {useLocale} from '../../library/intl';




/**
 * Props Try
 */
const About = () => {

    const {i18n} = useLocale();

    return <Content
        title={i18n('page.about.title')}
        desc={i18n('page.about.desc')}
    >
        <SubTitle>{i18n('page.about.achieve.title')}</SubTitle>
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
            <Li>不需要管高度和定義項目樣式, 提供現成的項目元件, 只需要設定比例進去</Li>
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
            <Li>如果你想在輪播圖上面加上點擊連結, 建議使用額外的按鈕, 因為滑動功能會觸發開啟, 導致體驗會很糟糕。</Li>
            <Li>由外容器決定內容器大小, 可避免非同步載入時 的瞬間有高度而產生的畫面跳動</Li>
            <Li>img 標籤只有在自動寬度模式才使用, 因為是固定高度, 寬度auto</Li>
            <Li>懶加載模式時, 判斷 SlideItem 是否在畫面中(如果可以, 提前一個項目預載入) </Li>
            <Li>其他則使用 background 模式, 並且 可以在內容加上 文字 (or 文字動畫效果)</Li>
            <Li>沒有依內容高度 自動撐開內容的模式(ex: 文字公告), 因為 實際上並不實用, 還是會遇到需要解決的問題, 體驗也不佳, 請使用固定高度然後搭配卷軸 (記得要鎖住背景滾動)</Li>
        </Ul>
    </Content>;
};

export default About;




const Li = styled.li`
  color: #fff;
`;


const Ul = styled.ul`

`;
