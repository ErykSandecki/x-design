import { pick } from 'lodash';

// types
import { TAddELementActionPayload, TPageBuilderState } from '../types';

export const handleAddElement = (
  element: TAddELementActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => ({
  ...state,
  pages: {
    ...state.pages,
    [state.currentPage]: {
      ...state.pages[state.currentPage],
      elements: {
        ...state.pages[state.currentPage].elements,
        allData: {
          ...state.pages[state.currentPage].elements.allData,
          [element.id]: { ...element },
          '-1': {
            ...state.pages[state.currentPage].elements.allData['-1'],
            children: [
              ...state.pages[state.currentPage].elements.allData['-1'].children,
              element.id,
            ],
          },
        },
        dynamicData: {
          ...state.pages[state.currentPage].elements.dynamicData,
          [element.id]: pick(
            element,
            'alignment',
            'background',
            'coordinates',
            'height',
            'id',
            'position',
            'rotate',
            'width',
          ),
        },
        staticData: {
          ...state.pages[state.currentPage].elements.staticData,
          [element.id]: {
            ...pick(element, 'children', 'id', 'parentId', 'position', 'type'),
          },
          '-1': {
            ...state.pages[state.currentPage].elements.staticData['-1'],
            children: [
              ...state.pages[state.currentPage].elements.staticData['-1']
                .children,
              element.id,
            ],
          },
        },
      },
    },
  },
});
