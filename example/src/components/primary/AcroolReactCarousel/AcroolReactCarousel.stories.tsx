import AcroolCarousel, {
    AcroolSlideCard,
} from '@acrool/react-carousel';
import type {Meta, StoryObj} from '@storybook/react';

import {baseImage, generatorAcroolSlideCardData, generatorAcroolSlideImageData} from '../../data';


const meta = {
    title: 'Primary/AcroolCarousel',
    component: AcroolCarousel,
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
        isDebug: false,
        data: generatorAcroolSlideCardData(),
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
    },
    render: function Render(args) {
        return <AcroolCarousel
            {...args}
        />;
    },
} satisfies Meta<typeof AcroolCarousel>;

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
export const WithStaticHeight: Story = {
    args: {
        slidesPerView: 1,
        height: '240px',
    }
};
export const WithAutoHeight: Story = {
    args: {
        slidesPerView: 1,
        height: 'auto',
        data: baseImage.map((row, idx) => {
            return <AcroolSlideCard key={row.id}>
                {Array.from({length: idx+1}).map((rRow, rIdx) => {
                    return <div key={rIdx}>{rIdx}</div>;
                })}
            </AcroolSlideCard>;
        }),
    },
    render: function Render(args) {
        return <div>
            <AcroolCarousel
                {...args}
            />
            <div>Test</div>
        </div>;
    },
};
export const WithStaticHeightByNumber: Story = {
    args: {
        slidesPerView: 1,
        height: 240,
    }
};
export const WithAspectRatio: Story = {
    args: {
        slidesPerView: 1,
        height: {
            widthRatio: 2,
            heightRatio: 1,
        }
    }
};
export const WithSlidesPerView: Story = {
    args: {
        slidesPerView: 3,
        isEnableNavButton: true,
    }
};

export const WithSlidesPerViewAuto: Story = {
    args: {
        slidesPerView: 'auto',
        data: baseImage.map(row => {
            return <AcroolSlideCard key={row.id} bgUrl={row.imageUrl} style={{width: '200px', height: '400px'}}/>;
        }),
    }
};



export const WithHalf: Story = {
    args: {
        slidesPerView: 3.2,
        spaceBetween: 5,
        isEnableNavButton: true,
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

export const WithSlidesPerGroup: Story = {
    args: {
        isEnableNavButton: true,
        slidesPerView: 3,
        slidesPerGroup: 3,
    }
};

export const WithSlidesPerGroupHalf: Story = {
    args: {
        isEnableNavButton: true,
        slidesPerView: 3.2,
        slidesPerGroup: 3.2,
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
            return <div className="acrool-react-carousel__nav-group">
                <button type="button" className="acrool-react-carousel__nav-prev-button" onClick={toPrev}>
                    {'く'}
                </button>
                <button type="button" className="acrool-react-carousel__nav-next-button" onClick={toNext}>
                    {'く'}
                </button>
            </div>;
        }}
};



export const WithLoop: Story = {
    args: {
        isEnableLoop: true,
        isEnableNavButton: true,
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


export const WithLazyBySlideCard: Story = {
    args: {
        isLazy: true,
    }
};

export const WithLazyBySlideImage: Story = {
    args: {
        isLazy: true,
        height: 'auto',
        data: generatorAcroolSlideImageData(),
    }
};
