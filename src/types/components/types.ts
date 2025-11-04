import { CSSProperties } from 'react';

// types
import { AlignmentLayout, AlignmentHorizontal, AlignmentVertical, ElementType, LayoutType, Unit } from './enums';
import { TColor, TColorGradient } from './background/types';
import { TGap, TGrid } from './layout/types';
import { TValueExtended } from './generic';

export type TAlignment = {
  horizontal?: AlignmentHorizontal;
  vertical?: AlignmentVertical;
};

export type TBackground = {
  properties: TColor | TColorGradient;
  visible: boolean;
};

export type TChildren = {
  id: string;
  type: ElementType;
};

export type TFlip = {
  x: boolean;
  y: boolean;
};

export type TLayout = {
  alignment: AlignmentLayout;
  boxSizing: 'included' | 'excluded';
  gap: TGap;
  grid: TGrid;
  type: LayoutType;
};

export type TBaseProperties = {
  type: TValueExtended['mode'];
  value: number;
};

export type TInsets = {
  b: TValueExtended;
  l: TValueExtended;
  r: TValueExtended;
  t: TValueExtended;
};

export type TInsetsName = keyof Pick<TElement, 'margin' | 'padding'>;

export type TScore = {
  max?: TValueExtended;
  min?: TValueExtended;
};

export type TSize = {
  type: 'auto' | TValueExtended['mode'];
  unit?: Unit;
  value: number | CSSProperties['height'] | CSSProperties['width'];
};

export type TElement = {
  alignment: TAlignment;
  angle: number;
  aspectRatio: boolean;
  background: TBackground;
  children: Array<TChildren>;
  clipContent: boolean;
  coordinates: T2DCoordinates;
  deepLevel: number;
  flip: TFlip;
  height: TScore & TSize;
  id: string;
  layout: TLayout;
  margin: TInsets;
  mixBlendMode: CSSProperties['mixBlendMode'];
  opacity: TValueExtended;
  padding: TInsets;
  parentId: TElement['id'] | '-1';
  position: CSSProperties['position'];
  type: ElementType;
  visible: boolean;
  width: TScore & TSize;
};
