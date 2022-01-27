import {IBreakpointSetting, TSlidesPerView, IBreakpointSettingActual, IInfo, IPropsBreakpoints, IReactCarouselProps} from './types';


const dd = (...log: any) => {
    const dom = document.getElementById('debug-textarea') as HTMLTextAreaElement;
    if(dom){
        const date = new Date();
        const num = `${date.getMinutes()}${date.getSeconds()}`;
        dom.value = `${num}: ${log}\n${dom.value}`;
    }
};


/**
 * 產生UUID
 * @private
 */
const uuid = () => {
    let d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


const shallowCompare = (obj: any, prevObj: any) => {
    for (const key in obj){
        if(obj[key] !== prevObj[key]) return true;
    }
    return false;
}




/**
 * 取得螢幕尺寸對應設定尺寸
 * @param breakpointSizes
 */
const getMediaRangeSize = (breakpointSizes: string[]) => {
    const windowSize = typeof document !== 'undefined' ? window.innerWidth : 0;

    // @ts-ignore
    const filterArray: number[] = breakpointSizes.filter(
        (size) => Number(size) <= windowSize
    ) as number[];
    filterArray.sort((a, b) => Number(b) - Number(a));

    if (filterArray.length > 0) {
        return filterArray[0];
    }
    return 0;
};


/**
 * 取得響應式設定
 * @param setting
 * @param breakpoints
 */
const getMediaSetting = (setting: IBreakpointSetting, breakpoints: IPropsBreakpoints): IBreakpointSettingActual => {

    // @ts-ignore
    const selectSize = getMediaRangeSize(Object.keys(breakpoints));
    if(selectSize > 0){
        setting = Object.assign(setting, breakpoints[selectSize]);
    }

    // 若顯示項目大於來源項目, 則關閉Loop
    // if (setting.slidesPerView > dataLength) {
    //     setting.isEnableLoop = false;
    // }

    const slidesPerViewActual = setting.slidesPerView === 'auto' ? 1: setting.slidesPerView;
    return {
        ...setting,
        slidesPerViewActual: slidesPerViewActual,
        isEnableLoop: setting.slidesPerView === 'auto' ? false : setting.isEnableLoop,
        slidesPerGroup: setting.slidesPerGroup > slidesPerViewActual ? slidesPerViewActual:setting.slidesPerGroup, // fix
    };
};


const getMediaInfo = (props: IReactCarouselProps): {rwdMedia: IBreakpointSettingActual, info: IInfo} => {

    const {data, breakpoints, slidesPerGroup, slidesPerView, spaceBetween, isEnableLoop, isEnableNavButton, isEnableMouseMove, isEnablePagination, isCenteredSlides} = props;

    const rwdMedia = getMediaSetting({
        slidesPerView: slidesPerView,
        slidesPerGroup: slidesPerGroup,
        spaceBetween: spaceBetween,
        isCenteredSlides: isCenteredSlides,
        isEnableLoop: isEnableLoop,
        isEnableNavButton: isEnableNavButton,
        isEnablePagination: isEnablePagination,
        isEnableMouseMove: isEnableMouseMove,
    }, breakpoints);


    // console.log('rwdMedia', rwdMedia);
    const divisible = data.length % rwdMedia.slidesPerGroup; // 餘數
    let sliceData = divisible > 0 ? data.slice(0, data.length - divisible) : data;
    let sourceTotal = sliceData.length;
    const formatElement = initDataList(
        sliceData,
        rwdMedia.slidesPerViewActual,
        rwdMedia.slidesPerGroup,
        rwdMedia.isEnableLoop
    );


    const elementTotal = formatElement.length;
    const cloneBeforeTotal = rwdMedia.isEnableLoop ? rwdMedia.slidesPerViewActual : 0;
    const cloneAfterTotal = cloneBeforeTotal;
    const actualMinIndex = 0;
    const actualMaxIndex = elementTotal - 1;

    // if (rwdMedia.slidesPerGroup > rwdMedia.slidesPerViewActual) {
    //     // throw Error(
    //     //     `slidesPerGroup(${rwdMedia.slidesPerGroup}) can't > slidesPerView(${rwdMedia.slidesPerViewActual})`
    //     // );
    // } else if (Math.ceil(rwdMedia.slidesPerGroup) !== rwdMedia.slidesPerGroup) {
    //     throw Error(
    //         `slidesPerGroup(${rwdMedia.slidesPerGroup}) can't has floating .xx`
    //     );
    // }

    let fakeTotalPage = Math.ceil(sourceTotal / rwdMedia.slidesPerGroup);
    if(!rwdMedia.isEnableLoop && rwdMedia.slidesPerView !== 'auto' && !rwdMedia.isCenteredSlides){
        fakeTotalPage = fakeTotalPage - (rwdMedia.slidesPerView - rwdMedia.slidesPerGroup);
    }

    const info: IInfo = {
        formatElement,
        sourceTotal, // 來源總數
        // 從0開始
        element: {
            total: elementTotal,
            firstIndex: 0,
            lastIndex: elementTotal - 1
        },
        // 0為實際一開始的位置(往前為負數), 結束值為最後結束位置
        actual: {
            minIndex: actualMinIndex,
            maxIndex: actualMaxIndex,
            firstIndex: Math.ceil(cloneBeforeTotal),
            lastIndex: Math.ceil(sourceTotal + cloneAfterTotal - 1)
        },
        // 總頁數
        // pageTotal: fakeTotalPage - (rwdMedia.slidesPerView - (elementTotal % rwdMedia.slidesPerView)),
        pageTotal: fakeTotalPage,
        isDivisible: divisible === 0,
        residue: elementTotal % rwdMedia.slidesPerGroup,
        isVisiblePagination: rwdMedia.isEnablePagination && formatElement.length > 0,
        isVisibleNavButton: rwdMedia.isEnableNavButton && formatElement.length > 0
    };

    return {
        info,
        rwdMedia,
    };
};


/**
 * 初始化資料
 * @param sourceList
 * @param slidesPerView
 * @param slidesPerGroup
 * @param isLoop
 */
const initDataList = (sourceList: Array<any> = [], slidesPerView: TSlidesPerView = 1, slidesPerGroup = 1, isLoop= false): Array<{
  actualIndex: number;
  matchIndex: number;
  inPage: number;
  isClone: boolean;
  element: React.ReactNode;
}> => {
    const formatList = [];
    const isClone = isLoop && typeof window !== 'undefined';
    let index = 0;
    const formatSlidesPerView = slidesPerView === 'auto' ? 0: Math.ceil(slidesPerView);
    const lastPage = (sourceList.length / slidesPerGroup) - (slidesPerGroup - formatSlidesPerView);

    if (isClone) {
    // 複製最後面, 放在最前面

        const cloneStart = (sourceList.length - formatSlidesPerView);
        // eslint-disable-next-line no-restricted-syntax
        for (const row of sourceList.slice(-formatSlidesPerView)) {
            formatList[index] = {
                actualIndex: index,
                matchIndex: formatSlidesPerView + cloneStart + index,
                inPage: 1,
                isClone: true,
                element: row.children,
            };
            index += 1;
        }
    }

    let matchFirstIndex = index;
    let pageFirstIndex = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const row of sourceList) {
        formatList[index] = {
            actualIndex: index,
            matchIndex: index,
            inPage: Math.ceil((pageFirstIndex + 1) / slidesPerGroup),
            // inPage: info.pageTotal - (rwdMedia.slidesPerView - (info.element.total % rwdMedia.slidesPerView)),
            isClone: false,
            element: row.children,
        };
        index += 1;
        pageFirstIndex += 1;
    }

    if (isClone) {
    // 複製前面的(需顯示總數) 放在最後面

        // eslint-disable-next-line no-restricted-syntax
        for (const row of sourceList.slice(0, formatSlidesPerView)) {
            formatList[index] = {
                actualIndex: index,
                matchIndex: matchFirstIndex,
                inPage: lastPage,
                isClone: true,
                element: row.children,
            };
            index += 1;
            matchFirstIndex += 1;
        }
    }
    return formatList;
};

/**
 * 檢查是否為行動裝置
 */
const checkIsMobile = () => {
    try { document.createEvent('TouchEvent'); return true; } catch (e) { return false; }
};



/**
 * 取得 transform 3d x 移動參數
 * @param el
 */
const getTranslateParams = (el: any) => {
    const values = el.style.transform.split(/\w+\(|\);?/);
    if (!values[1] || !values[1].length) {
        return {x: 0, y: 0, z: 0};
    }

    const result = values[1].split(',');
    return {
        x: Number(result[0].replace('px', '')),
        y: Number(result[1].replace('px', '')),
        z: Number(result[2].replace('px', '')),
    };
};



export {dd, uuid, shallowCompare, getMediaRangeSize, getMediaSetting, getMediaInfo, initDataList, checkIsMobile, getTranslateParams};
