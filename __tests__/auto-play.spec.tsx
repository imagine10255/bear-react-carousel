import * as React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react';

import BearCarousel from '../src/BearCarousel';
import BearSlideItem from '../src/BearSlideItem';



describe('Base testing', () => {
    let container: HTMLElement,
        slideItems: HTMLElement[],
        navNextButton: HTMLElement,
        navPrevButton: HTMLElement;

    beforeEach(() => {
        const mockData = new Array(6).fill('test');
        render(<BearCarousel
            data={mockData.map((row, index) => {
                return {key: index, children: <BearSlideItem as="card"/>};
            })}
            isEnableAutoPlay
            isEnableNavButton
            autoPlayTime={1000}
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
    });

    function setSlideItemsSizes(elements: HTMLElement[], size: number) {
        elements.forEach((el, index) => {
            Object.defineProperty(el, 'clientWidth', {configurable: true, value: size});
            Object.defineProperty(el, 'offsetLeft', {configurable: true, value: size * index});
        });
    }

    function setContainerSize(element: HTMLElement, size: number) {
        Object.defineProperty(element, 'clientWidth', {configurable: true, value: size});
        Object.defineProperty(element, 'offsetLeft', {configurable: true, value: 0});
    }

    function getActiveSlideItem() {
        return slideItems.find(el => el.dataset.active === 'true');
    }

    test('Auto navigates to next page after one second', async () => {
        await waitFor(() => {
            expect(getActiveSlideItem()).toHaveAttribute('data-page','2');
        }, {timeout: 1000});

        await waitFor(() => {
            expect(getActiveSlideItem()).toHaveAttribute('data-page','3');
        }, {timeout: 1000});
    });


    test('Auto navigates to next page, but click slideTom pause after play', async () => {
        await waitFor(() => userEvent.click(navNextButton), {timeout: 600});
        await waitFor(() => {}, {timeout: 10});

        await waitFor(() => {
            expect(getActiveSlideItem()).toHaveAttribute('data-page','3');
        }, {timeout: 1000});
    });

});
