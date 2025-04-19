// others
import { BASE_2D } from 'shared';

// types
import { T2DCoordinates, TElement } from 'types';
import {
  TChangeParentActionPayload,
  TElementDynamicData,
  TElementsData,
  TElementStaticData,
  TEvents,
  TPageBuilderState,
} from '../../types';

// utils
import { findMainParent } from '../findMainParent';

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
    const currentPage = state.pages[state.currentPage];
    const mainParentId = findMainParent(
      currentParentId,
      currentPage.elements.staticData,
    );
    const parentCords =
      currentPage.elements.dynamicData[mainParentId].coordinates;
    const { z } = currentPage.areaCoordinates;
    const { x, y } = getOffsetXY(id, mainParentId);

    return { x: parentCords.x - x / z, y: parentCords.y - y / z };
  }

  return { x: 0, y: 0 };
};

export const getSizes = (
  element: Pick<TElement, 'height' | 'width'>,
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
    height: element.height,
    width: element.width,
  };
};

export const getPartialData = (
  element: TElement,
  id: TElement['id'],
  parentHasChanged: boolean,
  possibleParent: TEvents['possibleParent'],
  state: TPageBuilderState,
): Partial<TElement> => {
  const targetPosition = possibleParent === '-1' ? 'absolute' : 'relative';
  const sizes = getSizes(
    { height: element.height, width: element.width },
    id,
    possibleParent,
  );

  return {
    coordinates: parentHasChanged
      ? calculateCoordinates(element.parentId, id, possibleParent, state)
      : element.coordinates,
    height: parentHasChanged ? sizes.height : element.height,
    parentId: parentHasChanged ? possibleParent : element.parentId,
    position: parentHasChanged ? targetPosition : element.position,
    width: parentHasChanged ? sizes.width : element.width,
  };
};

export const reduceData = (
  data: Array<{
    allData: TElement;
    dynamicData: TElementDynamicData;
    staticData: TElementStaticData;
  }>,
): TElementsData =>
  data.reduce(
    (obj, data) => ({
      ...obj,
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

export const getMappedElementsToMove = (
  parentHasChanged: boolean,
  payload: TChangeParentActionPayload,
  state: TPageBuilderState,
): TElementsData => {
  const currentPage = state.pages[state.currentPage];
  const { elements } = currentPage;
  const { draggableElements, possibleParent } = payload;

  return reduceData(
    draggableElements.map((id) => {
      const data = getPartialData(
        elements.allData[id],
        id,
        parentHasChanged,
        possibleParent,
        state,
      );
      const shouldResetCoordinates = data.position === 'relative';

      return {
        ...currentPage.elements,
        allData: {
          ...elements.allData[id],
          coordinates: shouldResetCoordinates ? BASE_2D : data.coordinates,
          height: data.height,
          parentId: data.parentId,
          position: data.position,
          width: data.width,
        },
        dynamicData: {
          ...elements.dynamicData[id],
          coordinates: shouldResetCoordinates ? BASE_2D : data.coordinates,
          height: data.height,
          position: data.position,
          width: data.width,
        },
        staticData: {
          ...elements.staticData[id],
          parentId: data.parentId,
          position: data.position,
        },
      };
    }),
  );
};
