import { includes, mapValues } from 'lodash';

// types
import { TPageBuilderState } from '../types';

// utils
import { extractObjectValues } from 'utils';

export const handleFitLayout = (state: TPageBuilderState): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);

  return {
    ...state,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        elements: mapValues(currentPage.elements, (element, id) =>
          includes(ids, id)
            ? { ...element, height: { ...element.height, value: 'auto' }, width: { ...element.width, value: 'auto' } }
            : element,
        ),
      },
    },
  };
};
