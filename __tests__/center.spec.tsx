import * as React from 'react';
import '@testing-library/jest-dom';
import {cleanup, render, screen} from '@testing-library/react';

import BearCarousel from '../src/BearCarousel';
import {getActiveElement, setSlideItemsSizes, setContainerSize} from './utils';
import BearSlideCard from "../src/BearSlideCard";



describe('Center mode testing', () => {
    let container: HTMLElement,
        slideItems: HTMLElement[],
        pageButtons: HTMLElement[],
        navNextButton: HTMLElement,
        navPrevButton: HTMLElement;


    const createData = Array.from({length: 6});
    const data = createData.map((row, index) => ({key: index, children: <BearSlideCard>item{index}</BearSlideCard>}));
    const onMount = () => {
        container = screen.getByTestId('bear-carousel-container');
        slideItems = screen.getAllByTestId('bear-carousel-slideItem');
        pageButtons = screen.getAllByTestId('bear-carousel-page-button');
        navNextButton = screen.getByTestId('bear-carousel-navNextButton');
        navPrevButton = screen.getByTestId('bear-carousel-navPrevButton');

        setContainerSize(container, 400);
        setSlideItemsSizes(slideItems, Math.floor(400 / 3));
    };


    beforeEach(() => {
        render(<BearCarousel
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
        expect(container.style.transform).toEqual('translate(133.33333333333334px, 0px)');
    });

});
