// others
import { BASE_2D } from 'shared';

// types
import { LayoutType } from 'types';
import { TAddELementActionPayload, TPageBuilderState } from '../types';

export const handleAddElement = (element: TAddELementActionPayload, state: TPageBuilderState): void => {
  const children = { id: element.id, type: element.type };
  const currentPage = state.pages[state.currentPage];
  const parent = currentPage.elements[element.parentId];
  const isFreeForm = parent.layout.type === LayoutType.freeForm;
  const deepLevel = parent.deepLevel + 1;

  currentPage.elements[element.parentId] = {
    ...parent,
    children: [...parent.children, children],
  };
  currentPage.elements[element.id] = {
    ...element,
    coordinates: isFreeForm ? element.coordinates : BASE_2D,
    deepLevel,
    position: isFreeForm ? 'absolute' : 'relative',
  };
  state.events.possibleElement = undefined;
};
