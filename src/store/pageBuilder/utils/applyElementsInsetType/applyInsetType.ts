// types
import { TApplyElementsSizeTypeActionPayload } from 'store/pageBuilder/types';
import { TElement, TBaseProperties, TInsets, TInsetsName, TValueExtended } from 'types';

export const applyInsetType = (
  element: TElement,
  inset: keyof TInsets,
  insetValue: TBaseProperties['value'],
  name: TInsetsName,
  type: TApplyElementsSizeTypeActionPayload['type'],
): TValueExtended => {
  switch (type) {
    default:
      return {
        ...element[name][inset],
        value: insetValue,
      };
  }
};
