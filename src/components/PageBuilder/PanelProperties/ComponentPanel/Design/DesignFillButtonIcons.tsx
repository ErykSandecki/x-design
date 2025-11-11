import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// store
import { addVariant, changeProperties } from 'store/pageBuilder/actions';
import { isMixedBackgroundSelector } from 'store/pageBuilder/selectors';

// others
import { BACKGROUND } from 'constant/background';
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

const DesignFillButtonIcons: FC = () => {
  const action1 = (): any => changeProperties({ background: [BACKGROUND] });
  const action2 = (): any => addVariant('background', BACKGROUND);
  const dispatch = useDispatch();
  const isMixedBackground = useSelector(isMixedBackgroundSelector);
  const { t } = useTranslation();

  return [
    <UITools.ButtonIcon
      disabledSelection
      iconSize={14}
      key={0}
      name="Plus"
      onClick={() => dispatch(isMixedBackground ? action1() : action2())}
      tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.addFill`) }}
    />,
  ];
};

export default DesignFillButtonIcons;
