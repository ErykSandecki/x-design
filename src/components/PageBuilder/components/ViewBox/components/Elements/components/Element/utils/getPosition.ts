import { CSSProperties } from 'react';

// types
import { AlignmentHorizontal, AlignmentVertical, TElement } from 'types';

export const getHorizontalPosition = (
  aligment: TElement['alignment'],
  x: T2DCoordinates['x'],
): {
  left?: string;
  originX: string;
  right?: string;
  translateX: string;
} => {
  switch (aligment.horizontal) {
    case AlignmentHorizontal.center:
      return {
        left: '50%',
        originX: '0',
        translateX: '-50%',
      };
    case AlignmentHorizontal.left:
      return {
        left: '0',
        originX: 'center',
        translateX: '0',
      };
    case AlignmentHorizontal.right:
      return {
        originX: 'center',
        right: '0',
        translateX: '0',
      };
    default:
      return {
        left: `${x}px`,
        originX: 'center',
        translateX: '0',
      };
  }
};

export const getVerticalPosition = (
  aligment: TElement['alignment'],
  y: T2DCoordinates['y'],
): {
  bottom?: string;
  originY: string;
  top?: string;
  translateY: string;
} => {
  switch (aligment.vertical) {
    case AlignmentVertical.bottom:
      return {
        bottom: '0',
        originY: 'center',
        translateY: '0',
      };
    case AlignmentVertical.center:
      return {
        originY: '0',
        top: '50%',
        translateY: '-50%',
      };
    case AlignmentVertical.top:
      return {
        originY: 'center',
        top: '0',
        translateY: '0',
      };
    default:
      return {
        originY: 'center',
        top: `${y}px`,
        translateY: '0',
      };
  }
};

export const getPosition = (
  alignment: TElement['alignment'],
  angle: number,
  x: T2DCoordinates['x'],
  y: T2DCoordinates['y'],
): CSSProperties => {
  const { originX, translateX, ...horizontal } = getHorizontalPosition(alignment, x);
  const { originY, translateY, ...vertical } = getVerticalPosition(alignment, y);

  return {
    ...horizontal,
    ...vertical,
    transform: `rotate(${angle}deg) translate(${translateX}, ${translateY})`,
    transformOrigin: `${originX} ${originY}`,
  };
};
