import * as CSS from 'csstype';
import {CSSProperties, JSX,ReactNode, RefObject} from 'react';

import AcroolCarousel from './AcroolCarousel';
import Controller from './manager/Controller';
import Elementor from './manager/Elementor';

export type TSlidesPerView = number|'auto'
export type TSlidesPerViewActual = number

export enum EDevice {
  mobile,
  desktop,
}

export type TRenderNavButton = (toPrev: TToPrev, toNext: TToNext) => JSX.Element
export type TRenderPagination = (pageTotal: number) => JSX.Element[]|undefined
export type TRenderLazyPreloader = () => JSX.Element|undefined
export type TOnSlideChange = (carouselState: ICarouselState) => void
export type TOnAnimationEnd = (carouselState: ICarouselState, elementor: Elementor) => void
export type TOnMount = () => void
export type GlobalWindow = Window & typeof globalThis


export interface IAcroolCarouselProps extends IBreakpointSetting{
  style?: CSS.Properties
  className?: string
  renderNavButton?: TRenderNavButton
  renderPagination?: TRenderPagination
  data?: TAcroolSlideItemDataList
  moveTime?: number
  autoPlayTime?: number
  initStartPlayTime?: number
  breakpoints?: IPropsBreakpoints
  isDebug?: boolean
  // isSlideItemMemo?: boolean
  isLazy?: boolean
  isEnableGPURender?: boolean
  renderLazyPreloader?: TRenderLazyPreloader
  syncCarouselRefs?: RefObject<AcroolCarousel|null>[]
  setController?: (controller: Controller) => void
  onSlideChange?: TOnSlideChange
  onAnimationEnd?: TOnAnimationEnd
  onMount?: TOnMount
}



export interface ICarouselState {
  // element: {
  //   total: number
  //   firstIndex: number
  //   lastIndex: number
  // }
  // 額外整理過的資訊
  virtual: {
    activeIndex: number,
    prevActiveIndex: number,
    lastIndex: number,
    total: number,
  }
  // 原始資料的資訊
  source: {
    activeIndex: number,
    activeInPageIndex: number,
    prevActiveIndex: number,
    lastIndex: number,
    total: number,
  }
  page: {
    limit: number,
    activePage: number,
    total: number,
  }
}

export interface IInfo extends ICarouselState{
  residue: number
  isVisiblePagination: boolean
  isVisibleNavButton: boolean
}
export interface IAcroolSlideItemData {
  key: string|number
  children: ReactNode
}


export type TAcroolSlideItemDataList = ReactNode[];

export type heightUnit = 'px' | '%' | 'em' | 'rem' | 'vh';
export type THeightUnitSize = 'auto'|number|`${number}${heightUnit}`;

export interface IAspectRatio {
  widthRatio: number
  heightRatio: number
}


export interface IPercentageInfo {
  calcPercentage: number
  percentage: number
  index: number
}
export type TMoveEffectFn = (percentageInfo: IPercentageInfo) => CSSProperties;


interface IMoveEffect {
  moveTime?: string
  moveFn?: TMoveEffectFn
}

export interface IBreakpointSetting {
  slidesPerView: TSlidesPerView
  slidesPerGroup: number
  height?: IAspectRatio|THeightUnitSize
  spaceBetween?: number
  isCenteredSlides?: boolean
  isEnableLoop?: boolean
  isEnablePageContent?: boolean
  isEnablePagination?: boolean
  isEnableNavButton?: boolean
  isEnableMouseMove?: boolean
  isEnableAutoPlay?: boolean
  movePercentage?: number
  moveEffect?: IMoveEffect
  effectFn?: (el: HTMLElement, percentage: number) => void
}
export interface IBreakpointSettingActual extends IBreakpointSetting {
  slidesPerViewActual: TSlidesPerViewActual
}

export interface IPropsBreakpoints {
  [key: number]: Partial<IBreakpointSetting>
}

export type TToPrev = () => void
export type TToNext = () => void




export interface IAcroolSlideCardProps {
    className?: string
    style?: CSS.Properties
    bgUrl?: string
    bgSize?: '100%'|'cover'|'contain'
    children?: ReactNode
    onClick?: () => void
}

export interface IAcroolSlideImageProps {
    className?: string
    style?: CSS.Properties
    imageUrl: string
    imageAlt?: string
    imageSize?: 'none'|'cover'|'contain'|'scaleDown'
    alt?: string
    onClick?: () => void
}



export interface ISetting extends IBreakpointSetting {
  slidesPerViewActual: TSlidesPerViewActual
  moveTime?: number
  autoPlayTime?: number
  initStartPlayTime?: number
  isEnableGPURender?: boolean
  isDebug?: boolean
}
