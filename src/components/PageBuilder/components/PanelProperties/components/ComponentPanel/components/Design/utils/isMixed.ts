import { get } from 'lodash';

// types
import {
  TElementDynamicData,
  TElementsData,
  TSelectedElement,
  TSelectedElements,
} from 'store/pageBuilder/types';
import { TNestedKeyOf } from 'types';

export const isMixed = (
  dynamicData: TElementsData['dynamicData'],
  firstElement: TSelectedElement,
  key: TNestedKeyOf<TElementDynamicData>,
  selectedElements: TSelectedElements,
): boolean =>
  selectedElements.some(
    ({ id }) =>
      get(dynamicData[id], key) !== get(dynamicData[firstElement.id], key),
  );
