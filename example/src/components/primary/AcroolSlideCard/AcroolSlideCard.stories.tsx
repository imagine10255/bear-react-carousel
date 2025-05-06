import AcroolCarousel, {
    AcroolSlideCard,
    TAcroolSlideItemDataList} from '@acrool/react-carousel';
import type {Meta, StoryObj} from '@storybook/react';

import {generatorAcroolSlideCardData, generatorAcroolSlideImageData} from '../../data';


const meta = {
    title: 'Primary/AcroolSlideCard',
    component: AcroolSlideCard,
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

        const acroolSlideItemData1: TAcroolSlideItemDataList = generatorAcroolSlideCardData(args);

        return <AcroolCarousel
            data={acroolSlideItemData1}
            height="300px"
        />;
    },
} satisfies Meta<typeof AcroolSlideCard>;

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
