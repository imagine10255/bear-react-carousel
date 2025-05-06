import Stater from '../Stater';
import Elementor from './Elementor';

export interface IMultiRefObject<T> {
    current: T | null
}

export type TEventMap = {
    animationEnd?: (starer: Stater, elementor: Elementor) => void,
};
