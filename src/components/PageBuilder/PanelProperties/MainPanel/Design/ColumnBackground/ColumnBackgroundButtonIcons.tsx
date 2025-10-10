import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// store
import { changeBackground } from 'store/pageBuilder/actions';
import { pageBackgroundSelectorCreator } from 'store/pageBuilder/selectors';

const ColumnBackgroundButtonIcons = (): Array<ReactNode> => {
  const background = useSelector(pageBackgroundSelectorCreator('-1'));
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { visible } = background;

  return [
    <UITools.ButtonIcon
      key={0}
      name={visible ? 'EyesOpened' : 'EyesClosed'}
      onClick={() => dispatch(changeBackground({ visible: !visible }, '-1'))}
      tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.toggleVisibility`) }}
    />,
  ];
};

export default ColumnBackgroundButtonIcons;
