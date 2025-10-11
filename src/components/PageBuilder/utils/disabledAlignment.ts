import { first } from 'lodash';

// store
import {
  areParentsTheSameSelector,
  elementDataSelectorCreator,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { LayoutType } from 'types';

// utils
import { isBaseParent } from 'utils';

export const disabledAlignment = (): boolean => {
  const state = store.getState();
  const areParentsTheSame = areParentsTheSameSelector(state);
  const selectedElements = selectedElementsSelector(state);

  if (selectedElements.length) {
    const firstElement = first(selectedElements);
    const element = elementDataSelectorCreator(firstElement.id)(state);
    const parent = elementDataSelectorCreator(element.parentId)(state);
    const baseParent = isBaseParent(element.parentId);
    const isFreeForm = parent.layout.type === LayoutType.freeForm;
    const isRelative = element.position === 'relative';

    return baseParent || isRelative || isFreeForm || !areParentsTheSame;
  }

  return true;
};
