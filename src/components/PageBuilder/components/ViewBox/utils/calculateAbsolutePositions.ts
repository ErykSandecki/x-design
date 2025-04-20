import { RefObject } from 'react';

// store
import { allDataSelector } from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { MouseButton, TObject, TRectCoordinates } from 'types';
import { MouseMode } from '../../../enums';
import { TContext } from 'pages/PageBuilderPage/core/types';

// utils
import { getAbsolutePosition } from './getAbsolutePosition';

export const calculateAbsolutePositions = (
  event: MouseEvent | React.MouseEvent,
  mouseMode: MouseMode,
  rectCoordinates: RefObject<TObject<TRectCoordinates>>,
  sharedRefs: TContext,
): void => {
  if (event.buttons === MouseButton.lmb && mouseMode === MouseMode.default) {
    const allData = allDataSelector(store.getState());

    // eslint-disable-next-line
    for (const [_, value] of Object.entries(allData)) {
      const { coordinates, id, parentId } = value;

      if (id !== '-1') {
        rectCoordinates.current[id] = getAbsolutePosition(
          coordinates,
          id,
          parentId,
          sharedRefs,
        );
      }
    }
  }
};
