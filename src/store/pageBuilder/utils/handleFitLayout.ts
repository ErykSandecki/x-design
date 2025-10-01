// types
import { TPageBuilderState } from '../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';

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
        elements: {
          ...currentPage.elements,
          ...mapFilteredValues(currentPage.elements, ids, (element) => ({
            ...element,
            height: { ...element.height, value: 'auto' },
            width: { ...element.width, value: 'auto' },
          })),
        },
      },
    },
  };
};
