import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';

import BearCarousel from './BearCarousel';
import userEvent from '@testing-library/user-event';
import elClassName from './el-class-name';
import {TBearSlideItemDataList} from './types';
import BearSlideItem from './components/SlideItem';
import {baseImage as images} from '../example/src/config/images';


export const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
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



});
