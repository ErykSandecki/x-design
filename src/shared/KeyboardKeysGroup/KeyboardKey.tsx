import { FC, Fragment } from 'react';
import { isObject } from 'lodash';

// components
import Icon, { TIconProps } from '../UI/components/Icon/Icon';

// types
import { TKeyboardShortcuts } from 'types';

export type TKeyboardKeysProps = Omit<TIconProps, 'name'> & {
  keyboardShortcuts: TKeyboardShortcuts;
};

export const KeyboardKeys: FC<TKeyboardKeysProps> = ({ keyboardShortcuts, ...restProps }) =>
  keyboardShortcuts.map((shortcut, index) =>
    isObject(shortcut) ? (
      <Icon key={index} name={shortcut.name} {...restProps} />
    ) : (
      <Fragment key={index}>{shortcut}</Fragment>
    ),
  );

export default KeyboardKeys;
