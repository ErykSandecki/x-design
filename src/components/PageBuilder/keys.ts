// others
import { ALT, CONTROL, SHIFT } from 'constant/mainKeys';

// types
import { TKeyboardShortcutsGroup } from 'types';

export const KEYBOARD_SHORTCUTS: TKeyboardShortcutsGroup = {
  alignHorizontalCenter: [[ALT, 'H']],
  alignHorizontalLeft: [[ALT, 'A']],
  alignHorizontalRight: [[ALT, 'D']],
  alignVerticalBottom: [[ALT, 'S']],
  alignVerticalCenter: [[ALT, 'V']],
  alignVerticalTop: [[ALT, 'W']],
  flipHorizontal: [[SHIFT, 'H']],
  flipVertical: [[SHIFT, 'V']],
  resizeToFit: [[ALT, SHIFT, CONTROL, 'R']],
  toggleAutoLayout: [[SHIFT, 'A']],
};
