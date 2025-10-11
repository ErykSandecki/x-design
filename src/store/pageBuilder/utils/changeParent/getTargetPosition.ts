// types
import { LayoutType, TElement } from 'types';
import { TEvents } from 'store/pageBuilder/types';

// utils
import { isBaseParent } from 'utils';

export const getTargetPosition = (
  parent: TElement,
  possibleParent: TEvents['possibleParent'],
): TElement['position'] => {
  switch (true) {
    case isBaseParent(possibleParent):
    case parent.layout.type === LayoutType.freeForm:
      return 'absolute';
    default:
      return 'relative';
  }
};
