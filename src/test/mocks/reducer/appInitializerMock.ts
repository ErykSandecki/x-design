// others
import { DEFAULT_LANGUAGE } from 'translations/constants';

// types
import { REDUCER_KEY as APP_INITIALIZER } from 'store/appInitializer/actionsType';
import { TAppInitializerState } from '../../../store/appInitializer/types';
import { Theme } from 'types/enums';

export const appInitializerStateMock: Record<
  typeof APP_INITIALIZER,
  TAppInitializerState
> = {
  [APP_INITIALIZER]: {
    isAppLoaded: false,
    isPending: true,
    language: DEFAULT_LANGUAGE,
    theme: Theme.light,
  },
};
