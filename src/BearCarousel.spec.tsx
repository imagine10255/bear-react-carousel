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
        />);
    });


    test('Should render content correctly', async () => {
        // ARRANGE
        const rootElement = screen.getByTestId('bear-carousel');

        // ASSERT
        expect(rootElement).toBeInTheDocument();
    });

    test('Should click next nav button to next page', async () => {
        // ARRANGE
        const navNextButton = screen.getByTestId('bear-carousel-navNextButton');
        expect(navNextButton).toBeInTheDocument();

        // ACT
        await userEvent.click(navNextButton);

        // ASSERT
        const slideItem = screen.getAllByTestId('bear-carousel-slideItem');
        const activeSlideItem = slideItem.find(el => el.dataset.active === 'true');
        expect(activeSlideItem).toHaveAttribute('data-page','2');

    });
});
