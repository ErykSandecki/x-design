// types
import { TApplyElementsOpacityTypeAction } from 'store/pageBuilder/types';
import { TElement } from 'types';

export const applyOpacityType = (
  element: TElement,
  mode: TApplyElementsOpacityTypeAction['payload'],
): TElement['opacity'] => {
  switch (mode) {
    default:
      return {
        ...element.opacity,
        mode,
      };
  }
};
