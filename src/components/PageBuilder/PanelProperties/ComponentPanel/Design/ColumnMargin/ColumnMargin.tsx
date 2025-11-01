import { FC } from 'react';
import { useSelector } from 'react-redux';

// components
import Insets from '../../../../shared/Insets/Insets';

// others
import { translationNameSpace } from './constants';

// store
import {
  elementAttributeSelectorCreator,
  firstSelectedElementIdSelector,
  isMixedSelectorCreator,
} from 'store/pageBuilder/selectors';

// utils
import { isBaseParent } from 'utils';

const ColumnMargin: FC = () => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const isMixedLayout = useSelector(isMixedSelectorCreator('layout.type'));
  const parentId = useSelector(elementAttributeSelectorCreator('parentId', firstElementId));

  if (isMixedLayout || isBaseParent(parentId)) {
    return null;
  }

  return <Insets insetsName="margin" translationNameSpace={translationNameSpace} />;
};

export default ColumnMargin;
