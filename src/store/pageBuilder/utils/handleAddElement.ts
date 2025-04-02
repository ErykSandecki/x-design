import { max, pick } from 'lodash';

// types
import { TAddELementActionPayload, TPageBuilderState } from '../types';

// utils
import { objectToArray } from 'utils';

export const findIndex = (
  element: TAddELementActionPayload,
  state: TPageBuilderState,
): number =>
  max(
    objectToArray(state.elements.allData)
      .filter(({ parentId }) => element.parentId === parentId)
      .map(({ index }) => index),
  ) + 1 || 0;

export const handleAddElement = (
  element: TAddELementActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => {
  const index = findIndex(element, state);

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
          'position',
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
