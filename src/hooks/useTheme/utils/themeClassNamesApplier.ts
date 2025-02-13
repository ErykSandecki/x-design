import cx from 'classnames';

// types
import { Theme } from 'types/enums/theme';
import { TObject } from '../../../types/generic';
import {
  TThemeClassNamesApplier,
  TThemeClassNamesApplierArgs,
  TThemeModificator,
  TThemeModificatorConditional,
} from '../types';

// utils
import { isTypeGuard } from '../../../utils/ts/guards';
import { camelCase } from 'lodash';

export const getModificator = (
  styles: TObject<string>,
  theme: Theme,
  themeModificator: TThemeModificator,
): string =>
  cx(
    styles[camelCase(themeModificator.name)],
    styles[camelCase(themeModificator[theme])],
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
