// others
import { BASE_2D } from 'shared';

// types
import { T2DCoordinates, TElement } from 'types';
import { TElementsData, TEvents, TPageBuilderState } from '../types';

// utils
import { findMainParent } from './findMainParent';

export const getOffsetXY = (
  childrenId: TElement['id'],
  parentId: TElement['parentId'],
): T2DCoordinates => {
  const { top: parentTop, left: parentLeft } = document
    .getElementById(parentId)
    .getBoundingClientRect();
  const { top: childrenTop, left: childrenLeft } = document
    .getElementById(childrenId)
    .getBoundingClientRect();

  return {
    x: parentLeft - childrenLeft,
    y: parentTop - childrenTop,
  };
};

export const calculateCoordinates = (
  currentParentId: TElement['parentId'],
  id: TElement['id'],
  possibleParent: TElement['parentId'],
  state: TPageBuilderState,
): T2DCoordinates => {
  if (possibleParent === '-1') {
    const mainParentId = findMainParent(
      currentParentId,
      state.elements.staticData,
    );
    const parentCords = state.elements.dynamicData[mainParentId].coordinates;
    const { x, y } = getOffsetXY(id, mainParentId);

    return { x: parentCords.x - x, y: parentCords.y - y };
  }

  return { x: 0, y: 0 };
};

export const getSizes = (
  id: TElement['id'],
  possibleParent: TElement['parentId'],
): Pick<TElement, 'height' | 'width'> => {
  if (possibleParent === '-1') {
    const element = document.getElementById(id);
    const height = parseInt(getComputedStyle(element).height);
    const width = parseInt(getComputedStyle(element).width);

    return { height, width };
  }

  return {
    height: 'auto',
    width: 'auto',
  };
};

export const getMappedDraggableElements = (
  elements: TElementsData,
  draggableElements: TEvents['draggableElements'],
  possibleParent: TEvents['possibleParent'],
  state: TPageBuilderState,
): TElementsData =>
  draggableElements
    .map((id, index) => {
      const element = elements.allData[id];
      const parentHasChanged = element.parentId !== possibleParent;
      const targetPosition = possibleParent === '-1' ? 'absolute' : 'relative';
      const data = {
        coordinates: parentHasChanged
          ? calculateCoordinates(element.parentId, id, possibleParent, state)
          : element.coordinates,
        index: parentHasChanged ? index : element.index,
        parentId: parentHasChanged ? possibleParent : element.parentId,
        position: parentHasChanged ? targetPosition : element.position,
      };

      return {
        allData: {
          ...elements.allData[id],
          coordinates:
            data.position === 'relative' ? BASE_2D : data.coordinates,
          index: data.index,
          parentId: data.parentId,
          position: data.position,
        },
        dynamicData: {
          ...elements.dynamicData[id],
          coordinates:
            data.position === 'relative' ? BASE_2D : data.coordinates,
          position: data.position,
        },
        staticData: {
          ...elements.staticData[id],
          index: data.index,
          parentId: data.parentId,
        },
      };
    })
    .reduce(
      (obj, data) => ({
        allData: { ...obj.allData, [data.allData.id]: data.allData },
        dynamicData: {
          ...obj.dynamicData,
          [data.dynamicData.id]: data.dynamicData,
        },
        staticData: {
          ...obj.staticData,
          [data.staticData.id]: data.staticData,
        },
      }),
      {
        allData: {},
        dynamicData: {},
        staticData: {},
      },
    );

export const handleChangeParent = (
  state: TPageBuilderState,
): TPageBuilderState => {
  const { elements, events } = state;
  const { draggableElements, possibleParent } = events;

  const mappedDraggableElements = getMappedDraggableElements(
    elements,
    draggableElements,
    possibleParent,
    state,
  );

  return {
    ...state,
    elements: {
      allData: {
        ...state.elements.allData,
        ...mappedDraggableElements.allData,
      },
      dynamicData: {
        ...state.elements.dynamicData,
        ...mappedDraggableElements.dynamicData,
      },
      staticData: {
        ...state.elements.staticData,
        ...mappedDraggableElements.staticData,
      },
    },
    events: {
      ...state.events,
      draggableElements: [],
      possibleParent: '-1',
    },
    selectedElements: possibleParent === '-1' ? state.selectedElements : {},
  };
};
