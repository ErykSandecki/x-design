// types
import { TApplyElementsSizeTypeActionPaylad } from 'store/pageBuilder/types';
import { TElement, TGap, TGapProperties } from 'types';

export const applyGapType = (
  element: TElement,
  gap: keyof TGap,
  gapValue: TGapProperties['value'],
  type: TApplyElementsSizeTypeActionPaylad['type'],
): TGapProperties => {
  switch (type) {
    default:
      return {
        ...element.layout.gap[gap],
        value: gapValue,
      };
  }
};
