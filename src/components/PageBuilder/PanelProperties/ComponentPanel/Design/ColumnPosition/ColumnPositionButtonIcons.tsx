import { ReactNode } from 'react';

// components
import ConstrainsView from '../../../../shared/ConstrainsView/ConstrainsView';

// store
import { elementsSelector } from 'store/pageBuilder/selectors';

import { TSelectedElement } from 'store/pageBuilder/types';
import { UseSelector } from 'react-redux';

const ColumnPositionButtonIcons = (
  firstElement: TSelectedElement,
  showConstrains: boolean,
  useSelector: UseSelector,
): Array<ReactNode> => {
  const elements = useSelector(elementsSelector);

  return showConstrains ? [<ConstrainsView alignment={elements[firstElement.id].alignment} key={0} />] : [];
};

export default ColumnPositionButtonIcons;
