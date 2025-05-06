import * as React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';

import AcroolCarousel from '../src/AcroolCarousel';
import {getActiveElement, setSlideItemsSizes, setContainerSize} from './utils';
import AcroolSlideCard from "../src/AcroolSlideCard";



describe('Loop mode testing', () => {
    let container: HTMLElement,
        slideItems: HTMLElement[],
        pageButtons: HTMLElement[],
        navNextButton: HTMLElement,
        navPrevButton: HTMLElement;

    const containerSize = 400;
    const createData = Array.from({length: 6});
    const data = createData.map((row, index) => ({key: index, children: <AcroolSlideCard>item{index}</AcroolSlideCard>}));
    const onMount = () => {
        container = screen.getByTestId('acrool-carousel-container');
        slideItems = screen.getAllByTestId('acrool-carousel-slideItem');
        pageButtons = screen.getAllByTestId('acrool-carousel-page-button');
        navNextButton = screen.getByTestId('acrool-carousel-navNextButton');
        navPrevButton = screen.getByTestId('acrool-carousel-navPrevButton');

        setContainerSize(container, containerSize);
        setSlideItemsSizes(slideItems, Math.floor(containerSize));
    };


    beforeEach(() => {
        render(<AcroolCarousel
            onMount={onMount}
            data={data}
            isEnableNavButton
            isEnablePagination
            isEnableLoop
        />);
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

    test('pageButtons is six and in the document', () => {
        expect(pageButtons).toHaveLength(6);
    });

    test('slideItems is 8 and in the document', () => {
        expect(slideItems).toHaveLength(8);
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
        expect(getActiveSlideItem()).toHaveAttribute('data-match','1');
        expect(getActivePageButton()).toHaveAttribute('data-page','1');

        // Act
        fireEvent.mouseDown(container, {clientX: 0});
        fireEvent.mouseUp(container);

        expect(getActiveSlideItem()).toHaveAttribute('data-page','1');
        expect(getActiveSlideItem().dataset['isClone']).toBeUndefined();
        expect(getActiveSlideItem().dataset['match']).toBeUndefined();
        expect(getActivePageButton()).toHaveAttribute('data-page','1');
    });

});
