// types
import { TAddVariantActionPayload, TPageBuilderState } from '../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';

export const handleAddVariant = ({ key, value }: TAddVariantActionPayload, state: TPageBuilderState): void => {
  const currentPage = state.pages[state.currentPage];
  const { selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);

  currentPage.elements = {
    ...currentPage.elements,
    ...mapFilteredValues(currentPage.elements, ids, (element) => ({
      ...element,
      [key]: [...element[key], value],
    })),
  };
};
