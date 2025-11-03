import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import { KeyboardKeysGroup, UITools } from 'shared';

// others
import { KEYBOARD_SHORTCUTS } from 'pages/PageBuilderPage/keys';
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// store
import { fitLayout } from 'store/pageBuilder/actions';

// types
import { LayoutType } from 'types';
import {
  elementAttributeSelectorCreator,
  firstSelectedElementIdSelector,
  isMixedSelectorCreator,
} from 'store/pageBuilder/selectors';

export type TDesignLayoutButtonIconsProps = {
  onChangeLayoutType: TFunc;
};

const DesignLayoutButtonIcons: FC<TDesignLayoutButtonIconsProps> = ({ onChangeLayoutType }) => {
  const dispatch = useDispatch();
  const firstElementId = useSelector(firstSelectedElementIdSelector);
  const layoutType = useSelector(elementAttributeSelectorCreator('layout', firstElementId)).type;
  const isFlexible = layoutType !== LayoutType.freeForm;
  const isMixedLayoutType = useSelector(isMixedSelectorCreator('layout.type'));
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
