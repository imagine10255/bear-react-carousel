export type TEventMap = {
    dragStart?: () => void,
    dragMove?: (percentage: number) => void,
    dragEnd?: (activeSourceIndex: number) => void,
};
