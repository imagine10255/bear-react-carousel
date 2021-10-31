import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ImReactCarousel from 'imreact-carousel'
import styled from 'styled-components/macro'
import 'imreact-carousel/dist/index.css'


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
  {id: 1, image: '/images/01.jpeg'},
  {id: 2, image: '/images/02.jpeg'},
  {id: 3, image: '/images/03.jpeg'},
  {id: 4, image: '/images/04.jpeg'},
  {id: 5, image: '/images/05.jpeg'},
  {id: 6, image: '/images/06.jpeg'},
  {id: 7, image: '/images/07.jpeg'},
  {id: 8, image: '/images/08.jpeg'},
  {id: 9, image: '/images/09.jpeg'},
  // {id: 10, image: '/images/10.jpeg'},
];

const imageList = [
  {id: 1, image: '/images/01.jpeg'},
  {id: 2, image: '/images/auto-01.jpeg'},
  {id: 4, image: '/images/04.jpeg'},
  {id: 3, image: '/images/auto-02.jpeg'},
  {id: 5, image: '/images/05.jpeg'},
  {id: 6, image: '/images/06.jpeg'},
  {id: 7, image: '/images/07.jpeg'},
  {id: 8, image: '/images/08.jpeg'},
  {id: 9, image: '/images/09.jpeg'},
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
  title: 'ImReactCarousel/Base',
  component: ImReactCarousel,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ImCarousel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ImCarousel> = (args) => <ImReactCarousel {...args}/>;

export const Default = Template.bind({});
Default.args = {
  isDebug: true,
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
  isEnablePagination: true,
  isEnableLoop: true,
  data: useBgData,
};

export const InfiniteLoopWithSlidesPerView = Template.bind({});
InfiniteLoopWithSlidesPerView.args = {
  isDebug: true,
  slidesPerView: 3,
  spaceBetween: 10,
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
  isEnablePagination: true,
  isEnableLoop: true,
  data: useBgData.slice(0, 7),
};



export const Centered = Template.bind({});
Centered.args = {
  isDebug: true,
  slidesPerView: 4,
  spaceBetween: 10,
  isEnablePagination: true,
  isCenteredSlides: true,
  data: useBgData,
};


export const AutoPlay = Template.bind({});
AutoPlay.args = {
  isDebug: true,
  isEnablePagination: true,
  isEnableLoop: true,
  autoPlayTime: 3000,
  data: useBgData,
};




