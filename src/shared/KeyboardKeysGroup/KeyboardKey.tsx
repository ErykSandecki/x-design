import { FC, Fragment } from 'react';

// types
import { TKeyboardShortcuts } from 'types';

export type TKeyboardKeysProps = {
  keyboardShortcuts: TKeyboardShortcuts;
};

export const KeyboardKeys: FC<TKeyboardKeysProps> = ({ keyboardShortcuts }) =>
  keyboardShortcuts.map((shortcut, index) => <Fragment key={index}>{shortcut}</Fragment>);

export default KeyboardKeys;
