// types
import { TChangeLayoutBoxSizingActionPayload, TPageBuilderState } from '../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';

export const handleChangeLayoutBoxSizing = (
  boxSizing: TChangeLayoutBoxSizingActionPayload,
  state: TPageBuilderState,
): void => {
  const currentPage = state.pages[state.currentPage];
  const { selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);

  currentPage.elements = {
    ...currentPage.elements,
    ...mapFilteredValues(currentPage.elements, ids, (element) => ({
      ...element,
      layout: { ...element.layout, boxSizing },
    })),
  };
};
