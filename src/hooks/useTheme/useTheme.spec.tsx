import { renderHook } from '@testing-library/react';
import { useContext } from 'react';

// hooks
import { useTheme } from './useTheme';

// mocks
import {
  classNames,
  classNamesWithThemeDark,
  classNamesWithThemeLight,
} from './mock/classNames';

// types
import { Theme } from 'types/enums/theme';

jest.mock('react', () => ({
  ...(jest.requireActual('react') as object),
  useContext: jest.fn(),
}));

describe('useTheme', () => {
  it(`should append light theme modificator for every className`, () => {
    // mock
    (useContext as jest.Mock).mockImplementation(() => ({
      theme: Theme.light,
    }));

    // before
    const { result } = renderHook(() => useTheme(classNames, {}));

    // action
    result.current.forceUpdateClassNames();

    // result
    expect(result.current.classNamesWithTheme).toEqual(
      classNamesWithThemeLight,
    );
  });

  it(`should append dark theme modificator for every className`, () => {
    // mock
    (useContext as jest.Mock).mockImplementation(() => ({
      theme: Theme.dark,
    }));

    // before
    const { result } = renderHook(() => useTheme(classNames, {}));

    // action
    result.current.forceUpdateClassNames();

    // result
    expect(result.current.classNamesWithTheme).toEqual(classNamesWithThemeDark);
  });
});
