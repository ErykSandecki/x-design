// mocks
import { mockMatchMedia } from 'test/mocks/mockMatchMedia';

// others
import { THEME } from 'constant/localStorageKeys';

// types
import { Theme } from 'types/enums/theme';

// utils
import { getThemePreferences } from '../userPreferences';

describe('getThemePreferences', () => {
  it('Should return light theme from system preferences', () => {
    // before
    mockMatchMedia(false);

    // result
    expect(getThemePreferences()).toEqual(Theme.light);
  });

  it('Should return dark theme from system preferences', () => {
    // before
    mockMatchMedia(true);

    // result
    expect(getThemePreferences()).toEqual(Theme.dark);
  });

  it('Should return light theme from localStorage when dark is set in system preferences', () => {
    // mock
    localStorage.setItem(THEME, Theme.light);

    // before
    mockMatchMedia(true);

    // result
    expect(getThemePreferences()).toEqual(Theme.light);
  });

  it('Should return dark theme from localStorage when light is set in system preferences', () => {
    // mock
    localStorage.setItem(THEME, Theme.dark);

    // before
    mockMatchMedia(false);

    // result
    expect(getThemePreferences()).toEqual(Theme.dark);
  });
});
