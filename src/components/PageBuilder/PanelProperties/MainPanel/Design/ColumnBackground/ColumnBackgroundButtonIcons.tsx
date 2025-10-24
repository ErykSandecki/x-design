import { Dispatch } from 'redux';
import { ReactNode } from 'react';
import { UseSelector } from 'react-redux';

// components
import { UITools } from 'shared';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// store
import { changeBackground } from 'store/pageBuilder/actions';
import { pageBackgroundSelectorCreator } from 'store/pageBuilder/selectors';

const ColumnBackgroundButtonIcons = (dispatch: Dispatch, t: TT, useSelector: UseSelector): Array<ReactNode> => {
  const background = useSelector(pageBackgroundSelectorCreator('-1'));
  const { visible } = background;

  return [
    <UITools.ButtonIcon
      e2eValue="toggle-visibility"
      key={0}
      name={visible ? 'EyesOpened' : 'EyesClosed'}
      onClick={() => dispatch(changeBackground({ visible: !visible }, '-1'))}
      tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.toggleVisibility`) }}
    />,
  ];
};

export default ColumnBackgroundButtonIcons;
