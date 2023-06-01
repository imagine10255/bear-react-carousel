export type TEventMap = {
    change?: () => void;
};


export interface InitData {
    key: string;
    actualIndex: number;
    matchIndex: number;
    sourceIndex?: number;
    inPage: number;
    isClone: boolean;
    element: React.ReactNode;
}
