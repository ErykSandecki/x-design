// others
import { REDUCER_KEY as ROUTER } from 'store/router/actionsType';

// types
import { RouterAction } from 'types/router/enums';
import { TRouterState } from 'store/router/types';

export const routerStateMock: Record<typeof ROUTER, TRouterState> = {
  [ROUTER]: {
    action: RouterAction.push,
    location: undefined,
    redirectTo: undefined,
  },
};
