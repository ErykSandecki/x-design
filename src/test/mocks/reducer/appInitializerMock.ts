// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// types
import { TPageBuilderState } from '../../../store/pageBuilder/types';

export const appInitializerStateMock: Record<
  typeof PAGE_BUILDER,
  TPageBuilderState
> = {
  [PAGE_BUILDER]: {
    isLoading: false,
    isPending: true,
  },
};
