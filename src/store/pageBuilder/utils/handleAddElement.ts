import { pick } from 'lodash';

// types
import { TAddELementActionPayload, TPageBuilderState } from '../types';

export const handleAddElement = (
  element: TAddELementActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => {
  const index = 0;

  return {
    ...state,
    elements: {
      allData: {
        ...state.elements.allData,
        [element.id]: { ...element, index },
      },
      dynamicData: {
        ...state.elements.dynamicData,
        [element.id]: pick(
          element,
          'height',
          'id',
          'positionAbsolute',
          'positionRelative',
          'rotate',
          'width',
        ),
      },
      staticData: {
        ...state.elements.staticData,
        [element.id]: {
          ...pick(element, 'id', 'parentId', 'type'),
          index,
        },
      },
    },
  };
};
