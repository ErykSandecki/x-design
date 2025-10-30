// types
import { TApplyElementsSizeTypeActionPaylad } from 'store/pageBuilder/types';
import { TElement, TInsetProperties, TInsets, TInsetsName } from 'types';

export const applyInsetType = (
  element: TElement,
  inset: keyof TInsets,
  insetValue: TInsetProperties['value'],
  name: TInsetsName,
  type: TApplyElementsSizeTypeActionPaylad['type'],
): TInsetProperties => {
  switch (type) {
    default:
      return {
        ...element[name][inset],
        value: insetValue,
      };
  }
};
