// others
import { BASE_2D } from 'shared';

// types
import { TChangeParentActionPayload, TElementsData, TPageBuilderState } from '../../types';

// utils
import { reducedData } from './reducedData';

export const getMappedElementsWithResetPosition = (
  payload: TChangeParentActionPayload,
  state: TPageBuilderState,
): TElementsData => {
  const currentPage = state.pages[state.currentPage];
  const { elements } = currentPage;
  const { draggableElements } = payload;

  return reducedData(
    draggableElements.map((id) => {
      const element = elements.allData[id];
      const shouldResetCoordinates = element.position === 'relative';

      return {
        allData: {
          ...elements.allData[id],
          coordinates: shouldResetCoordinates ? BASE_2D : element.coordinates,
        },
        dynamicData: {
          ...elements.dynamicData[id],
          coordinates: shouldResetCoordinates ? BASE_2D : element.coordinates,
        },
        staticData: {
          ...elements.staticData[id],
        },
      };
    }),
  );
};
