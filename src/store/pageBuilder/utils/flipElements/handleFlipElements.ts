// types
import { TFlipElementsActionPayload, TPageBuilderState } from '../../types';

// utils
import { getFlippedElements } from './getFlippedElements';

export const handleFlipElements = (axis: TFlipElementsActionPayload, state: TPageBuilderState): void => {
  const currentPage = state.pages[state.currentPage];

  currentPage.elements = {
    ...currentPage.elements,
    ...getFlippedElements([axis], currentPage.elements, true, currentPage.selectedElements),
  };
};
