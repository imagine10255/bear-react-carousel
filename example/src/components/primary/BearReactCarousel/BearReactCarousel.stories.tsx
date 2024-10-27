import { Flex } from '@acrool/react-grid';
import type {Meta, StoryObj} from '@storybook/react';
import BearCarousel, {
    BearSlideCard,
    TBearSlideItemDataList,
    ICarouselState,
    Controller,
    TOnSlideChange, elClassName
} from 'bear-react-carousel';
import {baseImage, bearSlideItemData1} from "../../data";


const meta = {
    title: 'Primary/BearCarousel',
    component: BearCarousel,
    parameters: {
        layout: 'centered',
        actions: {argTypesRegex: '^on.*'},
        docs: {
            description: {
                component: 'Carousel main component'
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        data: bearSlideItemData1,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        movePercentage: .1,
        // height: {widthRatio: 21, heightRatio: 9},
        height: '300px',
        isEnableNavButton: false,
        isEnableLoop: false,
        initStartPlayTime: 0,
        autoPlayTime: 0,

        isEnableAutoPlay: false,
        isEnablePagination: false,
        isLazy: false,
        isCenteredSlides: false,
        isDebug: false,
    },
    render: function Render(args) {
        return <BearCarousel
            {...args}
        />;
    },
} satisfies Meta<typeof BearCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;




export const Primary: Story = {
    args: {}
};
export const WithDebug: Story = {
    args: {
        isDebug: true,
    }
};
export const WithSlidesPerView: Story = {
    args: {
        slidesPerView: 3,
    }
};
export const WithSlidesPerGroup: Story = {
    args: {
        isEnableNavButton: true,
        slidesPerView: 3,
        slidesPerGroup: 3,
    }
};

export const WithNav: Story = {
    args: {
        isEnableNavButton: true,
    }
};


export const WithCustomNav: Story = {
    args: {
        isEnableNavButton: true,
        renderNavButton: (toPrev, toNext) => {
            return <div className={elClassName.navGroup}>
                <button type="button" className={elClassName.navPrevButton} onClick={toPrev}>
                    {'く'}
                </button>
                <button type="button" className={elClassName.navNextButton} onClick={toNext}>
                    {'く'}
                </button>
            </div>;
        }}
};



export const WithLoop: Story = {
    args: {
        isEnableLoop: true,
    }
};

export const WithAutoPlay: Story = {
    args: {
        isEnableAutoPlay: true,
        initStartPlayTime: 500,
        autoPlayTime: 2000,
        isEnableLoop: true,
    }
};

export const WithPagination: Story = {
    args: {
        isEnablePagination: true,
    }
};

export const WithCustomPagination: Story = {
    args: {
        isEnablePagination: true,
        isEnablePageContent: true,
        renderPagination: (pageTotal: number) => {
            return baseImage.map(row => {
                return <>[{row.id}]</>;
            });
        }}
};

export const WithLazy: Story = {
    args: {
        isLazy: true,
    }
};


export const WithCenteredHalf: Story = {
    args: {
        isCenteredSlides: true,
        slidesPerView: 1.2,
        spaceBetween: 5,
        isEnableNavButton: true,
    }
};


export const WithBreakpoints: Story = {
    args: {
        breakpoints: {
            992: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                isEnablePagination: false,
                isEnableNavButton: true,
            }
        }
    }
};


