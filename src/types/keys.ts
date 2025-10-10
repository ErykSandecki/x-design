// types
import { KeyboardKeys } from './enums';
import { TObject } from './generic/object';
import { TKeyMap } from 'hooks';

export type TKeyboardSecondaryKey = KeyboardKeys;
export type TKeyboardShortcuts = {
  primaryKeys?: TKeyMap['primaryKeys'];
  secondaryKey: TKeyboardSecondaryKey;
};
export type TKeyboardShortcutsGroup = TObject<[TKeyboardShortcuts] | [TKeyboardShortcuts, TKeyboardShortcuts]>;
