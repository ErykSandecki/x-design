import { isObject, mapValues } from 'lodash';

// types
import { Theme } from 'types/enums/theme';
import { TObject } from 'types/generic';
import { TThemeModificator } from '../types';

const getClassNameWithTheme = (
  className: string,
  theme: Theme,
): TThemeModificator => {
  const name = className;

  return theme === Theme.dark
    ? { name, [Theme.dark]: `${className}--dark` }
    : { name, [Theme.light]: `${className}--light` };
};

export const getClassNamesWithTheme = <T extends {}>(
  classNames: T,
  theme: Theme,
): T | any =>
  mapValues(classNames, (className: TObject<string> | string): T | any => {
    if (isObject(className)) {
      return getClassNamesWithTheme(className, theme);
    }

    return getClassNameWithTheme(className, theme);
  });
