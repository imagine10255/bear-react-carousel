import AcroolCarousel, {AcroolSlideImage, TAcroolSlideItemDataList} from '@acrool/react-carousel';
import type {Meta, StoryObj} from '@storybook/react';

import {generatorAcroolSlideImageData} from '../../data';


const meta = {
    title: 'Primary/AcroolSlideImage',
    component: AcroolSlideImage,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Slide item component use img html tag'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        imageAlt: 'cat',
        imageSize: 'none', //'none'|'cover'|'contain'|'scaleDown',
        imageUrl: '/images/sample/1.jpg',
    },
    render: function Render(args) {

        const acroolSlideItemData1: TAcroolSlideItemDataList = generatorAcroolSlideImageData(args);

        return <AcroolCarousel
            data={acroolSlideItemData1}
        />;
    },
} satisfies Meta<typeof AcroolSlideImage>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {
    }
};
export const WithCover: Story = {
    args: {
        imageSize: 'cover',
    }
};
export const WithContain: Story = {
    args: {
        imageSize: 'contain'
    }
};
export const WithScaleDown: Story = {
    args: {
        imageSize: 'scaleDown'
    }
};
