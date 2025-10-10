// others
import { CONTROL } from 'constant/constants';

// types
import { KeyboardKeys, TKeyboardShortcutsGroup } from 'types';

export const KEYBOARD_SHORTCUTS: TKeyboardShortcutsGroup = {
  alignHorizontalCenter: [{ primaryKeys: ['alt'], secondaryKey: KeyboardKeys.h }],
  alignHorizontalLeft: [{ primaryKeys: ['alt'], secondaryKey: KeyboardKeys.a }],
  alignHorizontalRight: [{ primaryKeys: ['alt'], secondaryKey: KeyboardKeys.d }],
  alignVerticalBottom: [{ primaryKeys: ['alt'], secondaryKey: KeyboardKeys.s }],
  alignVerticalCenter: [{ primaryKeys: ['alt'], secondaryKey: KeyboardKeys.v }],
  alignVerticalTop: [{ primaryKeys: ['alt'], secondaryKey: KeyboardKeys.w }],
  flipHorizontal: [{ primaryKeys: ['shift'], secondaryKey: KeyboardKeys.h }],
  flipVertical: [{ primaryKeys: ['shift'], secondaryKey: KeyboardKeys.v }],
  resizeToFit: [{ primaryKeys: ['alt', CONTROL, 'shift'], secondaryKey: KeyboardKeys.r }],
  toggleAutoLayout: [{ primaryKeys: ['shift'], secondaryKey: KeyboardKeys.a }],
};
