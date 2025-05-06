import {render} from '@testing-library/react';

import {EDirection} from './types';
import {getSlideAngle,getSlideDirection, getTranslateParams} from './utils';

test('get padding by ratio', async () => {
    expect(getSlideDirection(0, 0, 10, 10)).toEqual(EDirection.horizontal);
    expect(getSlideDirection(0, 0, -10, -10)).toEqual(EDirection.horizontal);
    expect(getSlideDirection(0, 0, 0, 150)).toEqual(EDirection.vertical);
    expect(getSlideDirection(0, 0, 0, -150)).toEqual(EDirection.vertical);
});


test('get slide angle', async () => {
    const slideAngle0 = getSlideAngle(0, 0);
    expect(slideAngle0).toEqual(0);

    const slideAngle45 = getSlideAngle(10, 10);
    expect(slideAngle45).toEqual(45);

    const slideAngle90 = getSlideAngle(0, 45);
    expect(slideAngle90).toEqual(90);
});




test('get translate params', async () => {
    const {container} = render(
        <div style={{transform: 'matrix(1, 0, 0, 1, 20, 30)'}} />,
    );
    const params = getTranslateParams(container.firstChild as HTMLDivElement);
    expect(params).toEqual({x: 20, y: 30, z: 0});
});

