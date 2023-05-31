import * as React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {act, cleanup, fireEvent, render, screen} from '@testing-library/react';

import BearCarousel from '../src/BearCarousel';
import BearSlideItem from '../src/BearSlideItem';
import {getActiveElement, setSlideItemsSizes, setContainerSize} from './utils';



describe('Center mode testing', () => {
    let container: HTMLElement,
        slideItems: HTMLElement[],
        pageButtons: HTMLElement[],
        navNextButton: HTMLElement,
        navPrevButton: HTMLElement;

    beforeEach(async () => {

        const mockData = new Array(6).fill('test');

        // Object.defineProperty(HTMLElement.prototype, 'clientWidth', {configurable: true, value: 400 / 3});


        render(<BearCarousel
            data={mockData.map((row, index) => {
                return {key: index, children: <BearSlideItem as="card"/>};
            })}
            isEnableNavButton
            isEnablePagination
            isCenteredSlides
            slidesPerView={3}
        />);

        container = screen.getByTestId('bear-carousel-container');
        slideItems = screen.getAllByTestId('bear-carousel-slideItem');
        pageButtons = screen.getAllByTestId('bear-carousel-page-button');
        navNextButton = screen.getByTestId('bear-carousel-navNextButton');
        navPrevButton = screen.getByTestId('bear-carousel-navPrevButton');

        setContainerSize(container, 400);
        setSlideItemsSizes(slideItems, Math.floor(400 / 3));

        // Act - mock reset size
        await userEvent.click(pageButtons[0]);
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


    test('Navigates to third page using next button', async () => {
        console.log('slideItems', slideItems[0].clientWidth);
        // ASSERT
        expect(container.style.transform).toEqual('translate(133px, 0px)');
    });

});
