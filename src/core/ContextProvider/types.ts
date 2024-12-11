// types
import { Theme } from 'types/enums';

export type TContext = {
  scrollLock: boolean;
  setScrollLock: (scrollLock: boolean) => void;
  setTheme: (theme: Theme) => void;
  theme: Theme;
};

export type TActionOnChangeTheme = (payload: Theme) => {
  payload;
  type: string;
};
