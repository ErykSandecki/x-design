// types
import { TChangeLayoutGridActionPayload, TPageBuilderState } from '../../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';
import { getCorrectChildren } from './getCorrectChildren';
import { getCorrectGrid } from './getCorrectGrid';

export const handleChangeLayoutGrid = (cell: TChangeLayoutGridActionPayload, state: TPageBuilderState): void => {
  const currentPage = state.pages[state.currentPage];
  const { selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);

  currentPage.elements = {
    ...currentPage.elements,
    ...mapFilteredValues(currentPage.elements, ids, (element) => {
      const grid = getCorrectGrid(cell, element);

      return {
        ...element,
        children: getCorrectChildren(element.children, grid),
        layout: {
          ...element.layout,
          grid,
        },
      };
    }),
  };
};
