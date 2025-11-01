import { ReactNode } from 'react';

// components
import ConstrainsView from '../../../../shared/ConstrainsView/ConstrainsView';

// store
import { elementAttributeSelectorCreator, firstSelectedElementIdSelector } from 'store/pageBuilder/selectors';

import { UseSelector } from 'react-redux';

const ColumnPositionButtonIcons = (showConstrains: boolean, useSelector: UseSelector): Array<ReactNode> => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const alignment = useSelector(elementAttributeSelectorCreator('alignment', firstElementId));

  return showConstrains ? [<ConstrainsView alignment={alignment} key={0} />] : [];
};

export default ColumnPositionButtonIcons;
