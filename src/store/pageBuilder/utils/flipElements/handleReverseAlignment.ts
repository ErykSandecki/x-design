// types
import { AlignmentHorizontal, AlignmentVertical, TAlignment, TElement } from 'types';
import { TFlipElementsAction, TStrictAxis } from '../../types';

export const reverseAligment = (
  aligment: TElement['alignment'],
  axis: TFlipElementsAction['payload'],
): TElement['alignment'] => {
  if (aligment.horizontal || aligment.vertical) {
    let horizontal = aligment.horizontal;
    let vertical = aligment.vertical;

    if (axis === 'x' && aligment.horizontal && aligment.horizontal !== AlignmentHorizontal.center) {
      horizontal =
        aligment.horizontal === AlignmentHorizontal.left ? AlignmentHorizontal.right : AlignmentHorizontal.left;
    }

    if (axis === 'y' && aligment.vertical && aligment.vertical !== AlignmentVertical.center) {
      vertical = aligment.vertical === AlignmentVertical.top ? AlignmentVertical.bottom : AlignmentVertical.top;
    }

    return {
      horizontal,
      vertical,
    };
  }

  return aligment;
};

export const handleReverseAlignment = (axis: TStrictAxis, element: TElement): TAlignment => {
  if (axis.length === 2) {
    const reversedAlignment = reverseAligment(element.alignment, axis[0]);
    return reverseAligment(reversedAlignment, axis[1]);
  }

  return reverseAligment(element.alignment, axis[0]);
};
