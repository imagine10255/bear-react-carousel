import '@testing-library/jest-dom';

import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import AcroolCarousel from '../src/AcroolCarousel';
import AcroolSlideCard from '../src/AcroolSlideCard';
import {getActiveElement, setContainerSize,setSlideItemsSizes} from './utils';



describe('Loop mode testing', () => {
    let container: HTMLElement;
    let slideItems: HTMLElement[];
    let pageButtons: HTMLElement[];
    let navNextButton: HTMLElement;
    let navPrevButton: HTMLElement;

    const containerSize = 400;
    const createData = Array.from({length: 6});
    const data = createData.map((row, index) => (<AcroolSlideCard key={index}>item{index}</AcroolSlideCard>));

    beforeEach(async () => {
        render(<AcroolCarousel
            data={data}
            isEnableNavButton
            isEnablePagination
            isEnableLoop
        />);
        container = await screen.findByTestId('acrool-carousel-container');
        slideItems = await screen.findAllByTestId('acrool-carousel-slideItem');
        pageButtons = await screen.findAllByTestId('acrool-carousel-page-button');
        navNextButton = await screen.findByTestId('acrool-carousel-navNextButton');
        navPrevButton = await screen.findByTestId('acrool-carousel-navPrevButton');

        setContainerSize(container, containerSize);
        setSlideItemsSizes(slideItems, Math.floor(containerSize));
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

    test('pageButtons is six and in the document', async () => {
        expect(pageButtons ?? []).toHaveLength(6);
    });

    test('slideItems is 8 and in the document', async () => {
        expect(slideItems ?? []).toHaveLength(10);
    });

    test('Navigates to third page using next button', async () => {
        const lastPage = pageButtons[pageButtons.length - 1];

        // ACT
        await userEvent.click(lastPage);
        expect(getActiveSlideItem()).toHaveAttribute('data-page','6');

        await userEvent.click(navNextButton);

        // ASSERT
        expect(getActiveSlideItem()).toHaveAttribute('data-page','1');
        expect(getActiveSlideItem()).toHaveAttribute('data-is-clone','');
        expect(getActiveSlideItem()).toHaveAttribute('data-match','2');
        expect(getActivePageButton()).toHaveAttribute('data-page','1');

        // Act
        fireEvent.mouseDown(container, {clientX: 0});
        fireEvent.mouseUp(container);

        expect(getActiveSlideItem()).toHaveAttribute('data-page','1');
        expect(getActiveSlideItem()?.dataset['isClone']).toBe('');
        expect(getActiveSlideItem()?.dataset['match']).toBe('2');
        expect(getActivePageButton()).toHaveAttribute('data-page','1');
    });

});
