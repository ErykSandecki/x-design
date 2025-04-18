import { pick } from 'lodash';

// types
import { TAddELementActionPayload, TPageBuilderState } from '../types';

export const handleAddElement = (
  element: TAddELementActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => ({
  ...state,
  elements: {
    ...state.elements,
    allData: {
      ...state.elements.allData,
      [element.id]: { ...element },
      '-1': {
        ...state.elements.allData['-1'],
        children: [...state.elements.allData['-1'].children, element.id],
      },
    },
    dynamicData: {
      ...state.elements.dynamicData,
      [element.id]: pick(
        element,
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
      ...state.elements.staticData,
      [element.id]: {
        ...pick(element, 'children', 'id', 'parentId', 'position', 'type'),
      },
      '-1': {
        ...state.elements.staticData['-1'],
        children: [...state.elements.staticData['-1'].children, element.id],
      },
    },
  },
});
