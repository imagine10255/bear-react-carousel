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

    get root(){
        return this.rootRef.current;
    }


}


export default ElManager;
