import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

// components
import ConstrainsView from '../../../../../../../shared/ConstrainsView/ConstrainsView';

// store
import { elementsSelector } from 'store/pageBuilder/selectors';

import { TSelectedElement } from 'store/pageBuilder/types';

const ColumnPositionButtonIcons = (firstElement: TSelectedElement, showConstrains: boolean): Array<ReactNode> => {
  const elements = useSelector(elementsSelector);

  return showConstrains ? [<ConstrainsView alignment={elements[firstElement.id].alignment} key={0} />] : [];
};

export default ColumnPositionButtonIcons;
