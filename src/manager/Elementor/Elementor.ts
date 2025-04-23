import {createRef, RefObject} from 'react';
import {IMultiRefObject} from './types';

import Configurator from '../Configurator';
import Stater from '../Stater';


class Elementor {
    _rootRef: RefObject<HTMLDivElement|null> = createRef();
    _containerRef: RefObject<HTMLDivElement|null> = createRef();
    _pageGroupRef: RefObject<HTMLDivElement|null> = createRef();
    _navGroupRef: RefObject<HTMLDivElement|null> = createRef();
    _slideItemRefs: IMultiRefObject<Array<HTMLDivElement>> = createRef();
    _pageRefs: IMultiRefObject<Array<HTMLDivElement>> = createRef();

    constructor(manager: {
        configurator: Configurator,
        stater: Stater,
    }) {
        this._slideItemRefs.current = [];
        this._pageRefs.current = [];
    }

    get rootEl(){
        return this._rootRef.current;
    }
    get containerEl(){
        return this._containerRef.current;
    }
    get slideItemEls(){
        return this._slideItemRefs.current;
    }
    get pageEls(){
        return this._pageRefs.current;
    }
    get pageGroupEl(){
        return this._pageGroupRef.current;
    }
    get navGroupEl(){
        return this._navGroupRef.current;
    }


    setSlideItemRefs(el: HTMLDivElement, index: number){
        if (this._slideItemRefs.current) {
            this._slideItemRefs.current[index] = el;
        }
    }
    setPageRefs(el: HTMLDivElement, index: number){
        if (this._pageRefs.current) {
            this._pageRefs.current[index] = el;
        }
    }
}


export default Elementor;
