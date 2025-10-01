// types
import { TPageBuilderState, TSetElementsSizesMinMaxActionPayload } from '../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';

export const handleSetElementsSizesMinMax = (
  scoreType: TSetElementsSizesMinMaxActionPayload['scoreType'],
  sizeType: TSetElementsSizesMinMaxActionPayload['sizeType'],
  state: TPageBuilderState,
  value: TSetElementsSizesMinMaxActionPayload['value'],
): TPageBuilderState => {
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
            [sizeType]: { ...element[sizeType], [scoreType]: value },
          })),
        },
      },
    },
  };
};
