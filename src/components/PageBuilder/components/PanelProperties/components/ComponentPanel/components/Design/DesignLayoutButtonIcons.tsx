import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';

// components
import { KeyboardKeysGroup, UITools } from 'shared';

// others
import { KEYBOARD_SHORTCUTS } from 'pages/PageBuilderPage/keys';
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// store
import { fitLayout } from 'store/pageBuilder/actions';

// types
import { LayoutType } from 'types';

const DesignLayoutButtonIcons = (
  isMixedLayoutType: boolean,
  layoutType: LayoutType,
  onChangeLayoutType: TFunc,
): Array<ReactNode> => {
  const dispatch = useDispatch();
  const isFlexible = layoutType !== LayoutType.freeForm;
  const isSelected = !isMixedLayoutType && isFlexible;

  return [
    <UITools.ButtonIcon
      key={0}
      name="FitLayout"
      onClick={() => dispatch(fitLayout())}
      selected={false}
      tooltip={{
        autoPositioning: true,
        content: (
          <KeyboardKeysGroup
            keyboardShortcutsGroup={KEYBOARD_SHORTCUTS.resizeToFit}
            title={`${TOOLTIP_TRANSLATION_KEY}.resizeToFit`}
          />
        ),
      }}
    />,
    <UITools.ButtonIcon
      key={1}
      name="AutoLayout"
      onClick={onChangeLayoutType}
      selected={isSelected}
      tooltip={{
        autoPositioning: true,
        content: (
          <KeyboardKeysGroup
            keyboardShortcutsGroup={KEYBOARD_SHORTCUTS.toggleAutoLayout}
            title={`${TOOLTIP_TRANSLATION_KEY}.toggleAutoLayout`}
          />
        ),
      }}
    />,
  ];
};

export default DesignLayoutButtonIcons;
