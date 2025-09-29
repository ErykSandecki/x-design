// types
import { Theme } from 'types/enums/theme';

export type TContext = {
  scrollLock: boolean;
  setScrollLock: TFunc<[boolean]>;
  setTheme: TFunc<[Theme]>;
  theme: Theme;
};

export type TActionOnChangeTheme = (payload: Theme) => {
  payload;
  type: string;
};
