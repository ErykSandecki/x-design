// others
import { BASE_RECT } from '../constants';

// types
import { TRectCoordinates } from 'types';

export const hasBasePosition = (coordinates: TRectCoordinates): boolean =>
  coordinates.x1 === BASE_RECT.x1 &&
  coordinates.x2 === BASE_RECT.x2 &&
  coordinates.y1 === BASE_RECT.y1 &&
  coordinates.y2 === BASE_RECT.y2;
