// types
import { TChangePropertiesActionPayload, TPageBuilderState } from '../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';

export const handleChangeProperties = (properties: TChangePropertiesActionPayload, state: TPageBuilderState): void => {
  const currentPage = state.pages[state.currentPage];
  const { selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);

  currentPage.elements = {
    ...currentPage.elements,
    ...mapFilteredValues(currentPage.elements, ids, (element) => ({
      ...element,
      ...properties,
    })),
  };
};
