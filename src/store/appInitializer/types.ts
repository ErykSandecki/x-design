// types
import { Theme } from 'types';

export type TAppInitializerState = {
  isAppLoaded: boolean;
  isPending: boolean;
  language: string;
  theme: Theme;
};
