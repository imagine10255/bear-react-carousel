
export type TEventMap = {
    dragStart?: (event: MouseEvent|TouchEvent) => void;
    dragMove?: (percentage: number) => void;
    dragEnd?: (activeSourceIndex: number) => void;
};
