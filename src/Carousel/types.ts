import {ReactNode} from 'react';
import * as CSS from 'csstype';

export type TSlidesPerView = number|'auto'
export type TSlidesPerViewActual = number


export interface ICarouselObj {
  goToPage: (page: number) => void;
  activeActualIndex: number;
  activePage: number;
  info: IInfo,
}


export interface ICarouselProps extends IBreakpointSetting{
  setCarousel?: (carouselObj: ICarouselObj) => void,
  renderNavButton?: (
    toPrev: TToPrev,
    toNext: TToNext,
  ) => void
  style?: CSS.Properties
  className?: string
  data: ICarouselData[];
  moveTime: number
  autoPlayTime: number
  breakpoints: IPropsBreakpoints
  isDebug: boolean
}

export type TCarouselSetting = Partial<ICarouselProps>;


export interface ITouchStart {
  pageX: number,
  pageY: number,
  x: number,
  y: number,
  movePositionX: number,
  movePositionY: number,
}


export interface InitData {
  actualIndex: number;
  matchIndex: number;
  inPage: number;
  isClone: boolean;
  element: React.ReactNode;
}

export interface IInfo {
  formatElement: InitData[],
  sourceTotal: number, // 來源總數
  // 從0開始
  element: {
    total: number,
    firstIndex: number,
    lastIndex: number,
  },
  // 0為實際一開始的位置(往前為負數), 結束值為最後結束位置
  actual: {
    minIndex: number,
    maxIndex: number,
    firstIndex: number,
    lastIndex: number,
  },
  // 總頁數
  pageTotal: number,
  residue: number,
  isVisiblePagination: boolean,
  isVisibleNavButton: boolean,
}
export interface ICarouselData {
  key: string|number
  paginationContent?: ReactNode
  onClick?: () => void,
  children: ReactNode
}

export interface IBreakpointSetting {
  slidesPerView: TSlidesPerView
  slidesPerGroup: number
  spaceBetween: number
  isCenteredSlides: boolean
  isEnableLoop: boolean
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
