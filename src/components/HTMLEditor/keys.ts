import { isMacOs } from 'react-device-detect';

// types
export const CONTROL = isMacOs ? '⌘' : 'Ctrl';
export const SHIFT = isMacOs ? '⇧' : 'Shift';
