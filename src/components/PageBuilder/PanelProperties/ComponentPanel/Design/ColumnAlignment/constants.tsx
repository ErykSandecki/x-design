//
import { KeyboardKeysGroup } from 'shared';

// others
import { KEYBOARD_SHORTCUTS } from 'pages/PageBuilderPage/keys';
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';
import { translationNameSpace as parentNameSpace } from '../constants';

// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';
import { TAligmentHorizontalButtonGroup, TAligmentVerticalButtonGoup } from './types';

export const HORIZONTAL_BUTTONS: TAligmentHorizontalButtonGroup = [
  {
    key: AlignmentHorizontal.left,
    name: 'AlignHorizontalLeft',
    tooltip: {
      content: (
        <KeyboardKeysGroup
          keyboardShortcutsGroup={KEYBOARD_SHORTCUTS.alignHorizontalLeft}
          title={`${TOOLTIP_TRANSLATION_KEY}.alignHorizontalLeft`}
        />
      ),
    },
  },
  {
    key: AlignmentHorizontal.center,
    name: 'AlignHorizontalCenter',
    tooltip: {
      content: (
        <KeyboardKeysGroup
          keyboardShortcutsGroup={KEYBOARD_SHORTCUTS.alignHorizontalCenter}
          title={`${TOOLTIP_TRANSLATION_KEY}.alignHorizontalCenter`}
        />
      ),
    },
  },
  {
    key: AlignmentHorizontal.right,
    name: 'AlignHorizontalRight',
    tooltip: {
      content: (
        <KeyboardKeysGroup
          keyboardShortcutsGroup={KEYBOARD_SHORTCUTS.alignHorizontalRight}
          title={`${TOOLTIP_TRANSLATION_KEY}.alignHorizontalRight`}
        />
      ),
    },
  },
];

export const VERTICAL_BUTTONS: TAligmentVerticalButtonGoup = [
  {
    key: AlignmentVertical.top,
    name: 'AlignVerticalTop',
    tooltip: {
      content: (
        <KeyboardKeysGroup
          keyboardShortcutsGroup={KEYBOARD_SHORTCUTS.alignVerticalTop}
          title={`${TOOLTIP_TRANSLATION_KEY}.alignVerticalTop`}
        />
      ),
    },
  },
  {
    key: AlignmentVertical.center,
    name: 'AlignVerticalCenter',
    tooltip: {
      content: (
        <KeyboardKeysGroup
          keyboardShortcutsGroup={KEYBOARD_SHORTCUTS.alignVerticalCenter}
          title={`${TOOLTIP_TRANSLATION_KEY}.alignVerticalCenter`}
        />
      ),
    },
  },
  {
    key: AlignmentVertical.bottom,
    name: 'AlignVerticalBottom',
    tooltip: {
      content: (
        <KeyboardKeysGroup
          keyboardShortcutsGroup={KEYBOARD_SHORTCUTS.alignVerticalBottom}
          title={`${TOOLTIP_TRANSLATION_KEY}.alignVerticalBottom`}
        />
      ),
    },
  },
];

export const translationNameSpace = `${parentNameSpace}.columnAlignment`;
