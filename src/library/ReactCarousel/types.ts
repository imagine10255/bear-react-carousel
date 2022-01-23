import {ReactNode} from 'react';
import * as CSS from 'csstype';

export type TSlidesPerView = number|'auto'
export type TSlidesPerViewActual = number


export interface IProps {
  setControlRef?: (ref: any) => void,
  style?: CSS.Properties
  className?: string
  data: IData[];
  slidesPerView: TSlidesPerView;
  slidesPerGroup: number
  isEnableLoop: boolean
  isEnableMouseMove: boolean
  isEnablePagination: boolean
  isEnableNavButton: boolean
  moveTime: number
  autoPlayTime: number
  isDebug: boolean
  breakpoints: IPropsBreakpoints
  spaceBetween: number
  renderNavButton?: (
    toPrev: TToPrev,
    toNext: TToNext,
  ) => void
  isCenteredSlides: boolean,
  // emitSetFunc: (params: ICommonFunc) => void
  onChange?: (index: number, page: number) => void
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
  key: string
  paginationContent?: ReactNode
  children: ReactNode
}

export interface IBreakpointSetting {
  slidesPerView: TSlidesPerView
  slidesPerGroup: number
  isEnableLoop: boolean
  isEnablePagination: boolean
  isEnableNavButton: boolean
  isCenteredSlides: boolean
  spaceBetween: number
}
export interface IBreakpointSettingActual extends IBreakpointSetting {
  slidesPerViewActual: TSlidesPerViewActual
}

export interface IBreakpoints {
  [key: number]: IBreakpointSetting
}
export interface IPropsBreakpoints {
  [key: number]: Partial<IBreakpointSetting>
}

export type TToPrev = () => void
export type TToNext = () => void
