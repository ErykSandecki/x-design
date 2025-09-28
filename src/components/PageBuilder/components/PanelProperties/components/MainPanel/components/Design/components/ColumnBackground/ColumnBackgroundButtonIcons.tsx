import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import { UITools } from 'shared';

// store
import { changeBackground } from 'store/pageBuilder/actions';
import { pageBackgroundSelectorCreator } from 'store/pageBuilder/selectors';

const ColumnBackgroundButtonIcons = (): Array<ReactNode> => {
  const background = useSelector(pageBackgroundSelectorCreator('-1'));
  const dispatch = useDispatch();
  const { visible } = background;

  return [
    <UITools.ButtonIcon
      key={0}
      name={visible ? 'EyesOpened' : 'EyesClosed'}
      onClick={() => dispatch(changeBackground({ visible: !visible }, '-1'))}
    />,
  ];
};

export default ColumnBackgroundButtonIcons;
