export type TEventMap = {
    change?: () => void;
};


export interface InitData {
    key: string;
    virtualIndex: number;
    matchIndex: number;
    sourceIndex?: number;
    inPage: number;
    isClone: boolean;
    element: React.ReactNode;
}
