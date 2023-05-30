import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BearCarousel from '../src/BearCarousel';
import {bearSlideItemData1} from '../example/src/config/SlideItems';
import TestReact from '../src/TestReact';
import Page from '../src/components/Page';



test('loads and displays greeting', async () => {
    // ARRANGE
    render(<TestReact labelOff="on" />);

    // ACT
    const element = screen.getByTestId('custom-element');


    // await userEvent.click(screen.getByText('Load Greeting'));
    // await screen.findByRole('heading');

    // ASSERT
    expect(element).toBeInTheDocument();

    // expect(screen.getByRole('heading')).toHaveTextContent('hello there');
    // expect(screen.getByRole('button')).toBeDisabled();
});


//
// test('loads and displays greeting', async () => {
//     // ARRANGE
//     render(<BearCarousel data={bearSlideItemData1} />);
//
//     // ACT
//     const element = screen.getByTestId('react-bear-carousel');
//
//
//     // await userEvent.click(screen.getByText('Load Greeting'));
//     // await screen.findByRole('heading');
//
//     // ASSERT
//     expect(element).toBeInTheDocument();
//
//     // expect(screen.getByRole('heading')).toHaveTextContent('hello there');
//     // expect(screen.getByRole('button')).toBeDisabled();
// });


//
// describe('自動播放', () => {
//     test('get padding by ratio', () => {
//         expect(getSlideDirection(0, 0, 10, 10)).toEqual(EDirection.horizontal);
//     });
// });
//
// describe('Loop模式', () => {
//     test('get padding by ratio', () => {
//         expect(getSlideDirection(0, 0, 10, 10)).toEqual(EDirection.horizontal);
//     });
// });
//
// describe('響應式', () => {
//     test('get padding by ratio', () => {
//         expect(getSlideDirection(0, 0, 10, 10)).toEqual(EDirection.horizontal);
//     });
// });
//
//
// describe('Center Mode', () => {
//     test('get padding by ratio', () => {
//         expect(getSlideDirection(0, 0, 10, 10)).toEqual(EDirection.horizontal);
//     });
// });
//
// describe('同步控制', () => {
//     test('get padding by ratio', () => {
//         expect(getSlideDirection(0, 0, 10, 10)).toEqual(EDirection.horizontal);
//     });
// });
