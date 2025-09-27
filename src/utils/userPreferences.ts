// others
import { THEME } from 'constant/localStorageKeys';

// types
import { Theme } from 'types/enums/theme';

export const getThemePreferences = (): Theme => {
  const theme = localStorage.getItem(THEME) as Theme;

  if (theme) {
    return theme;
  }

  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.dark : Theme.light;
};
