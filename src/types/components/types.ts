import { ColorFormatType } from 'antd/es/color-picker/interface';
import { CSSProperties } from 'react';

// types
import { AlignmentHorizontal, AlignmentVertical, ElementType } from './enums';
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

export type TElement = {
  alignment: TAlignment;
  background: TBackground;
  children: Array<string>;
  coordinates: T2DCoordinates;
  height: number | CSSProperties['height'];
  id: string;
  parentId: TElement['id'] | '-1';
  position: CSSProperties['position'];
  rotate: number;
  type: ElementType;
  width: number | CSSProperties['width'];
};
