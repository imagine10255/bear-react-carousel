import * as React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {act, cleanup, render, screen, waitFor} from '@testing-library/react';

import BearCarousel from '../src/BearCarousel';
import BearSlideItem from '../src/BearSlideItem';
import {getActiveElement, setSlideItemsSizes, setContainerSize} from './utils';



describe('Auto play testing', () => {
    let container: HTMLElement,
        slideItems: HTMLElement[],
        navNextButton: HTMLElement,
        navPrevButton: HTMLElement;

    const autoPlayTime = 500;

    beforeEach(() => {
        jest.useFakeTimers();

        const mockData = new Array(6).fill('test');
        render(<BearCarousel
            data={mockData.map((row, index) => {
                return {key: index, children: <BearSlideItem as="card"/>};
            })}
            isEnableNavButton
            isEnableAutoPlay
            autoPlayTime={autoPlayTime}
        />);

        container = screen.getByTestId('bear-carousel-container');
        slideItems = screen.getAllByTestId('bear-carousel-slideItem');
        navNextButton = screen.getByTestId('bear-carousel-navNextButton');
        navPrevButton = screen.getByTestId('bear-carousel-navPrevButton');

        setContainerSize(container, 400);
        setSlideItemsSizes(slideItems, 400);
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
        expect(getActiveSlideItem()).toHaveAttribute('data-page','2');

        act(() => jest.advanceTimersByTime(autoPlayTime));
        expect(getActiveSlideItem()).toHaveAttribute('data-page','3');

        act(() => jest.advanceTimersByTime(autoPlayTime));
        expect(getActiveSlideItem()).toHaveAttribute('data-page','4');

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
