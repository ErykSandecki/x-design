// types
import { TElements, TPage } from 'store/pageBuilder/types';

// utils
import { extractObjectValues, mapFilteredValues, objectToArray } from 'utils';
import { findAllChildren } from '../findAllChildren';

export const getMappedNestedChildren = (currentPage: TPage, parents: TElements): TElements => {
  const parrentsArray = objectToArray(parents);
  const parentsIds = extractObjectValues(parrentsArray, ['id']);
  const parentsData = extractObjectValues(parrentsArray, ['id', 'type']);
  const nestedChildren = findAllChildren(currentPage.elements, parentsData);
  const filteredNestedChildren = nestedChildren.filter(({ id }) => !parentsIds.includes(id));
  const nextedChildrenIds = extractObjectValues(filteredNestedChildren, ['id']);

  return mapFilteredValues(currentPage.elements, nextedChildrenIds, (element) => ({
    ...element,
    deepLevel: parents[element.parentId].deepLevel + 1,
  }));
};
