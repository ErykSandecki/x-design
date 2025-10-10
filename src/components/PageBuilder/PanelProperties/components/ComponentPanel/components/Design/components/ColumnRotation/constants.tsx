import { Dispatch } from 'redux';

// components
import { KeyboardKeysGroup } from 'shared';

// others
import { KEYBOARD_SHORTCUTS } from 'pages/PageBuilderPage/keys';
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';
import { translationNameSpace as parentNameSpace } from '../../constants';

// store
import { flipElements, rotateElements } from 'store/pageBuilder/actions';

// types
import { TButtonGroup } from 'shared/UITools/ButtonGroup/types';
import { TElement } from 'types';

// utils
import { normalizeAngle } from 'utils';

export const translationNameSpace = `${parentNameSpace}.columnRotation`;

export const OPTIONS_BUTTONS = (angle: TElement['angle'], dispatch: Dispatch, t: TT): Array<TButtonGroup> => [
  {
    name: 'ToggleRotate',
    onClick: () => dispatch(rotateElements(normalizeAngle(angle + 90))),
    tooltip: { autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.rotationNext90`) },
  },
  {
    name: 'FlipHorizontal',
    onClick: () => dispatch(flipElements('x')),
    tooltip: {
      autoPositioning: true,
      content: (
        <KeyboardKeysGroup
          keyboardShortcutsGroup={KEYBOARD_SHORTCUTS.flipHorizontal}
          title={`${TOOLTIP_TRANSLATION_KEY}.flipHorizontal`}
        />
      ),
    },
  },
  {
    name: 'FlipVertical',
    onClick: () => dispatch(flipElements('y')),
    tooltip: {
      autoPositioning: true,
      content: (
        <KeyboardKeysGroup
          keyboardShortcutsGroup={KEYBOARD_SHORTCUTS.flipVertical}
          title={`${TOOLTIP_TRANSLATION_KEY}.flipVertical`}
        />
      ),
    },
  },
];
