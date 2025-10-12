// others
import { BASE_2D } from 'shared';

// types
import { LayoutType } from 'types';
import { TAddELementActionPayload, TPageBuilderState } from '../types';

export const handleAddElement = (element: TAddELementActionPayload, state: TPageBuilderState): TPageBuilderState => {
  const children = { id: element.id, type: element.type };
  const currentPage = state.pages[state.currentPage];
  const parent = currentPage.elements[element.parentId];
  const isFreeForm = parent.layout.type === LayoutType.freeForm;

  return {
    ...state,
    events: { ...state.events, possibleElement: undefined },
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        elements: {
          ...currentPage.elements,
          [element.parentId]: {
            ...currentPage.elements[element.parentId],
            children: [...currentPage.elements[element.parentId].children, children],
          },
          [element.id]: {
            ...element,
            coordinates: isFreeForm ? element.coordinates : BASE_2D,
            deepLevel: currentPage.elements[element.parentId].deepLevel + 1,
            position: isFreeForm ? 'absolute' : 'relative',
          },
        },
      },
    },
  };
};
