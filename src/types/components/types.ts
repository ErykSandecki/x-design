import { ColorFormatType } from 'antd/es/color-picker/interface';
import { CSSProperties } from 'react';

// types
import { AlignmentLayout, AlignmentHorizontal, AlignmentVertical, ElementType, LayoutType, Unit } from './enums';

export type TAlignment = {
  horizontal?: AlignmentHorizontal;
  vertical?: AlignmentVertical;
};

export type TColor = { alpha: string; color: string; format: ColorFormatType };

export type TColorGradient = Array<TColor & { direction: 'linear' }>;

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

export type TGapProperties = {
  value: number;
};

export type TGap = {
  column: TGapProperties;
  row: TGapProperties;
};

export type TGrid = {
  columns: number;
  rows: number;
};

export type TLayout = {
  alignment: AlignmentLayout;
  boxSizing: 'included' | 'excluded';
  gap: TGap;
  grid: TGrid;
  type: LayoutType;
};

export type TInsets = {
  b: number;
  l: number;
  r: number;
  t: number;
};

export type TScore = {
  max?: number;
  min?: number;
};

export type TSize = TScore & {
  unit?: Unit;
  value: number | CSSProperties['height'] | CSSProperties['width'];
};

export type TElement = {
  alignment: TAlignment;
  angle: number;
  aspectRatio: boolean;
  background: TBackground;
  children: Array<TChildren>;
  coordinates: T2DCoordinates;
  deepLevel: number;
  flip: TFlip;
  height: TSize;
  id: string;
  layout: TLayout;
  padding: TInsets;
  parentId: TElement['id'] | '-1';
  position: CSSProperties['position'];
  type: ElementType;
  width: TSize;
};
