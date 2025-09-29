import { size } from 'lodash';

// types
import { TElement } from 'types';
import { TElements, TPageBuilderState, TSelectedElements } from '../types';

export const getAllParents = (
  elements: TElements,
  id: TElement['id'],
  parent: Array<string> = [],
): Array<TElement['id']> =>
  elements[id].parentId === '-1'
    ? parent
    : getAllParents(elements, elements[id].parentId, [...parent, elements[id].parentId]);

export const filterSelectedElements = (
  selectedElements: TSelectedElements,
  state: TPageBuilderState,
): TSelectedElements => {
  const selectedElementsId = selectedElements.map(({ id }) => id);
  const { elements } = state.pages[state.currentPage];

  return size(selectedElements) === 1
    ? selectedElements
    : selectedElements.filter(({ id }) => {
        const parents = getAllParents(elements, id);
        const isParentSelected = parents.some((id) => selectedElementsId.includes(id));

        return !isParentSelected;
      });
};
