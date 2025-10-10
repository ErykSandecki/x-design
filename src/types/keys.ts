// types
import { TObject } from './generic/object';

export type TKeyboardShortcut = string;
export type TKeyboardShortcuts = Array<TKeyboardShortcut>;
export type TKeyboardShortcutsGroup = TObject<[TKeyboardShortcuts] | [TKeyboardShortcuts, TKeyboardShortcuts], any>;
