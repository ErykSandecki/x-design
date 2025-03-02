// others
import { DEFAULT_LANGUAGE } from 'translations';
import { REDUCER_KEY as APP_INITIALIZER } from 'store/appInitializer/actionsType';

// types
import { TAppInitializerState } from '../../../store/appInitializer/types';
import { Theme } from 'types';

export const pageBuilderStateMock: Record<
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
