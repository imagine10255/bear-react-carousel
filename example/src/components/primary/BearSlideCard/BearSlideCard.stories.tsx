import type {Meta, StoryObj} from '@storybook/react';
import BearCarousel, {
    TBearSlideItemDataList,
    BearSlideCard
} from '@acrool/react-carousel';
import {generatorBearSlideCardData, generatorBearSlideImageData} from "../../data";


const meta = {
    title: 'Primary/BearSlideCard',
    component: BearSlideCard,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Slide item component use div css background-image'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        bgSize: '100%' // '100%'|'cover'|'contain'
    },
    render: function Render(args) {

        const bearSlideItemData1: TBearSlideItemDataList = generatorBearSlideCardData(args);

        return <BearCarousel
            data={bearSlideItemData1}
            height="300px"
        />;
    },
} satisfies Meta<typeof BearSlideCard>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {
    }
};
export const WithCover: Story = {
    args: {
        bgSize: 'cover'
    }
};
export const WithContain: Story = {
    args: {
        bgSize: 'contain'
    }
};
