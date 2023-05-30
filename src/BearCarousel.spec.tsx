
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import BearCarousel from './BearCarousel';

test('test WindowSize render', async () => {
    // ARRANGE
    render(<BearCarousel/>);

    // ACT
    const element = screen.getByTestId('bear-carousel');

    // ASSERT
    expect(element).toBeInTheDocument();
});
