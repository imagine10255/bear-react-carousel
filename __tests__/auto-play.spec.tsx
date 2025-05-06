import '@testing-library/jest-dom';

import {act, cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import AcroolCarousel from '../src/AcroolCarousel';
import AcroolSlideCard from '../src/AcroolSlideCard';
import {getActiveElement, setContainerSize,setSlideItemsSizes} from './utils';



describe('Auto play testing', () => {
    let container: HTMLElement,
        slideItems: HTMLElement[],
        navNextButton: HTMLElement,
        navPrevButton: HTMLElement;

    const autoPlayTime = 500;

    beforeEach(() => {
        jest.useFakeTimers();

        const containerSize = 400;
        const createData = Array.from({length: 6});
        const data = createData.map((row, index) => ({key: index, children: <AcroolSlideCard>item{index}</AcroolSlideCard>}));
        const onMount = () => {
            container = screen.getByTestId('acrool-carousel-container');
            slideItems = screen.getAllByTestId('acrool-carousel-slideItem');
            navNextButton = screen.getByTestId('acrool-carousel-navNextButton');
            navPrevButton = screen.getByTestId('acrool-carousel-navPrevButton');

            setContainerSize(container, containerSize);
            setSlideItemsSizes(slideItems, Math.floor(containerSize));
        };

        render(<AcroolCarousel
            onMount={onMount}
            data={data}
            isEnableNavButton
            isEnableAutoPlay
            autoPlayTime={autoPlayTime}
        />);

    });

    afterEach(() => {
        cleanup();
        jest.useRealTimers();
    });

    function getActiveSlideItem() {
        return getActiveElement(slideItems);
    }

    test('Auto navigates to next page after one second', async () => {
        // Act
        act(() => jest.advanceTimersByTime(autoPlayTime));
        expect(getActiveSlideItem()).toHaveAttribute('data-page','1');

        act(() => jest.advanceTimersByTime(autoPlayTime));
        expect(getActiveSlideItem()).toHaveAttribute('data-page','2');

        act(() => jest.advanceTimersByTime(autoPlayTime));
        expect(getActiveSlideItem()).toHaveAttribute('data-page','3');

    });


    test('Auto navigates to next page, but click slideTom pause after play', async () => {
        // Act - to page 2 then wait 10ms
        const user = userEvent.setup({delay: null});

        act(() => jest.advanceTimersByTime(autoPlayTime));
        expect(getActiveSlideItem()).toHaveAttribute('data-page','2');

        // Act - autoPlayer time before 10ms trigger
        act(() => jest.advanceTimersByTime(autoPlayTime / 2));

        await user.click(navPrevButton);
        expect(getActiveSlideItem()).toHaveAttribute('data-page','1');

        act(() => jest.advanceTimersByTime(autoPlayTime));
        expect(getActiveSlideItem()).toHaveAttribute('data-page','2');
    });

});
