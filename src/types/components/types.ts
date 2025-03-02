import { CSSProperties } from 'react';

// types
import { T2DCoordinates } from 'types/types';
import { ElementType } from './enums';

export type TElement = {
  height: CSSProperties['height'];
  id: string;
  parentId: TElement['id'] | '-1';
  positionAbsolute: T2DCoordinates;
  positionRelative: T2DCoordinates;
  rotate: number;
  type: ElementType;
  width: CSSProperties['width'];
};
