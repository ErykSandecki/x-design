import { CSSProperties } from 'react';

// types
import {
  AlignmentHorizontal,
  AlignmentVertical,
  T2DCoordinates,
  TElement,
} from 'types';

export const getHorizontalPosition = (
  aligment: TElement['alignment'],
): {
  left?: string;
  right?: string;
  translateX: string;
} => {
  switch (aligment.horizontal) {
    case AlignmentHorizontal.center:
      return {
        left: '50%',
        translateX: '-50%',
      };
    case AlignmentHorizontal.left:
      return {
        left: '0',
        translateX: '0',
      };
    case AlignmentHorizontal.right:
      return {
        right: '0',
        translateX: '0',
      };

    default:
      return {
        translateX: '0',
      };
  }
};

export const getVerticalPosition = (
  aligment: TElement['alignment'],
): {
  bottom?: string;
  top?: string;
  translateY: string;
} => {
  switch (aligment.vertical) {
    case AlignmentVertical.bottom:
      return {
        bottom: '0',
        translateY: '0',
      };
    case AlignmentVertical.center:
      return {
        top: '50%',
        translateY: '-50%',
      };
    case AlignmentVertical.top:
      return {
        top: '0',
        translateY: '0',
      };

    default:
      return {
        translateY: '0',
      };
  }
};

export const getPosition = (
  alignment: TElement['alignment'],
  rotate: number,
  x: T2DCoordinates['x'],
  y: T2DCoordinates['y'],
): CSSProperties => {
  if (alignment) {
    const { translateX, ...restHorizontal } = getHorizontalPosition(alignment);
    const { translateY, ...restVertical } = getVerticalPosition(alignment);

    return {
      ...restHorizontal,
      ...restVertical,
      transform: `rotate(${rotate}deg) translate(${translateX}, ${translateY})`,
    };
  }

  return {
    left: `${x}px`,
    top: `${y}px`,
  };
};
