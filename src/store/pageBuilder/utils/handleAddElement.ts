// types
import { TAddELementActionPayload, TPageBuilderState } from '../types';

export const handleAddElement = (element: TAddELementActionPayload, state: TPageBuilderState): TPageBuilderState => {
  const children = { id: element.id, type: element.type };
  const currentPage = state.pages[state.currentPage];

  return {
    ...state,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        elements: {
          ...currentPage.elements,
          '-1': {
            ...currentPage.elements['-1'],
            children: [...currentPage.elements['-1'].children, children],
          },
          [element.id]: element,
        },
      },
    },
  };
};
