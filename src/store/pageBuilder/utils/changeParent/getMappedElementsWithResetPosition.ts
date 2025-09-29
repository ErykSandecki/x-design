// others
import { BASE_2D } from 'shared';

// types
import { TChangeParentActionPayload, TElements, TPageBuilderState } from '../../types';

// utils
import { reducedData } from './reducedData';

export const getMappedElementsWithResetPosition = (
  payload: TChangeParentActionPayload,
  state: TPageBuilderState,
): TElements => {
  const currentPage = state.pages[state.currentPage];
  const { elements } = currentPage;
  const { draggableElements } = payload;

  return reducedData(
    draggableElements.map(({ id }) => {
      const element = elements[id];
      const shouldResetCoordinates = element.position === 'relative';

      return {
        ...elements[id],
        coordinates: shouldResetCoordinates ? BASE_2D : element.coordinates,
      };
    }),
  );
};
