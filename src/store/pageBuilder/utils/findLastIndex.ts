import { last, pickBy } from 'lodash';

// types
import { Sort, TElement, TObject } from 'types';
import { TElementStaticData } from '../types';

// utils
import { objectToArray, sortNumbersByObject } from 'utils';

export const findLastIndex = (
  parentId: TElement['parentId'],
  staticData: TObject<TElementStaticData>,
): number => {
  const filteredStaticData = pickBy(
    staticData,
    (data) => data.parentId === parentId,
  );

  return (
    last(
      sortNumbersByObject(
        objectToArray(filteredStaticData),
        'index',
        Sort.ascent,
      ),
    )?.index + 1 || 0
  );
};
