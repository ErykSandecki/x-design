// types
import { TPageBuilderState, TSetElementsSizesActionPayload } from '../../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';
import { getElementSizes } from './getElementSizes';

export const handleSetElementsSizes = (
  sizeType: TSetElementsSizesActionPayload['sizeType'],
  state: TPageBuilderState,
  value: TSetElementsSizesActionPayload['value'],
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
            ...getElementSizes(element, sizeType, value),
          })),
        },
      },
    },
  };
};
