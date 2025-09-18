import { max, min, size } from 'lodash';

// others
import { BASE_RECT } from 'shared';
import { SW } from '../components/ClickableArea/constants';

// store
import {
  counterAngleSelectorCreator,
  elementAllDataSelectorCreator,
} from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { TContext } from 'pages/PageBuilderPage/core/types';
import { TCoordinatesData } from '../types';
import { TSelectedElements } from 'store/pageBuilder/types';

// utils
import { getAbsolutePosition } from '../../../utils/getAbsolutePosition';
import { getCornerBounds } from 'utils';

export const getCoordinatesData = (
  isMultipleMoving: boolean,
  itemsRefs: TContext['itemsRefs'],
  selectedElements: TSelectedElements,
  zoomContentRef: TContext['zoomContentRef'],
): TCoordinatesData => {
  if (!isMultipleMoving && size(selectedElements) > 1) {
    const offset = SW / 2;
    const setCoordinates = selectedElements.reduce(
      (obj, { id, parentId }) => {
        const state = store.getState();
        const counterAngle = counterAngleSelectorCreator(parentId)(state);
        const element = elementAllDataSelectorCreator(id)(state);
        const rotate = element.rotate - counterAngle;
        const cords = getAbsolutePosition(id, itemsRefs, zoomContentRef);
        const height = cords.y2 - cords.y1;
        const width = cords.x2 - cords.x1;
        const { x1, x2, y1, y2 } = getCornerBounds(
          rotate,
          height,
          width,
          cords.x1,
          cords.y1,
        );

        return {
          elementsCordinates: [
            ...obj.elementsCordinates,
            { coordinates: cords, id },
          ],
          x1: [...obj.x1, x1],
          x2: [...obj.x2, x2],
          y1: [...obj.y1, y1],
          y2: [...obj.y2, y2],
        };
      },
      { elementsCordinates: [], x1: [], x2: [], y1: [], y2: [] },
    );

    return {
      elementsCordinates: setCoordinates.elementsCordinates,
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
