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
  x: T2DCoordinates['x'],
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
        left: `${x}px`,
        translateX: '0',
      };
  }
};

export const getVerticalPosition = (
  aligment: TElement['alignment'],
  y: T2DCoordinates['y'],
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
        top: `${y}px`,
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
  const { translateX, ...horizontal } = getHorizontalPosition(alignment, x);
  const { translateY, ...vertical } = getVerticalPosition(alignment, y);

  return {
    ...horizontal,
    ...vertical,
    transform: `rotate(${rotate}deg) translate(${translateX}, ${translateY})`,
  };
};
