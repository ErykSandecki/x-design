import { pick } from 'lodash';

// types
import { TElement } from 'types';
import { TPageBuilderState } from '../types';

export const handleAddElement = (
  element: TElement,
  state: TPageBuilderState,
): TPageBuilderState => ({
  ...state,
  elements: {
    dynamicData: [
      ...state.elements.dynamicData,
      pick(
        element,
        'height',
        'id',
        'positionAbsolute',
        'positionRelative',
        'rotate',
        'width',
      ),
    ],
    staticData: [
      ...state.elements.staticData,
      pick(element, 'id', 'parentId', 'type'),
    ],
  },
});
