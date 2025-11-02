import { Dispatch } from 'redux';
import { ReactNode, useState } from 'react';
import { UseSelector } from 'react-redux';

// components
import PopoverBlendMode from './PopoverBlendMode/PopoverBlendMode';
import { UITools } from 'shared';

// others
import { PANEL_PROPERTIES_ID } from '../../../constants';
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// store
import { changeProperties } from 'store/pageBuilder/actions';
import { elementAttributeSelectorCreator, firstSelectedElementIdSelector } from 'store/pageBuilder/selectors';

const DesignAppearanceButtonIcons = (
  dispatch: Dispatch,
  isMixed: boolean,
  t: TT,
  useSelector: UseSelector,
): Array<ReactNode> => {
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const mixBlendMode = useSelector(elementAttributeSelectorCreator('mixBlendMode', firstElementId));
  const visible = useSelector(elementAttributeSelectorCreator('visible', firstElementId));
  const [currentMixBlendMode, setCurrentMixBlendMode] = useState(mixBlendMode);

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
      name={currentMixBlendMode === 'initial' ? 'DropEmpty' : 'DropFilled'}
      popoverAlignVertically={UITools.AlignPopoverVertically.top}
      popoverChildren={
        <PopoverBlendMode
          currentMixBlendMode={currentMixBlendMode}
          isMixed={isMixed}
          setCurrentMixBlendMode={setCurrentMixBlendMode}
        />
      }
      popoverOffset={{ x: -28, y: -28 }}
      popoverOnClose={() => dispatch(changeProperties({ mixBlendMode: currentMixBlendMode }))}
      tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.mixBlendMode`) }}
      selected={!visible}
    />,
  ];
};

export default DesignAppearanceButtonIcons;
