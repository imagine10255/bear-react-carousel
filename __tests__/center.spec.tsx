import * as React from 'react';
import '@testing-library/jest-dom';
import {cleanup, render, screen} from '@testing-library/react';

import BearCarousel from '../src/BearCarousel';
import BearSlideItem from '../src/BearSlideItem';
import {getActiveElement, setSlideItemsSizes, setContainerSize} from './utils';



describe('Center mode testing', () => {
    let container: HTMLElement,
        slideItems: HTMLElement[],
        pageButtons: HTMLElement[],
        navNextButton: HTMLElement,
        navPrevButton: HTMLElement;


    const createData = new Array(6).fill('test');
    const data = createData.map((row, index) => ({key: index, children: <BearSlideItem as="card"/>}))
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
        console.log('slideItems', slideItems[0].offsetWidth);
        // ASSERT
        expect(container.style.transform).toEqual('translate(133px, 0px)');
    });

});
