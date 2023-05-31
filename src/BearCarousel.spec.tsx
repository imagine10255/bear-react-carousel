import * as React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {fireEvent, render, screen} from '@testing-library/react';

import BearCarousel from './BearCarousel';
import {TBearSlideItemDataList} from './types';
import BearSlideItem from './BearSlideItem';
import {baseImage as images} from '../example/src/config/images';



const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideItem as="card">
            <div className="h-100 d-flex"
                style={{fontSize: '40px', backgroundColor: row.color}}
            >
            </div>
        </BearSlideItem>
    };
});

describe('Index testing', () => {



    beforeEach(() => {


        render(<BearCarousel
            data={bearSlideItemData1}
            isEnableNavButton
            isEnablePagination
        />);

    });

    test('Should render content correctly', async () => {
        // ARRANGE
        const rootElement = screen.getByTestId('bear-carousel');

        // ASSERT
        expect(rootElement).toBeInTheDocument();
    });

    test('Should render content correctly', () => {
        const rootElement = screen.getByTestId('bear-carousel');
        expect(rootElement).toBeInTheDocument();
    });

    test('Should click next nav button', async () => {
        const navNextButton = screen.getByTestId('bear-carousel-navNextButton');
        expect(navNextButton).toBeInTheDocument();
        await userEvent.click(navNextButton);
        await userEvent.click(navNextButton);

        const slideItem = screen.getAllByTestId('bear-carousel-slideItem');
        let activeSlideItem = slideItem.find(el => el.dataset.active === 'true');
        const pageButtons = screen.getAllByTestId('bear-carousel-page-button');
        let activePageButton = pageButtons.find(el => el.dataset.active === 'true');

        expect(activeSlideItem).toHaveAttribute('data-page','3');
        expect(activePageButton).toHaveAttribute('data-page','3');
    });

    test('Should click prev nav button', async () => {
        const navPrevButton = screen.getByTestId('bear-carousel-navPrevButton');
        expect(navPrevButton).toBeInTheDocument();
        await userEvent.click(navPrevButton);

        const slideItem = screen.getAllByTestId('bear-carousel-slideItem');
        let activeSlideItem = slideItem.find(el => el.dataset.active === 'true');

        const pageButtons = screen.getAllByTestId('bear-carousel-page-button');
        let activePageButton = pageButtons.find(el => el.dataset.active === 'true');
        expect(activeSlideItem).toHaveAttribute('data-page','1');
        expect(activePageButton).toHaveAttribute('data-page','1');
    });


    test('Should click prev nav button from third page and go to second page', async () => {
        const navNextButton = screen.getByTestId('bear-carousel-navNextButton');
        const navPrevButton = screen.getByTestId('bear-carousel-navPrevButton');
        expect(navNextButton).toBeInTheDocument();
        expect(navPrevButton).toBeInTheDocument();

        // ACT - navigate to third page
        await userEvent.click(navNextButton);
        await userEvent.click(navNextButton);

        // ACT - navigate back to second page
        await userEvent.click(navPrevButton);

        // ASSERT
        const slideItem = screen.getAllByTestId('bear-carousel-slideItem');
        const activeSlideItem = slideItem.find(el => el.dataset.active === 'true');

        const pageButtons = screen.getAllByTestId('bear-carousel-page-button');
        let activePageButton = pageButtons.find(el => el.dataset.active === 'true');

        expect(activeSlideItem).toHaveAttribute('data-page','2');
        expect(activePageButton).toHaveAttribute('data-page','2');
    });



    test('Should click page', async () => {
        // ASSERT
        const slideItem = screen.getAllByTestId('bear-carousel-slideItem');

        const pageButtons = screen.getAllByTestId('bear-carousel-page-button');
        let activePageButton = pageButtons.find(el => el.dataset.page === '3');

        await userEvent.click(activePageButton);

        const activeSlideItem = slideItem.find(el => el.dataset.active === 'true');
        expect(activeSlideItem).toHaveAttribute('data-page','3');

        activePageButton = pageButtons.find(el => el.dataset.active === 'true');
        expect(activePageButton).toHaveAttribute('data-page','3');
    });


    test('Should desktop drag', async () => {
        // ASSERT
        const slideItems = screen.getAllByTestId('bear-carousel-slideItem');
        slideItems.forEach((el, index) => {
            Object.defineProperty(el, 'clientWidth', {configurable: true, value: 400});
            Object.defineProperty(el, 'offsetLeft', {configurable: true, value: 400 * index});
        });

        let container = screen.getByTestId('bear-carousel-container');

        Object.defineProperty(container, 'clientWidth', {configurable: true, value: 400});
        Object.defineProperty(container, 'offsetLeft', {configurable: true, value: 0});

        fireEvent.mouseDown(container, {clientX: 500});
        fireEvent.mouseMove(container, {clientX: 290});
        expect(container.style.transform).toEqual('translate(-210px, 0px)');

        fireEvent.mouseUp(container);
        expect(container.style.transform).toEqual('translate(-400px, 0px)');

        const activeSlideItem = slideItems.find(el => el.dataset.active === 'true');
        expect(activeSlideItem).toHaveAttribute('data-page','2');
    });

    test('Should mobile drag', async () => {
        // ASSERT
        const slideItems = screen.getAllByTestId('bear-carousel-slideItem');
        slideItems.forEach((el, index) => {
            Object.defineProperty(el, 'clientWidth', {configurable: true, value: 400});
            Object.defineProperty(el, 'offsetLeft', {configurable: true, value: 400 * index});
        });

        let container = screen.getByTestId('bear-carousel-container');

        Object.defineProperty(container, 'clientWidth', {configurable: true, value: 400});
        Object.defineProperty(container, 'offsetLeft', {configurable: true, value: 0});

        fireEvent.touchStart(container, {targetTouches: [{pageX: 500}]});
        fireEvent.touchMove(container, {targetTouches: [{pageX: 290}]});
        expect(container.style.transform).toEqual('translate(-210px, 0px)');

        fireEvent.touchEnd(container);
        expect(container.style.transform).toEqual('translate(-400px, 0px)');

        const activeSlideItem = slideItems.find(el => el.dataset.active === 'true');
        expect(activeSlideItem).toHaveAttribute('data-page','2');
    });

});
