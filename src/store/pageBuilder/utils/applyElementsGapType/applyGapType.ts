// types
import { TApplyElementsSizeTypeActionPayload } from 'store/pageBuilder/types';
import { TElement, TGap, TValue } from 'types';

export const applyGapType = (
  element: TElement,
  gap: keyof TGap,
  gapValue: TValue['value'],
  type: TApplyElementsSizeTypeActionPayload['type'],
): TValue => {
  switch (type) {
    default:
      return {
        ...element.layout.gap[gap],
        value: gapValue,
      };
  }
};
