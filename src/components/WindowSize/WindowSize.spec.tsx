import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import WindowSize from './WindowSize';

test('test WindowSize render', async () => {
    // ARRANGE
    render(<WindowSize size={992}/>);

    // ACT
    const element = screen.getByTestId('bear-carousel-windowSize');

    // ASSERT
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('992');
});
