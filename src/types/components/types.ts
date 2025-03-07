// types
import { ElementType } from './enums';
import { T2DCoordinates } from 'types/types';

export type TElement = {
  height: number;
  id: string;
  index: number;
  parentId: TElement['id'] | '-1';
  positionAbsolute: T2DCoordinates;
  positionRelative: T2DCoordinates;
  rotate: number;
  type: ElementType;
  width: number;
};
