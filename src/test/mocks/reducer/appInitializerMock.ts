// others
import { REDUCER_KEY as APP_INITIALIZER } from 'store/appInitializer/actionsType';

// types
import { TAppInitializerState } from 'store/appInitializer/types';
import { Theme } from 'types';

export const appInitializerStateMock: Record<
  typeof APP_INITIALIZER,
  TAppInitializerState
> = {
  [APP_INITIALIZER]: {
    isAppLoaded: true,
    isPending: true,
    language: 'en',
    theme: Theme.light,
  },
};
