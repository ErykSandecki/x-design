import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

// components
import ConstrainsView from '../../../../../../../../shared/ConstrainsView/ConstrainsView';

// store
import { dynamicDataSelector } from 'store/pageBuilder/selectors';

import { TSelectedElement } from 'store/pageBuilder/types';

const ColumnPositionButtonIcons = (firstElement: TSelectedElement, showConstrains: boolean): Array<ReactNode> => {
  const dynamicData = useSelector(dynamicDataSelector);

  return showConstrains ? [<ConstrainsView alignment={dynamicData[firstElement.id].alignment} key={0} />] : [];
};

export default ColumnPositionButtonIcons;
