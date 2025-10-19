/* istanbul ignore file */
import { keys } from 'lodash';

// types
import { TObject } from 'types';

// utils
import { generateID } from 'utils/common/generateID';
import { isBaseParent } from 'utils/common/isBaseParent';
import { isJestRunning } from './isJestRunning';

export const generateJestID = (elements: TObject<any>): string => {
  if (isJestRunning()) {
    const ids = keys(elements)
      .filter((id) => !isBaseParent(id))
      .map(parseInt);

    if (ids.length) {
      return `test-${(Math.max(...ids) + 1).toString()}`;
    }

    return 'test-1';
  }

  return generateID();
};
