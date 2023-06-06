import {ReactNode} from 'react';
import * as CSS from 'csstype';
import BearCarousel from './BearCarousel';
import Controller from './manager/Controller';

export type TSlidesPerView = number|'auto'
export type TSlidesPerViewActual = number

export enum EDevice {
  mobile,
  desktop,
}

export interface IBearCarouselObj {
  // goToPage: (page: number) => void;
  // toNext: () => void;
  // toPrev: () => void;
  activeActualIndex: number;
  activePage: number;
  info: IInfo,
}


export enum EHorizontal {
  right= 'right',
  left = 'left',
}
export enum EDirection {
  vertical= 'vertical',
  horizontal = 'horizontal',
}

export type IRenderNavButton = (toPrev: TToPrev, toNext: TToNext) => void
export type IRenderPagination = (pageTotal: number) => JSX.Element




export interface ICustomRefObject<T> {
  current: T;
}


export interface IBearCarouselProps extends IBreakpointSetting{
  onChange?: (carouselState: ICarouselState) => void,
  renderNavButton?: IRenderNavButton
  renderPagination?: IRenderPagination
  style?: CSS.Properties
  className?: string
  data: TBearSlideItemDataList;
  moveTime: number
  autoPlayTime: number
  breakpoints: IPropsBreakpoints
  defaultActivePage?: number,
  onElementMove?: (activeActualIndex: number, percentage: number) => void,
  onElementDone?: (activeActualIndex: number) => void,
  isDebug: boolean
  isSlideItemMemo?: boolean,
  syncCarouselRef?: ICustomRefObject<BearCarousel>,
  controllerRef?: ICustomRefObject<Controller>,
  onMount?: () => void;
}



export interface ICarouselState {
  element: {
    total: number,
    firstIndex: number,
    lastIndex: number,
    activeIndex: number,
  },
  // 0為實際一開始的位置(往前為負數), 結束值為最後結束位置
  actual: {
    activeIndex: number,
    minIndex: number,
    maxIndex: number,
    firstIndex: number,
    lastIndex: number,
  },
  page: {
    activePage: number
    pageTotal: number,
  },
}

export interface IInfo {

  sourceTotal: number, // 來源總數
  // 從0開始
  element: {
    total: number,
    firstIndex: number,
    lastIndex: number,
    activeIndex: number,
  },
  // 0為實際一開始的位置(往前為負數), 結束值為最後結束位置
  actual: {
    activeIndex: number,
    minIndex: number,
    maxIndex: number,
    firstIndex: number,
    lastIndex: number,
  },
  page: {
    activePage: number
    pageTotal: number,
  },
  residue: number,
  isVisiblePagination: boolean,
  isVisibleNavButton: boolean,
}
export interface IBearSlideItemData {
  key: string|number
  onClick?: () => void,
  children: ReactNode
}
export type TBearSlideItemDataList = IBearSlideItemData[];

export interface IAspectRatio {
  widthRatio: number,
  heightRatio: number,
  addStaticHeight?: string,
}

export interface IBreakpointSetting {
  slidesPerView: TSlidesPerView
  slidesPerGroup: number
  aspectRatio?: IAspectRatio
  staticHeight?: string,
  spaceBetween: number
  isCenteredSlides: boolean
  isEnableLoop: boolean
  isEnablePageContent: boolean
  isEnablePagination: boolean
  isEnableNavButton: boolean
  isEnableMouseMove: boolean
  isEnableAutoPlay: boolean
}
export interface IBreakpointSettingActual extends IBreakpointSetting {
  slidesPerViewActual: TSlidesPerViewActual
}

export interface IPropsBreakpoints {
  [key: number]: Partial<IBreakpointSetting>
}

export type TToPrev = () => void
export type TToNext = () => void





