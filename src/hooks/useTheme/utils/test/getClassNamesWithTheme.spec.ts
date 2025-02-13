// mocks
import {
  classNames,
  classNamesWithThemeDark,
  classNamesWithThemeLight,
} from '../../mock/classNames';

// types
import { Theme } from 'types/enums/theme';

// utils
import { getClassNamesWithTheme } from '../getClassNamesWithTheme';

describe('getClassNamesWithTheme', () => {
  it('should extend object by adding light mode', () => {
    // before
    const result = getClassNamesWithTheme(classNames, Theme.light);

    // result
    expect(result).toStrictEqual(classNamesWithThemeLight);
  });

  it('should extend object by adding dark mode', () => {
    // before
    const result = getClassNamesWithTheme(classNames, Theme.dark);

    // result
    expect(result).toStrictEqual(classNamesWithThemeDark);
  });
});
