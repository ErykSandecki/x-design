/* istanbul ignore file */
import { keys } from 'lodash';

// types
import { TObject } from 'types';

// utils
import { generateID } from 'utils/common/generateID';
import { isBaseParent } from 'utils/common/isBaseParent';
import { isVitestRunning } from './isVitestRunning';

export const generateVitestID = (elements: TObject<any>): string => {
  if (isVitestRunning()) {
    const ids = keys(elements)
      .filter((id) => !isBaseParent(id))
      .map((id) => parseInt(id.split('-')[1]));

    if (ids.length) {
      return `test-${(Math.max(...ids) + 1).toString()}`;
    }

    return 'test-1';
  }

  return generateID();
};
