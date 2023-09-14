export function setSlideItemsSizes(elements: HTMLElement[], size: number) {
    elements.forEach((el, index) => {
        Object.defineProperty(el, 'offsetWidth', {configurable: true, value: size});
        Object.defineProperty(el, 'offsetLeft', {configurable: true, value: size * index});
    });
}

export function setContainerSize(element: HTMLElement, size: number) {
    Object.defineProperty(element, 'offsetWidth', {configurable: true, value: size});
    Object.defineProperty(element, 'offsetLeft', {configurable: true, value: 0});
}


export function getActiveElement(elements: HTMLElement[]) {
    return elements.find(el => el.dataset.active === '');
}
