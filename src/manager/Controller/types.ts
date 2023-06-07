
export type TEventMap = {
    slideBefore: (slideIndex: number, isUseAnimation: boolean) => void;
    slideAfter: (slideIndex: number, isUseAnimation: boolean) => void;
};
