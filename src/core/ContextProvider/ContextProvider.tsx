import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { noop } from 'lodash';
import { useDispatch } from 'react-redux';

// others
import { THEME } from 'constant/localStorageKeys';

// types
import { TActionOnChangeTheme, TContext } from './types';
import { Theme } from 'types/enums/theme';

// utils
import { getThemePreferences } from 'utils';

export type TContextProviderProps = {
  actionOnChangeTheme?: TActionOnChangeTheme;
  children: ReactNode;
  scrollLock?: boolean;
  theme?: Theme;
};

const defaultState = {
  scrollLock: false,
  setScrollLock: noop,
  setTheme: (theme: Theme): void => localStorage.setItem(THEME, theme),
  theme: getThemePreferences(),
};

export const Context: React.Context<TContext> = createContext(defaultState);

export const ContextProvider: FC<TContextProviderProps> = ({
  actionOnChangeTheme,
  children,
  scrollLock: defaultScrollLock = false,
  theme: defaultTheme = undefined,
}) => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(defaultTheme || defaultState.theme);
  const [scrollLock, setScrollLock] = useState(defaultScrollLock);

  const setScrollLockHandler = (scrollLock: boolean): void => {
    defaultState.setScrollLock(scrollLock);
    setScrollLock(scrollLock);
  };

  const setThemeHandler = (theme: Theme): void => {
    defaultState.setTheme(theme);
    setTheme(theme);

    if (actionOnChangeTheme) {
      dispatch(actionOnChangeTheme(theme));
    }
  };

  useEffect(() => {
    document.body.className = `body--${theme}`;
    document.body.style.colorScheme = theme;
  }, [theme]);

  return (
    <Context.Provider
      value={{
        scrollLock,
        setScrollLock: setScrollLockHandler,
        setTheme: setThemeHandler,
        theme,
      }}
    >
      {children}
    </Context.Provider>
  );
};
