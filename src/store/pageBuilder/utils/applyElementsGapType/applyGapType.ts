// types
import { TApplyElementsSizeTypeActionPayload } from 'store/pageBuilder/types';
import { TElement, TGap, TGapProperties } from 'types';

export const applyGapType = (
  element: TElement,
  gap: keyof TGap,
  gapValue: TGapProperties['value'],
  type: TApplyElementsSizeTypeActionPayload['type'],
): TGapProperties => {
  switch (type) {
    default:
      return {
        ...element.layout.gap[gap],
        value: gapValue,
      };
  }
};
