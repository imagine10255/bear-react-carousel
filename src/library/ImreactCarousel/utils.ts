import {IBreakpointSetting, IBreakpoints, IElement, TSlidesPerView, IBreakpointSettingActual} from './types';
import { elClassName } from './config'

/**
 * 取得響應式設定
 * @param setting
 * @param breakpoints
 */
const getMediaSetting = (setting: IBreakpointSetting, breakpoints: IBreakpoints): IBreakpointSettingActual => {
    const windowSize = typeof document !== 'undefined' ? window.innerWidth : 0;

    // @ts-ignore
    const filterArray: number[] = Object.keys(breakpoints).filter(
        (size) => Number(size) <= windowSize
    ) as number[];
    filterArray.sort((a, b) => Number(b) - Number(a));

    if (filterArray.length > 0) {
        setting = Object.assign(setting, breakpoints[filterArray[0]]);
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
            // inPage: this.info.pageTotal - (this.rwdMedia.slidesPerView - (this.info.element.total % this.rwdMedia.slidesPerView)),
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

const getCss = (slidesPerView: TSlidesPerView) => {
    if(slidesPerView === 'auto'){
        return `
        flex: 0 0 auto;
        max-width: none;
        `;
    }

    return `
        flex: 1 0 ${100 / slidesPerView}%;
        max-width: ${100 / slidesPerView}%;
    `;
};

const generateMedia = (breakpoints: any) => Object.keys(breakpoints)
    .filter(size => typeof breakpoints[size] !== 'undefined')
    .map(size => {
        return `@media screen and (min-width: ${size}px){
            .${elClassName.slideItem}{
                ${getCss(breakpoints[size].slidesPerView)};
            }
        }`;
    });


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

/**
 * 取得隨機顏色
 */
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};


export {getMediaSetting, initDataList, checkIsMobile, generateMedia, getTranslateParams, getRandomColor};
