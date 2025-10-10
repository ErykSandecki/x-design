// types
import { TIconProps } from 'shared';
import { TObject } from './generic/object';

export type TKeyboardShortcut = string | { name: TIconProps['name'] };
export type TKeyboardShortcuts = Array<TKeyboardShortcut>;
export type TKeyboardShortcutsGroup = TObject<[TKeyboardShortcuts] | [TKeyboardShortcuts, TKeyboardShortcuts], any>;
