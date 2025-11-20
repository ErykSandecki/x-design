import { CSSProperties } from 'react';

// types
import { AlignmentHorizontal, AlignmentVertical, ElementType } from './enums';
import { TColor, TColorGradient } from './background/types';
import { TLayout } from './layout/types';
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

export type TInsetsName = keyof Pick<TElement, 'borderRadius' | 'margin' | 'padding'>;

export type TElement = {
  alignment: TAlignment;
  angle: number;
  aspectRatio: boolean;
  background: Array<TBackground>;
  borderRadius: TInsets;
  children: Array<TChildren>;
  clipContent: boolean;
  coordinates: T2DCoordinates;
  deepLevel: number;
  flip: TFlip;
  height: TValueExtended;
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
  width: TValueExtended;
};
