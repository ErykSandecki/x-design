import { size } from 'lodash';

// types
import { TElement } from 'types';
import { TElementsData, TPageBuilderState, TSelectedElements } from '../types';

export const getAllParents = (
  allData: TElementsData['allData'],
  id: TElement['id'],
  parent: Array<string> = [],
): Array<TElement['id']> =>
  allData[id].parentId === '-1'
    ? parent
    : getAllParents(allData, allData[id].parentId, [...parent, allData[id].parentId]);

export const filterSelectedElements = (
  selectedElements: TSelectedElements,
  state: TPageBuilderState,
): TSelectedElements => {
  const selectedElementsId = selectedElements.map(({ id }) => id);
  const { allData } = state.pages[state.currentPage].elements;

  return size(selectedElements) === 1
    ? selectedElements
    : selectedElements.filter(({ id }) => {
        const parents = getAllParents(allData, id);
        const isParentSelected = parents.some((id) => selectedElementsId.includes(id));

        return !isParentSelected;
      });
};
