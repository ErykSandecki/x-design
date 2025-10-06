// types
import { AlignmentHorizontal, AlignmentVertical, TElement } from 'types';
import { TFlipElementsAction } from '../../types';

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
