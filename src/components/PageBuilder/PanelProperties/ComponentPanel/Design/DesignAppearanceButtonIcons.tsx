import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import PopoverBlendMode from './PopoverBlendMode/PopoverBlendMode';
import { UITools } from 'shared';

// others
import { PANEL_PROPERTIES_ID } from '../../../constants';
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// store
import { changeProperties } from 'store/pageBuilder/actions';
import {
  elementAttributeSelectorCreator,
  firstSelectedElementIdSelector,
  isMixedSelectorCreator,
} from 'store/pageBuilder/selectors';

const DesignAppearanceButtonIcons: FC = () => {
  const dispatch = useDispatch();
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const isMixed = useSelector(isMixedSelectorCreator('mixBlendMode'));
  const mixBlendMode = useSelector(elementAttributeSelectorCreator('mixBlendMode', firstElementId));
  const visible = useSelector(elementAttributeSelectorCreator('visible', firstElementId));
  const { t } = useTranslation();

  return [
    <UITools.ButtonIcon
      key={0}
      name={visible ? 'EyesOpened' : 'EyesClosed'}
      onClick={() => dispatch(changeProperties({ visible: !visible }))}
      tooltip={{ content: t(`${TOOLTIP_TRANSLATION_KEY}.appearance.${visible ? 'hide' : 'show'}`) }}
      selected={!visible}
    />,
    <UITools.ButtonIcon
      idContainer={PANEL_PROPERTIES_ID}
      key={1}
      name={mixBlendMode === 'initial' ? 'DropEmpty' : 'DropFilled'}
      popoverAlignVertically={UITools.AlignPopoverVertically.top}
      popoverChildren={<PopoverBlendMode isMixed={isMixed} mixdBlendMode={mixBlendMode} />}
      popoverOffset={{ x: -28, y: -28 }}
      tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.mixBlendMode`) }}
      selected={!visible}
    />,
  ];
};

export default DesignAppearanceButtonIcons;
