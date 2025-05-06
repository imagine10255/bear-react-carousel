import type {Meta, StoryObj} from '@storybook/react';
import BearCarousel, {
    TBearSlideItemDataList,
    BearSlideImage
} from '@acrool/react-carousel';
import {generatorBearSlideImageData} from "../../data";


const meta = {
    title: 'Primary/BearSlideImage',
    component: BearSlideImage,
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
        imageSize: 'none' //'none'|'cover'|'contain'|'scaleDown',
    },
    render: function Render(args) {

        const bearSlideItemData1: TBearSlideItemDataList = generatorBearSlideImageData(args);

        return <BearCarousel
            data={bearSlideItemData1}
        />;
    },
} satisfies Meta<typeof BearSlideImage>;

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
