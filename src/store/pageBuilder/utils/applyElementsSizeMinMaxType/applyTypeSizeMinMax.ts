// types
import { TApplyElementsSizeMinMaxTypeActionPayload } from 'store/pageBuilder/types';
import { TElement, TSize, Unit } from 'types';

export const applyTypeSizeMinMax = (
  element: TElement,
  scoreType: TApplyElementsSizeMinMaxTypeActionPayload['scoreType'],
  size: number,
  sizeType: TApplyElementsSizeMinMaxTypeActionPayload['sizeType'],
  type: TApplyElementsSizeMinMaxTypeActionPayload['type'],
): TSize => {
  switch (type) {
    case 'auto':
      return {
        ...element[sizeType][scoreType],
        type: 'auto',
        unit: undefined,
        value: 'auto',
      };
    case 'fixed':
      return {
        ...element[sizeType][scoreType],
        type: 'fixed',
        unit: undefined,
        value: size,
      };
    default:
      return {
        ...element[sizeType][scoreType],
        unit: Unit.percentage,
        value: size,
      };
  }
};
