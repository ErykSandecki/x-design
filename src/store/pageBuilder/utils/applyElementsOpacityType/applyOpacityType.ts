// types
import { TApplyElementsOpacityTypeAction } from 'store/pageBuilder/types';
import { TElement } from 'types';

export const applyOpacityType = (
  element: TElement,
  type: TApplyElementsOpacityTypeAction['payload'],
): TElement['opacity'] => {
  switch (type) {
    default:
      return {
        ...element.opacity,
        type,
      };
  }
};
