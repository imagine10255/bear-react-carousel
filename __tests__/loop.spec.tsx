import * as React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';

import BearCarousel from '../src/BearCarousel';
import BearSlideItem from '../src/BearSlideItem';
import {getActiveElement, setSlideItemsSizes, setContainerSize} from './utils';



describe('Loop mode testing', () => {
    let container: HTMLElement,
        slideItems: HTMLElement[],
        pageButtons: HTMLElement[],
        navNextButton: HTMLElement,
        navPrevButton: HTMLElement;

    beforeEach(() => {
        const mockData = new Array(6).fill('test');
        render(<BearCarousel
            data={mockData.map((row, index) => {
                return {key: index, children: <BearSlideItem as="card"/>};
            })}
            isEnableNavButton
            isEnablePagination
            isEnableLoop
        />);

        container = screen.getByTestId('bear-carousel-container');
        slideItems = screen.getAllByTestId('bear-carousel-slideItem');
        pageButtons = screen.getAllByTestId('bear-carousel-page-button');
        navNextButton = screen.getByTestId('bear-carousel-navNextButton');
        navPrevButton = screen.getByTestId('bear-carousel-navPrevButton');

        setContainerSize(container, 400);
        setSlideItemsSizes(slideItems, 400);
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
        await userEvent.click(navNextButton);

        // ASSERT
        expect(getActiveSlideItem()).toHaveAttribute('data-page','1');
        expect(getActiveSlideItem()).toHaveAttribute('data-is-clone','true');
        expect(getActiveSlideItem()).toHaveAttribute('data-match','1');
        expect(getActivePageButton()).toHaveAttribute('data-page','1');

        // Act
        fireEvent.mouseDown(container, {clientX: 0});
        fireEvent.mouseUp(container);

        expect(getActiveSlideItem()).toHaveAttribute('data-page','1');
        expect(getActiveSlideItem().dataset['is-clone']).toBeUndefined()
        expect(getActiveSlideItem().dataset['match']).toBeUndefined()
        expect(getActivePageButton()).toHaveAttribute('data-page','1');
    });

});
