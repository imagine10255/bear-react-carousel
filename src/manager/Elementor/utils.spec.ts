import {getMoveDistance, getStartPosition} from './utils';


test('get start onSlideChange={, async () => {
    expect(
        getStartPosition(false, {slidesPerView: 1, slidesPerViewActual: 1}, {containerWidth: 200, currItemWidth: 50})
    ).toEqual(0);

    expect(
        getStartPosition(true, {slidesPerView: 3, slidesPerViewActual: 2}, {containerWidth: 200, currItemWidth: 50})
    ).toEqual(25);

    expect(
        getStartPosition(true, {slidesPerView: 3, slidesPerViewActual: 3}, {containerWidth: 200, currItemWidth: 50})
    ).toEqual(50);
});



test('get move distance', async () => {
    expect(getMoveDistance(20, 21)).toEqual(1);
});
