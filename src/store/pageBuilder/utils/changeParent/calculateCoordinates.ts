// others
import { BASE_2D } from 'shared';

// types
import { LayoutType, TElement } from 'types';
import { TPage, TPageBuilderState } from '../../types';

// utils
import { findMainParent } from '../findMainParent';
import { getOffsetXY } from '../getOffsetXY';

export const calculateCoordinatesWhenBaseParent = (
  currentPage: TPage,
  currentParentId: TElement['parentId'],
  id: TElement['id'],
): T2DCoordinates => {
  const mainParentId = findMainParent(currentParentId, currentPage.elements);
  const parentCords = currentPage.elements[mainParentId].coordinates;
  const { z } = currentPage.areaCoordinates;
  const { x, y } = getOffsetXY(id, mainParentId);

  return {
    x: Math.floor(parentCords.x - x / z),
    y: Math.floor(parentCords.y - y / z),
  };
};

export const calculateCoordinatesWhenParentFreeForm = (
  currentPage: TPage,
  id: TElement['id'],
  possibleParent: TElement['parentId'],
): T2DCoordinates => {
  const { z } = currentPage.areaCoordinates;
  const { x, y } = getOffsetXY(id, possibleParent);

  return {
    x: Math.floor(Math.abs(x) / z),
    y: Math.floor(Math.abs(y) / z),
  };
};

export const calculateCoordinates = (
  currentParentId: TElement['parentId'],
  id: TElement['id'],
  possibleParent: TElement['parentId'],
  state: TPageBuilderState,
): T2DCoordinates => {
  const currentPage = state.pages[state.currentPage];
  const possibleParentData = currentPage.elements[possibleParent];

  switch (true) {
    case possibleParent === '-1':
      return calculateCoordinatesWhenBaseParent(currentPage, currentParentId, id);
    case possibleParentData.layout.type === LayoutType.freeForm:
      return calculateCoordinatesWhenParentFreeForm(currentPage, id, possibleParent);
    default:
      return BASE_2D;
  }
};
