import {SelectEffect, Tail} from '@redux-saga/core/types/effects';
import {TAppState} from '@/store/appReducer';
import {SagaGenerator} from 'typed-redux-saga';


declare module 'react-redux' {
    export const useSelector: <TState = IAppState, Selected = unknown>(selector: (state: TState) => Selected, equalityFn?: EqualityFn<Selected> | undefined) => Selected;
    interface DefaultRootState extends IAppState{}
}


//
// declare module 'typed-redux-saga' {
//     export function select(): SagaGenerator<TAppState, SelectEffect>;
//     export function select<Fn extends (state: IAppState, ...args: any[]) => any>(
//         selector: Fn,
//         ...args: Tail<Parameters<Fn>>
//     ): SagaGenerator<ReturnType<Fn>, SelectEffect>;
// }

declare module 'typed-redux-saga' {
    export function select<Fn extends (state: IAppState, ...args: any[]) => any>(
        selector: Fn,
        ...args: Tail<Parameters<Fn>>
    ): SelectEffect
}
