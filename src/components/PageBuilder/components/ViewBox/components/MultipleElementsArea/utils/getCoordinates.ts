import { max, min, size } from 'lodash';

// others
import { BASE_RECT } from 'shared';
import { SW } from '../../ClickableArea/constants';

// store
import { allDataSelector } from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { TContext } from 'pages/PageBuilderPage/core/types';
import { TElements } from '../types';
import { TSelectedElements } from 'store/pageBuilder/types';

// utils
import { getAbsolutePosition } from '../../../utils/getAbsolutePosition';

export const getCoordinates = (
  isMultipleMoving: boolean,
  selectedElements: TSelectedElements,
  sharedRefs: TContext['itemsRefs'],
): TElements => {
  if (!isMultipleMoving && size(selectedElements) > 1) {
    const allData = allDataSelector(store.getState());
    const offset = SW / 2;
    const setCoordinates = selectedElements.reduce(
      (obj, { id, parentId }) => {
        const { coordinates } = allData[id];
        const { x1, x2, y1, y2 } = getAbsolutePosition(
          coordinates,
          id,
          parentId,
          sharedRefs,
        );

        return {
          elementsCords: [
            ...obj.elementsCords,
            { coordinates: { x1, x2, y1, y2 }, id },
          ],
          x1: [...obj.x1, x1],
          x2: [...obj.x2, x2],
          y1: [...obj.y1, y1],
          y2: [...obj.y2, y2],
        };
      },
      { elementsCords: [], x1: [], x2: [], y1: [], y2: [] },
    );

    return {
      elementsCordinates: setCoordinates.elementsCords,
      outline: {
        x1: min(setCoordinates.x1) - offset,
        x2: max(setCoordinates.x2) + offset,
        y1: min(setCoordinates.y1) - offset,
        y2: max(setCoordinates.y2) + offset,
      },
    };
  }

  return {
    elementsCordinates: [],
    outline: BASE_RECT,
  };
};
