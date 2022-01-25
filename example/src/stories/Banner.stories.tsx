import React from 'react';
import {ComponentStory, Meta} from '@storybook/react';

import HomeBanner from 'components/HomeBanner';

import 'imagine-react-carousel/dist/index.css';


const bgList = [
    {id: 1, image: './static/sample/01.jpg', name: 'A'},
    {id: 2, image: './static/sample/02.jpg', name: 'B'},
    {id: 3, image: './static/sample/03.jpg', name: 'C'},
    {id: 4, image: './static/sample/04.jpg', name: 'D'},
    {id: 5, image: './static/sample/05.jpg', name: 'E'},
    {id: 6, image: './static/sample/06.jpg', name: 'F'},
    {id: 7, image: './static/sample/07.jpg', name: 'G'},
    {id: 8, image: './static/sample/08.jpg', name: 'H'},
    {id: 9, image: './static/sample/09.jpg', name: 'I'},
];

const useBgData = bgList.map(row => {
    return {
        key: row.id,
        name: row.name,
        image: row.image,
    };
});

export default {
    title: 'Example',
    component: HomeBanner,
} as Meta<typeof HomeBanner>;


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HomeBanner> = (args) => <HomeBanner {...args}/>;

export const Banner = Template.bind({});
Banner.args = {
    data: useBgData,
};
