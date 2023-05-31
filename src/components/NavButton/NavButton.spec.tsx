import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {NavNextButton, NavPrevButton} from './NavButton';

test('test navPage render', async () => {
    const onNext = jest.fn();

    // ARRANGE
    const {getByTestId} = render(<NavNextButton onClick={onNext}/>);

    // ACT
    const element = getByTestId('bear-carousel-navNextButton');
    await userEvent.click(element);

    // ASSERT
    expect(element).toBeInTheDocument();
    expect(onNext).toHaveBeenCalledTimes(1);
});
