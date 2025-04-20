import { RefObject } from 'react';

// store
import {
  allDataSelector,
  areaAxisSelectorCreator,
} from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { MouseButton, TObject, TRectCoordinates } from 'types';
import { MouseMode } from '../../../enums';
import { TContext } from 'pages/PageBuilderPage/core/types';

// utils
import { findMainParent } from 'store/pageBuilder/utils/findMainParent';

export const calculateAbsolutePositions = (
  event: MouseEvent | React.MouseEvent,
  mouseMode: MouseMode,
  rectCoordinates: RefObject<TObject<TRectCoordinates>>,
  sharedRefs: TContext,
): void => {
  if (event.buttons === MouseButton.lmb && mouseMode === MouseMode.default) {
    const allData = allDataSelector(store.getState());
    const z = areaAxisSelectorCreator('z')(store.getState());

    // eslint-disable-next-line
    for (const [_, value] of Object.entries(allData)) {
      const { coordinates, id, parentId } = value;

      if (id !== '-1') {
        const height = parseInt(getComputedStyle(sharedRefs[id]).height);
        const width = parseInt(getComputedStyle(sharedRefs[id]).width);

        if (parentId === '-1') {
          rectCoordinates.current[id] = {
            x1: coordinates.x,
            x2: coordinates.x + width,
            y1: coordinates.y,
            y2: coordinates.y + height,
          };
        } else {
          const mainParentId = findMainParent(parentId, allData);
          const parentCords = allData[mainParentId].coordinates;
          const { top: parentTop, left: parentLeft } =
            sharedRefs[mainParentId].getBoundingClientRect();
          const { top: childrenTop, left: childrenLeft } =
            sharedRefs[id].getBoundingClientRect();
          const offsetX = parentLeft - childrenLeft;
          const offsetY = parentTop - childrenTop;
          const x = parentCords.x - offsetX / z;
          const y = parentCords.y - offsetY / z;

          rectCoordinates.current[id] = {
            x1: x,
            x2: x + width,
            y1: y,
            y2: y + height,
          };
        }
      }
    }
  }
};
