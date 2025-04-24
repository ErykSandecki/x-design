// types
import { TPageBuilderState } from '../../types';

export const handleReducerHistoryRedo = (
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { reducerHistory } = currentPage;
  const reducerHistoryIndex = currentPage.reducerHistoryIndex - 1;

  return {
    ...state,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        ...reducerHistory[reducerHistoryIndex],
        reducerHistoryIndex,
      },
    },
  };
};
