import { isMacOs } from 'react-device-detect';

export const ALT = isMacOs ? '⌥' : 'Alt';
export const CONTROL = isMacOs ? '⌘' : 'Ctrl';
export const SHIFT = isMacOs ? '⇧' : 'Shift';
