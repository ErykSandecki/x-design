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
  title?: string;
};

export const KeyboardKeysGroup: FC<TKeyboardKeysGroupProps> = ({ keyboardShortcutsGroup, title, ...restProps }) => {
  const { t } = useTranslation();
  const translatedTitle = title ? t(title) : '';

  if (keyboardShortcutsGroup.length === 1) {
    return (
      <>
        {translatedTitle} <KeyboardKeys keyboardShortcuts={keyboardShortcutsGroup[0]} {...restProps} />
      </>
    );
  }

  return (
    <>
      {translatedTitle}
      <KeyboardKeys keyboardShortcuts={keyboardShortcutsGroup[0]} {...restProps} />
      {t(`${translationNameSpace}.optional`)}
      <KeyboardKeys keyboardShortcuts={keyboardShortcutsGroup[1]} {...restProps} />
    </>
  );
};

export default KeyboardKeysGroup;
