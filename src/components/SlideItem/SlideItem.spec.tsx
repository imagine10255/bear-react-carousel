import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

import SlideItem from './SlideItem';

test('test Slide item render', async () => {
    // ARRANGE
    render(<SlideItem
        element={<div>test</div>}
        isActive={true}
        index={1}
        actualIndex={1}
        matchIndex={1}
        sourceIndex={1}
        inPage={1}
    />);

    // ACT
    const element = screen.getByTestId('bear-carousel-slideItem');

    // ASSERT
    expect(element).toBeInTheDocument();
});
