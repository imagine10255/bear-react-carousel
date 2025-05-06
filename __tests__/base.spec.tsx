import * as React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';

import AcroolCarousel from '../src/AcroolCarousel';
import AcroolSlideCard from '../src/AcroolSlideCard';
import {getActiveElement, setContainerSize, setSlideItemsSizes} from './utils';



describe('Base testing', () => {
    let container: HTMLElement,
        slideItems: HTMLElement[],
        pageButtons: HTMLElement[],
        navNextButton: HTMLElement,
        navPrevButton: HTMLElement;

    const containerSize = 400;
    const createData = Array.from({length: 6});
    const data = createData.map((row, index) => (<AcroolSlideCard>item{index}</AcroolSlideCard>));

    beforeEach(async () => {
        render(<AcroolCarousel
            data={data}
            isEnableNavButton
            isEnablePagination
        />);
        container = await screen.findByTestId('acrool-carousel-container');
        slideItems = await screen.findAllByTestId('acrool-carousel-slideItem');
        pageButtons = await screen.findAllByTestId('acrool-carousel-page-button');
        navNextButton = await screen.findByTestId('acrool-carousel-navNextButton');
        navPrevButton = await screen.findByTestId('acrool-carousel-navPrevButton');
        setContainerSize(container, containerSize);
        setSlideItemsSizes(slideItems, containerSize);
    });

    afterEach(() => {
        cleanup();
    });

    function getActiveSlideItem() {
        return getActiveElement(slideItems);
    }

    function getActivePageButton() {
        return getActiveElement(pageButtons);
    }

    test('Acrool Carousel is in the document', async () => {
        const rootElement = await screen.findByTestId('acrool-carousel');
        expect(rootElement).toBeInTheDocument();
    });

    test('navButton is in the document', async () => {
        expect(navNextButton).toBeInTheDocument();
        expect(navPrevButton).toBeInTheDocument();
    });

    test('pageButtons is six and in the document', async () => {
        expect(pageButtons).toHaveLength(6);
    });

    test('slideItems is six and in the document', async () => {
        expect(slideItems).toHaveLength(6);
        expect(slideItems[0].textContent).toEqual('item0');
        expect(slideItems[1].textContent).toEqual('item1');
    });

    test('Navigates to third page using next button', async () => {
        await userEvent.click(navNextButton);
        await userEvent.click(navNextButton);
        expect(getActiveSlideItem()).toHaveAttribute('data-page','3');
        expect(getActivePageButton()).toHaveAttribute('data-page','3');
    });

    test('Navigates back to first page using prev button', async () => {
        await userEvent.click(navPrevButton);
        expect(getActiveSlideItem()).toHaveAttribute('data-page','1');
        expect(getActivePageButton()).toHaveAttribute('data-page','1');
    });

    test('Navigates back to second page from third page using prev button', async () => {
        expect(navNextButton).toBeInTheDocument();
        expect(navPrevButton).toBeInTheDocument();
        await userEvent.click(navNextButton);
        await userEvent.click(navNextButton);
        await userEvent.click(navPrevButton);
        expect(getActiveSlideItem()).toHaveAttribute('data-page','2');
        expect(getActivePageButton()).toHaveAttribute('data-page','2');
    });

    test('Navigates to third page using pagination button', async () => {
        const targetPageButton = pageButtons.find(el => el.dataset.page === '3');
        await userEvent.click(targetPageButton!);
        expect(getActiveSlideItem()).toHaveAttribute('data-page','3');
        expect(getActivePageButton()).toHaveAttribute('data-page','3');
    });

});
