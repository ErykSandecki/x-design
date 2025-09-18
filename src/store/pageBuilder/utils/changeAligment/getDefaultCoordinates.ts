// types
import {
  AlignmentHorizontal,
  AlignmentVertical,
  T2DCoordinates,
  TElement,
} from 'types';

export const getDefaultAligmnentAxisValue = (
  alignment:
    | TElement['alignment']['horizontal']
    | TElement['alignment']['vertical'],
  size: number,
): number => {
  switch (alignment) {
    case AlignmentHorizontal.center:
    case AlignmentVertical.center:
      return size / 2;
    case AlignmentHorizontal.left:
    case AlignmentVertical.top:
      return 0;
    case AlignmentHorizontal.right:
    case AlignmentVertical.bottom:
      return size;
    default:
      return 0;
  }
};

export const getOffset = (
  alignment:
    | TElement['alignment']['horizontal']
    | TElement['alignment']['vertical'],
  size: number,
) => {
  switch (alignment) {
    case AlignmentHorizontal.center:
    case AlignmentVertical.center:
      return size / 2;
    case AlignmentHorizontal.left:
    case AlignmentVertical.top:
      return 0;
    case AlignmentHorizontal.right:
    case AlignmentVertical.bottom:
      return size;
    default:
      return 0;
  }
};

export const getDefaultCoordinates = (
  alignment: TElement['alignment'],
  id: TElement['id'],
  parentId,
): T2DCoordinates => {
  const children = document.getElementById(id);
  const parent = document.getElementById(parentId);
  const childrenHeight = parseInt(getComputedStyle(children).height);
  const childrenWidth = parseInt(getComputedStyle(children).width);
  const parentHeight = parseInt(getComputedStyle(parent).height);
  const parentWidth = parseInt(getComputedStyle(parent).width);

  return {
    x:
      getDefaultAligmnentAxisValue(alignment.horizontal, parentWidth) -
      getOffset(alignment.horizontal, childrenWidth),
    y:
      getDefaultAligmnentAxisValue(alignment.vertical, parentHeight) -
      getOffset(alignment.vertical, childrenHeight),
  };
};
