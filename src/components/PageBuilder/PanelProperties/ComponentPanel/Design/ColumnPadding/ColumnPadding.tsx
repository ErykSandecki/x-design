import { FC } from 'react';
import { useSelector } from 'react-redux';

// components
import Insets from '../../../../shared/Insets/Insets';

// others
import { translationNameSpace } from './constants';

// store
import {
  elementAttributeNestedSelectorCreator,
  firstSelectedElementIdSelector,
  isMixedSelectorCreator,
} from 'store/pageBuilder/selectors';

// types
import { LayoutType } from 'types';

const ColumnPadding: FC = () => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const isMixedLayout = useSelector(isMixedSelectorCreator('layout.type'));
  const layoutType = useSelector(elementAttributeNestedSelectorCreator<LayoutType>('layout.type', firstElementId));

  if (layoutType === LayoutType.freeForm || isMixedLayout) {
    return null;
  }

  return <Insets insetsName="padding" translationNameSpace={translationNameSpace} />;
};

export default ColumnPadding;
