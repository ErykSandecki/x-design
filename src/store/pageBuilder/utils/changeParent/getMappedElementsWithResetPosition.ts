// others
import { BASE_2D } from 'shared';

// types
import { TElements, TPageBuilderState } from '../../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';

export const getMappedElementsWithResetPosition = (state: TPageBuilderState): TElements => {
  const currentPage = state.pages[state.currentPage];
  const { elements } = currentPage;
  const { draggableElements } = state.events;
  const ids = extractObjectValues(draggableElements, ['id']);

  return mapFilteredValues(elements, ids, ({ id }) => {
    const element = elements[id];
    const shouldResetCoordinates = element.position === 'relative';

    return {
      ...elements[id],
      coordinates: shouldResetCoordinates ? BASE_2D : element.coordinates,
    };
  });
};
