import { RefObject } from 'react';

// store
import { elementsSelector } from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { MouseButton, TObject } from 'types';
import { MouseMode } from '../../../../types/enums/mouseMode';
import { TContext } from 'pages/PageBuilderPage/core/types';

// utils
import { getAbsolutePosition } from './getAbsolutePosition';

export const calculateAbsolutePositions = (
  event: MouseEvent | React.MouseEvent,
  mouseMode: MouseMode,
  rectCoordinates: RefObject<TObject<TRectCoordinates>>,
  sharedRefs: TContext['itemsRefs'],
  zoomContentRef: TContext['zoomContentRef'],
): void => {
  if (event.buttons === MouseButton.lmb && mouseMode === MouseMode.default) {
    const elements = elementsSelector(store.getState());

    // eslint-disable-next-line
    for (const [_, value] of Object.entries(elements)) {
      const { id } = value;

      if (id !== '-1') {
        rectCoordinates.current[id] = getAbsolutePosition(id, sharedRefs, zoomContentRef);
      }
    }
  }
};
