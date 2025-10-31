import { FC } from 'react';
import { first } from 'lodash';
import { useSelector } from 'react-redux';

// components
import Insets from '../../../../shared/Insets/Insets';

// others
import { translationNameSpace } from './constants';

// store
import { elementDataSelectorCreator, elementsSelector, selectedElementsSelector } from 'store/pageBuilder/selectors';

// utils
import { isBaseParent } from 'utils';
import { isMixed } from '../../../../utils/isMixed';

const ColumnMargin: FC = () => {
  const elements = useSelector(elementsSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementDataSelectorCreator(firstElement.id));
  const isMixedLayout = isMixed(elements, firstElement, 'layout.type', selectedElements);

  if (isMixedLayout || isBaseParent(element.parentId)) {
    return null;
  }

  return <Insets insetsName="margin" translationNameSpace={translationNameSpace} />;
};

export default ColumnMargin;
