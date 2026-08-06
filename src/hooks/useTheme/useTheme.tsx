import { useContext } from 'react';

// core
import { Context, TContext } from 'core';

// types
import { Theme } from 'types/enums/theme';

export type TUseTheme = Pick<TContext, 'setTheme' | 'theme'> & {
  toggleTheme: () => void;
};

export const useTheme = (): TUseTheme => {
  const { setTheme, theme } = useContext(Context);

  const toggleTheme = (): void => setTheme(theme === Theme.dark ? Theme.light : Theme.dark);

  return { setTheme, theme, toggleTheme };
};
