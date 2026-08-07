import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

// others
import { DEFAULT_LANGUAGE } from 'translations';

// types
import { TAppInitializerState } from './types';

// utils
import { getThemePreferences } from 'utils';

const initialState: TAppInitializerState = {
  isAppLoaded: false,
  isPending: true,
  language: DEFAULT_LANGUAGE,
  theme: getThemePreferences(),
};

const handleInitLanguageSuccess = (state: TAppInitializerState, language: string): TAppInitializerState => ({
  ...state,
  language,
});

const handleSetIsAppLoaded = (state: TAppInitializerState, isAppLoaded: boolean): TAppInitializerState => ({
  ...state,
  isAppLoaded,
  isPending: false,
});

const handleSetTheme = (state: TAppInitializerState, theme: TAppInitializerState['theme']): TAppInitializerState => ({
  ...state,
  theme,
});

const appInitializerSlice = createSlice({
  initialState,
  name: 'appInitializer',
  reducers: {
    appInit: (state) => state,
    initLanguage: (state) => state,
    initLanguageSuccess: (state, action: PayloadAction<string>) =>
      handleInitLanguageSuccess(current(state) as TAppInitializerState, action.payload),
    setIsAppLoaded: (state, action: PayloadAction<boolean>) =>
      handleSetIsAppLoaded(current(state) as TAppInitializerState, action.payload),
    setTheme: (state, action: PayloadAction<TAppInitializerState['theme']>) =>
      handleSetTheme(current(state) as TAppInitializerState, action.payload),
  },
});

export const { appInit, initLanguage, initLanguageSuccess, setIsAppLoaded, setTheme } = appInitializerSlice.actions;
export const REDUCER_KEY = appInitializerSlice.name;
export default appInitializerSlice.reducer;
