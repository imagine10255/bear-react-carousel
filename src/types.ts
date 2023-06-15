import {ReactNode, RefObject} from 'react';
import * as CSS from 'csstype';
import BearCarousel from './BearCarousel';
import Controller from './manager/Controller';

export type TSlidesPerView = number|'auto'
export type TSlidesPerViewActual = number

export enum EDevice {
  mobile,
  desktop,
}

export type TRenderNavButton = (toPrev: TToPrev, toNext: TToNext) => ReactNode
export type TRenderPagination = (pageTotal: number) => JSX.Element[]|undefined
export type TStateOnChange = (carouselState: ICarouselState) => void
export type TOnMount = () => void
export type TSlideOnClick = () => void



export interface IBearCarouselProps extends IBreakpointSetting{
  style?: CSS.Properties
  className?: string
  renderNavButton?: TRenderNavButton
  renderPagination?: TRenderPagination
  data?: TBearSlideItemDataList
  moveTime?: number
  autoPlayTime?: number
  breakpoints?: IPropsBreakpoints
  defaultActivePage?: number
  isDebug?: boolean
  isSlideItemMemo?: boolean
  syncCarouselRef?: RefObject<BearCarousel>
  setController?: (controller: Controller) => void
  onSlideChange?: TStateOnChange
  onMount?: TOnMount
}



export interface ICarouselState {
  element: {
    total: number
    firstIndex: number
    lastIndex: number
  }
  // 0為實際一開始的位置(往前為負數), 結束值為最後結束位置
  actual: {
    activeIndex: number
    minIndex: number
    maxIndex: number
    firstIndex: number
    lastIndex: number
  }
  page: {
    activePage: number
    pageTotal: number
  }
}

export interface IInfo extends ICarouselState{
  sourceTotal: number // 來源總數
  residue: number
  isVisiblePagination: boolean
  isVisibleNavButton: boolean
}
export interface IBearSlideItemData {
  key: string|number
  onClick?: TSlideOnClick
  children: ReactNode
}
export type TBearSlideItemDataList = IBearSlideItemData[];

export interface IAspectRatio {
  widthRatio: number
  heightRatio: number
  addStaticHeight?: string
}

export interface IBreakpointSetting {
  slidesPerView?: TSlidesPerView
  slidesPerGroup?: number
  height?: IAspectRatio|string,
  spaceBetween?: number
  isCenteredSlides?: boolean
  isEnableLoop?: boolean
  isEnablePageContent?: boolean
  isEnablePagination?: boolean
  isEnableNavButton?: boolean
  isEnableMouseMove?: boolean
  isEnableAutoPlay?: boolean
}
export interface IBreakpointSettingActual extends IBreakpointSetting {
  slidesPerViewActual: TSlidesPerViewActual
}

export interface IPropsBreakpoints {
  [key: number]: Partial<IBreakpointSetting>
}

export type TToPrev = () => void
export type TToNext = () => void





