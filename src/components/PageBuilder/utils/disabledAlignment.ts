import { first } from 'lodash';

// store
import {
  areParentsTheSameSelector,
  elementDataSelectorCreator,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';
import { store } from 'store';

// utils
import { isBaseParent } from 'utils';

export const disabledAlignment = (): boolean => {
  const state = store.getState();
  const areParentsTheSame = areParentsTheSameSelector(state);
  const selectedElements = selectedElementsSelector(state);

  if (selectedElements.length) {
    const firstElement = first(selectedElements);
    const element = elementDataSelectorCreator(firstElement.id)(state);
    const baseParent = isBaseParent(element.parentId);
    const isRelative = element.position === 'relative';

    return baseParent || isRelative || !areParentsTheSame;
  }

  return true;
};
