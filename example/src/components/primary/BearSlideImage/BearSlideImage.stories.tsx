import { Flex } from '@acrool/react-grid';
import type {Meta, StoryObj} from '@storybook/react';
import BearCarousel, {
    BearSlideCard,
    TBearSlideItemDataList,
    ICarouselState,
    Controller,
    TOnSlideChange, BearSlideImage
} from 'bear-react-carousel';
import {baseImage, bearSlideItemData1} from "../../data";


const meta = {
    title: 'Primary/BearSlideImage',
    component: BearSlideImage,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Carousel item component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        imageAlt: 'cat',
        imageSize: 'none' //'none'|'cover'|'contain'|'scaleDown',
    },
    render: function Render(args) {

        const bearSlideItemData1: TBearSlideItemDataList = baseImage.map(row => {
            return <BearSlideImage
                {...args}
                key={row.id}
                imageUrl={row.imageUrl}
            />;
        });

        return <BearCarousel
            data={bearSlideItemData1}
        />;
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {
    }
};
export const WithCover: Story = {
    args: {
        imageSize: 'cover'
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
