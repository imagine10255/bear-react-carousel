import {ReactNode} from 'react';

export type TSlidesPerView = number|'auto'
export type TSlidesPerViewActual = number


export interface IReactCarouselRef {
  goToActualIndex: (slideIndex: number, isUseAnimation?: boolean) => void;
}


export interface ITouchStart {
  pageX: number,
  pageY: number,
  x: number,
  y: number,
  movePositionX: number,
  movePositionY: number,
}

export interface IElement {
  children: React.ReactNode,
  key: String,
}

export interface IInfo {
  formatElement: Array<{
    actualIndex: number,
    matchIndex: number,
    inPage: number,
    isClone: boolean,
    element: React.ReactNode,
  }>,
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
  isDivisible: boolean,
  residue: number,
  isVisiblePagination: boolean,
  isVisibleNavButton: boolean,
}
export interface IData {
  key: string|number
  paginationContent?: ReactNode
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
}
export interface IBreakpointSettingActual extends IBreakpointSetting {
  slidesPerViewActual: TSlidesPerViewActual
}

export interface IPropsBreakpoints {
  [key: number]: Partial<IBreakpointSetting>
}

export type TToPrev = () => void
export type TToNext = () => void
