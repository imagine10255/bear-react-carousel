import {IInfo, TBearSlideItemDataList} from '../types';
import {checkActualIndexInRange, getSlideIndex, initDataList} from '../utils';
import SlideSettingManager from './SlideSettingManager';
import * as React from 'react';

class ElManager {
    rootRef: React.RefObject<HTMLDivElement> = React.createRef();
    containerRef: React.RefObject<HTMLDivElement> = React.createRef();
    slideItemRefs: React.RefObject<Array<HTMLDivElement>> = React.createRef();
    pageRefs: React.RefObject<Array<HTMLDivElement>> = React.createRef();
    pageGroupRef: React.RefObject<HTMLDivElement> = React.createRef();
    navGroupRef: React.RefObject<HTMLDivElement> = React.createRef();

    constructor() {
        // @ts-ignore
        this.slideItemRefs.current = [];
        // @ts-ignore
        this.pageRefs.current = [];
    }

    get rootEl(){
        return this.rootRef.current;
    }
    get containerEl(){
        return this.containerRef.current;
    }
    get slideItemEls(){
        return this.slideItemRefs.current;
    }
    get pageEls(){
        return this.pageRefs.current;
    }
    get pageGroupEl(){
        return this.pageGroupRef.current;
    }
    get navGroupEl(){
        return this.navGroupRef.current;
    }

    setSlideItemRefs(el: HTMLDivElement, index: number){
        this.slideItemRefs.current[index] = el;
    }
    setPageRefs(el: HTMLDivElement, index: number){
        this.pageRefs.current[index] = el;
    }




}


export default ElManager;
