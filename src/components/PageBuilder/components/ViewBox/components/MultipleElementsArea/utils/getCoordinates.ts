import { max, min } from 'lodash';

// others
import { SW } from '../../Corners/constants';

// types
import { TRectCoordinates } from 'types';
import { TSelectedElements } from 'store/pageBuilder/types';

// utils
import { objectToArray } from 'utils';

export const getCoordinates = (
  selectedElements: TSelectedElements,
): TRectCoordinates => {
  const offset = SW / 2;
  const setCoordinates = objectToArray(selectedElements).reduce(
    (obj, { coordinates: { x1, x2, y1, y2 } }) => ({
      x1: [...obj.x1, x1],
      x2: [...obj.x2, x2],
      y1: [...obj.y1, y1],
      y2: [...obj.y2, y2],
    }),
    { x1: [], x2: [], y1: [], y2: [] },
  );

  return {
    x1: min(setCoordinates.x1) - offset,
    x2: max(setCoordinates.x2) + offset,
    y1: min(setCoordinates.y1) - offset,
    y2: max(setCoordinates.y2) + offset,
  };
};
