import { includes, mapValues } from 'lodash';

// types
import { TPageBuilderState, TRotateElementsAction } from '../types';

// utils
import { extractObjectValues } from 'utils';

export const handleRotateElements = (
  angle: TRotateElementsAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);
  const fixedAngle = parseFloat(angle.toFixed(2));

  return {
    ...state,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        elements: mapValues(currentPage.elements, (element, id) =>
          includes(ids, id) ? { ...element, angle: fixedAngle } : element,
        ),
      },
    },
  };
};
