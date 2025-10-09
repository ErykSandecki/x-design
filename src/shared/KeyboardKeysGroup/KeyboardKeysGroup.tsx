import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import KeyboardKeys, { TKeyboardKeysProps } from './KeyboardKey';

// others
import { translationNameSpace } from './constants';

// types
import { TKeyboardShortcutsGroup } from 'types';

export type TKeyboardKeysGroupProps = Omit<TKeyboardKeysProps, 'keyboardShortcuts'> & {
  keyboardShortcutsGroup: TExtractInnerArray<TKeyboardShortcutsGroup>;
};

export const KeyboardKeysGroup: FC<TKeyboardKeysGroupProps> = ({ keyboardShortcutsGroup, ...restProps }) => {
  const { t } = useTranslation();

  if (keyboardShortcutsGroup.length === 1) {
    return <KeyboardKeys keyboardShortcuts={keyboardShortcutsGroup[0]} {...restProps} />;
  }

  return (
    <>
      <KeyboardKeys keyboardShortcuts={keyboardShortcutsGroup[0]} {...restProps} />
      {t(`${translationNameSpace}.optional`)}
      <KeyboardKeys keyboardShortcuts={keyboardShortcutsGroup[1]} {...restProps} />
    </>
  );
};

export default KeyboardKeysGroup;
