import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Page from './Page';

test('test page render', async () => {
    const onSlideToPage = jest.fn();

    // ARRANGE
    render(<Page
        isActive
        onSlideToPage={onSlideToPage}
        page={1}
    />);

    // ACT
    const element = screen.getByTestId('bear-carousel-button');


    // ASSERT
    expect(onSlideToPage).toHaveBeenCalledTimes(1);
    expect(element).toBeInTheDocument();
});
