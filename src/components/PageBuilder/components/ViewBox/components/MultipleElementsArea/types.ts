// types
import { TElement } from 'types';

export type TCoordinatesData = {
  elementsCoordinates: Array<{
    coordinates: TRectCoordinates;
    id: TElement['id'];
  }>;
  outline: TRectCoordinates;
};
