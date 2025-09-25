import { ColorFormatType } from 'antd/es/color-picker/interface';
import { CSSProperties } from 'react';

// types
import {
  AlignmentHorizontal,
  AlignmentVertical,
  ElementType,
  LayoutType,
  Unit,
} from './enums';
import { T2DCoordinates } from 'types/types';

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

export type TLayout = {
  type: LayoutType;
};

export type TSize = {
  max?: number;
  min?: number;
  unit?: Unit;
  value: number | CSSProperties['height'] | CSSProperties['width'];
};

export type TElement = {
  alignment: TAlignment;
  angle: number;
  background: TBackground;
  children: Array<string>;
  coordinates: T2DCoordinates;
  deepLevel: number;
  height: TSize;
  id: string;
  layout: TLayout;
  parentId: TElement['id'] | '-1';
  position: CSSProperties['position'];
  type: ElementType;
  width: TSize;
};
