import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import ReactCarousel from '@imagine10255/react-carousel';
import styled from 'styled-components/macro';
import '@imagine10255/react-carousel/dist/index.css';


const CarouselItem = styled.div<any>`
    //height: 500px;
    height: 200px;
    width: 100%;
    background: #282c34 url("${props => props.image}") no-repeat center center;
    background-size: cover;
    display: flex;
`;
const CarouselImage = styled.img<any>`
    //height: 500px;
    height: 200px;
    width: auto; 
    display: flex;
`;

const bgList = [
    {id: 1, image: './static/sample/01.jpg'},
    {id: 2, image: './static/sample/02.jpg'},
    {id: 3, image: './static/sample/03.jpg'},
    {id: 4, image: './static/sample/04.jpg'},
    {id: 5, image: './static/sample/05.jpg'},
    {id: 6, image: './static/sample/06.jpg'},
    {id: 7, image: './static/sample/07.jpg'},
    {id: 8, image: './static/sample/08.jpg'},
    {id: 9, image: './static/sample/09.jpg'},
    // {id: 10, image: '/static/sample/10.jpg'},
];

const imageList = [
    {id: 1, image: './static/sample/01.jpg'},
    {id: 2, image: './static/sample/auto-01.jpg'},
    {id: 4, image: './static/sample/04.jpg'},
    {id: 3, image: './static/sample/auto-02.jpg'},
    {id: 5, image: './static/sample/05.jpg'},
    {id: 6, image: './static/sample/06.jpg'},
    {id: 7, image: './static/sample/07.jpg'},
    {id: 8, image: './static/sample/08.jpg'},
    {id: 9, image: './static/sample/09.jpg'},
];


const useBgData = bgList.map(row => {
    return {
        key: String(row.id),
        children: <CarouselItem image={row.image}/>
    };
});
const useImageData = imageList.map(row => {
    return {
        key: String(row.id),
        children: <CarouselImage src={row.image}/>
    };
});

export default {
    title: 'Base',
    component: ReactCarousel,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: {control: 'color'},
    },
} as ComponentMeta<typeof ReactCarousel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ReactCarousel> = (args) => <ReactCarousel {...args}/>;

export const Default = Template.bind({});
Default.args = {
    isDebug: true,
    isEnableMouseMove: true,
    data: useBgData,
};

export const Navigation = Template.bind({});
Navigation.args = {
    isDebug: true,
    isEnableNavButton: true,
    data: useBgData,
};

export const Pagination = Template.bind({});
Pagination.args = {
    isDebug: true,
    isEnablePagination: true,
    data: useBgData,
};

export const SlidesPerView = Template.bind({});
SlidesPerView.args = {
    isDebug: true,
    slidesPerView: 3,
    isEnablePagination: true,
    data: useBgData,
};

export const SlidesPerViewAuto = Template.bind({});
SlidesPerViewAuto.args = {
    isDebug: true,
    slidesPerView: 'auto',
    isEnablePagination: true,
    data: useImageData,
};


export const SpaceBetween = Template.bind({});
SpaceBetween.args = {
    isDebug: true,
    slidesPerView: 3,
    spaceBetween: 10,
    data: useBgData,
};


export const InfiniteLoop = Template.bind({});
InfiniteLoop.args = {
    isDebug: true,
    isEnableMouseMove: true,
    isEnablePagination: true,
    isEnableLoop: true,
    data: useBgData,
};

export const InfiniteLoopWithSlidesPerView = Template.bind({});
InfiniteLoopWithSlidesPerView.args = {
    isDebug: true,
    slidesPerView: 3,
    spaceBetween: 10,
    isEnableMouseMove: true,
    isEnablePagination: true,
    isEnableLoop: true,
    data: useBgData.slice(0, 7),
};

export const InfiniteLoopWithSlidesPerGroup = Template.bind({});
InfiniteLoopWithSlidesPerGroup.args = {
    isDebug: true,
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 10,
    isEnableMouseMove: true,
    isEnablePagination: true,
    isEnableLoop: true,
    data: useBgData,
};

export const InfiniteLoopWithSlidesPerGroupNotDivisible = Template.bind({});
InfiniteLoopWithSlidesPerGroupNotDivisible.args = {
    isDebug: true,
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 10,
    isEnableMouseMove: true,
    isEnablePagination: true,
    isEnableLoop: true,
    data: useBgData.slice(0, 7),
};



export const Centered = Template.bind({});
Centered.args = {
    isDebug: true,
    slidesPerView: 4,
    spaceBetween: 10,
    isEnableMouseMove: true,
    isEnablePagination: true,
    isCenteredSlides: true,
    data: useBgData,
};


export const AutoPlay = Template.bind({});
AutoPlay.args = {
    isDebug: true,
    isEnablePagination: true,
    isEnableLoop: true,
    isEnableMouseMove: true,
    autoPlayTime: 3000,
    data: useBgData,
};
export const Breakpoints = Template.bind({});
Breakpoints.args = {
    isDebug: true,
    isEnablePagination: true,
    isEnableMouseMove: true,
    isEnableLoop: true,
    data: useBgData,
    slidesPerView: 1,
    breakpoints: {
        768: {
            slidesPerView: 2,
            isEnableLoop: false,
            isEnablePagination: false,
            isEnableNavButton: false,
            isEnableMouseMove: false,
        },
        1200: {
            slidesPerView: 4,
            isEnableLoop: true,
            isEnablePagination: true,
            isEnableNavButton: true,
            isEnableMouseMove: true,
        }
    }
};




