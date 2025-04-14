import cx from 'classnames';
import { camelCase } from 'lodash';

// types
import { Theme } from 'types/enums/theme';
import { TObject } from '../../../types';
import {
  TThemeClassNamesApplier,
  TThemeClassNamesApplierArgs,
  TThemeModificator,
  TThemeModificatorConditional,
} from '../types';

// utils
import { isJestRunning, isTypeGuard } from 'utils';

export const transformKey = (name): string =>
  /* istanbul ignore next */
  isJestRunning() ? name : camelCase(name);

export const getModificator = (
  styles: TObject<string>,
  theme: Theme,
  themeModificator: TThemeModificator,
): string =>
  cx(
    styles[transformKey(themeModificator.name)],
    styles[transformKey(themeModificator[theme])],
  );

export const getModificatorConditional = (
  styles: TObject<string>,
  theme: Theme,
  themeModificator: TThemeModificatorConditional,
): string => {
  const [modificator, condition] = themeModificator;

  if (typeof modificator === 'string') {
    return condition ? modificator : '';
  }

  return condition ? getModificator(styles, theme, modificator) : '';
};

export const themeClassNamesApplier =
  (styles: TObject<string>, theme: Theme): TThemeClassNamesApplier =>
  (...args: TThemeClassNamesApplierArgs): string =>
    args
      .map((themeModificator) => {
        type T1 = TThemeModificatorConditional;
        type T2 = TThemeModificator;

        switch (true) {
          case isTypeGuard<T1>(themeModificator, ['0', '1']):
            return getModificatorConditional(styles, theme, themeModificator);
          case isTypeGuard<T2>(themeModificator, ['name']):
            return getModificator(styles, theme, themeModificator);
          default:
            return cx(themeModificator);
        }
      })
      .filter(Boolean)
      .join(' ');
