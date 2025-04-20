// types
import { TElement, TRectCoordinates } from 'types';

export type TElements = {
  elementsCordinates: Array<{
    coordinates: TRectCoordinates;
    id: TElement['id'];
  }>;
  outline: TRectCoordinates;
};
