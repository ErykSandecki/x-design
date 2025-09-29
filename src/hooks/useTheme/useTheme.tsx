import { useContext, useLayoutEffect, useMemo, useState } from 'react';

// core
import { Context } from 'core';

// types
import { Theme } from 'types/enums/theme';
import { TObject } from 'types';
import { TThemeClassNames, TThemeClassNamesApplier } from './types';

// utils
import { getClassNamesWithTheme } from './utils/getClassNamesWithTheme';
import { themeClassNamesApplier } from './utils/themeClassNamesApplier';

export type TUseTheme<T> = {
  classNamesWithTheme: TThemeClassNames<T>;
  cx: TThemeClassNamesApplier;
  forceUpdateClassNames: TFunc;
  theme: Theme;
};

export const useTheme = <T,>(classNames: T, styles: TObject<string>): TUseTheme<T> => {
  const { theme } = useContext(Context);
  const [classNamesWithTheme, setClassNamesWithTheme] = useState(getClassNamesWithTheme(classNames, theme));
  const cx = useMemo(() => themeClassNamesApplier(styles, theme), [classNamesWithTheme, styles, theme]);

  const updateClassNames = (): void => {
    const classNamesWithTheme = getClassNamesWithTheme(classNames, theme);

    setClassNamesWithTheme(classNamesWithTheme);
  };

  useLayoutEffect(() => {
    updateClassNames();
  }, [theme]);

  return {
    classNamesWithTheme,
    cx,
    forceUpdateClassNames: updateClassNames,
    theme,
  };
};
