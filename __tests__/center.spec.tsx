import * as React from 'react';
import '@testing-library/jest-dom';
import {cleanup, render, screen} from '@testing-library/react';

import AcroolCarousel from '../src/AcroolCarousel';
import {getActiveElement, setSlideItemsSizes, setContainerSize} from './utils';
import AcroolSlideCard from "../src/AcroolSlideCard";



describe('Center mode testing', () => {
    let container: HTMLElement,
        slideItems: HTMLElement[],
        pageButtons: HTMLElement[],
        navNextButton: HTMLElement,
        navPrevButton: HTMLElement;


    const createData = Array.from({length: 6});
    const data = createData.map((row, index) => ({key: index, children: <AcroolSlideCard>item{index}</AcroolSlideCard>}));
    const onMount = () => {
        container = screen.getByTestId('acrool-carousel-container');
        slideItems = screen.getAllByTestId('acrool-carousel-slideItem');
        pageButtons = screen.getAllByTestId('acrool-carousel-page-button');
        navNextButton = screen.getByTestId('acrool-carousel-navNextButton');
        navPrevButton = screen.getByTestId('acrool-carousel-navPrevButton');

        setContainerSize(container, 400);
        setSlideItemsSizes(slideItems, Math.floor(400 / 3));
    };


    beforeEach(() => {
        render(<AcroolCarousel
            onMount={onMount}
            data={data}
            isEnableNavButton
            isEnablePagination
            isCenteredSlides
            slidesPerView={3}
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


    test('Navigates to third page using next button', async () => {
        // ASSERT
        expect(container.style.transform).toEqual('translate(133px, 0px)');
    });

});
