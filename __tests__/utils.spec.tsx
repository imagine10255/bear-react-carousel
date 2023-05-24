import {
    getByLabelText,
    getByText,
    getByTestId,
    queryByTestId,
    // Tip: all queries are also exposed on an object
    // called "queries" which you could import here as well
    waitFor,
} from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import {
    decimal2Rounding,
    getPaddingBySize,
    getMatrixValue,
    getSlideAngle,
    getTranslateParams,
    getSlideDirection,
    getSizeByRange,
    getSlideIndex,
    getStartPosition,
    checkActualIndexInRange,
    getLastIndex,
    getNextPage,
    getNextPageFirstIndex,
    getMoveDistance,
    getLoopResetIndex
} from '../src/utils';
import {EDirection} from '../src/types';

// function getExampleDOM() {
//     // This is just a raw example of setting up some DOM
//     // that we can interact with. Swap this with your UI
//     // framework of choice 😉
//     const div = document.createElement('div');
//     div.innerHTML = `
//     <label for="username">Username</label>
//     <input id="username" />
//     <button>Print Username</button>
//   `;
//     const button = div.querySelector('button');
//     const input = div.querySelector('input');
//     button.addEventListener('click', () => {
//         // let's pretend this is making a server request, so it's async
//         // (you'd want to mock this imaginary request in your unit tests)...
//         setTimeout(() => {
//             const printedUsernameContainer = document.createElement('div');
//             printedUsernameContainer.innerHTML = `
//         <div data-testid="printed-username">${input.value}</div>
//       `;
//             div.appendChild(printedUsernameContainer);
//         }, Math.floor(Math.random() * 200));
//     });
//     return div;
// }
//
// test('examples of some things', async () => {
//     const famousProgrammerInHistory = 'Ada Lovelace';
//     const container = getExampleDOM();
//
//     // Get form elements by their label text.
//     // An error will be thrown if one cannot be found (accessibility FTW!)
//     const input = getByLabelText(container, 'Username');
//     // input.value = famousProgrammerInHistory;
//
//     // Get elements by their text, just like a real user does.
//     getByText(container, 'Print Username').click();
//
//     await waitFor(() =>
//         expect(queryByTestId(container, 'printed-username')).toBeTruthy(),
//     );
//
//     // getByTestId and queryByTestId are an escape hatch to get elements
//     // by a test id (could also attempt to get this element by its text)
//     // expect(getByTestId(container, 'printed-username')).toHaveTextContent(
//     //     famousProgrammerInHistory,
//     // );
//     // jest snapshots work great with regular DOM nodes!
//     expect(container).toMatchSnapshot();
// });

test('get matrix value', async () => {
    const params = getMatrixValue('matrix(1, 0, 0, 1, 20, 30)');
    expect(params).toEqual([1, 0, 0, 1, 20, 30]);
});



test('get translate params', async () => {
    const {container} = render(
        <div style={{transform: 'matrix(1, 0, 0, 1, 20, 30)'}} />,
    );
    const params = getTranslateParams(container.firstChild as HTMLDivElement);
    expect(params).toEqual({x: 20, y: 30, z: 0});
});



test('get slide angle', async () => {
    const slideAngle0 = getSlideAngle(0, 0);
    expect(slideAngle0).toEqual(0);

    const slideAngle45 = getSlideAngle(10, 10);
    expect(slideAngle45).toEqual(45);

    const slideAngle90 = getSlideAngle(0, 45);
    expect(slideAngle90).toEqual(90);
});


test('truncate two decimal round down', async () => {
    expect(decimal2Rounding(10.454)).toEqual(10.45);
    expect(decimal2Rounding(11.469)).toEqual(11.46);

});


test('get padding by ratio', async () => {
    expect(getPaddingBySize({widthRatio: 32, heightRatio: 9}, 2)).toEqual('14.06%');
    expect(getPaddingBySize({widthRatio: 32, heightRatio: 9, addStaticHeight: '100px'}, 2)).toEqual('calc(14.06% + 100px)');

});


test('get padding by ratio', async () => {
    expect(getSlideDirection(0, 0, 10, 10)).toEqual(EDirection.horizontal);
    expect(getSlideDirection(0, 0, -10, -10)).toEqual(EDirection.horizontal);
    expect(getSlideDirection(0, 0, 0, 150)).toEqual(EDirection.vertical);
    expect(getSlideDirection(0, 0, 0, -150)).toEqual(EDirection.vertical);
});



test('get media range size', async () => {
    const range = [576, 768, 920, 1024];
    expect(getSizeByRange(320, range)).toEqual(0);
    expect(getSizeByRange(576, range)).toEqual(576);
    expect(getSizeByRange(800, range)).toEqual(768);
});

test('get slide index', async () => {
    expect(getSlideIndex(1, 1, 1)).toEqual(1);
    expect(getSlideIndex(2, 1, 1)).toEqual(2);
    expect(getSlideIndex(2, 2, 1)).toEqual(3);
});


test('get start position', async () => {
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



test('get next page first index', async () => {
    expect(getNextPageFirstIndex(true, 2, 2, 1)).toEqual(4);
});


test('get next page', async () => {
    expect(getNextPage(6)).toEqual(7);
});


test('get last index', async () => {
    expect(getLastIndex(6)).toEqual(5);
});


test('check actual index in range', async () => {
    expect(checkActualIndexInRange(1, {minIndex: 1, maxIndex: 5})).toEqual(true);
    expect(checkActualIndexInRange(6, {minIndex: 1, maxIndex: 5})).toEqual(false);
});


test('get last reset index', async () => {
    expect(getLoopResetIndex(1, 5)).toEqual(6);
});


test('get move distance', async () => {
    expect(getMoveDistance(20, 21)).toEqual(1);
});



test('test onMove activeIndex', async () => {


    // 觸發移動

    // 確認 active 標籤位置

});
