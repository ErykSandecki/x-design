import { cloneDeep } from 'lodash';

// others
import { MAX_LENGTH_HISTORY } from '../../constants';

// types
import { TAction } from 'types';
import { TReducerHistory, TPageBuilderState } from '../../types';

// utils
import { isRepeatedStateInHistory } from './isRepeatedStateInHistory';

export const handleReducerHistorySave = (
  state: TPageBuilderState,
  type: TAction['type'],
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { reducerHistoryIndex } = currentPage;

  const newReducerHistory: TReducerHistory = {
    areaCoordinates: cloneDeep(currentPage.areaCoordinates),
    elements: cloneDeep(currentPage.elements),
    selectedElements: cloneDeep(currentPage.selectedElements),
  };

  if (!isRepeatedStateInHistory(state, type)) {
    switch (true) {
      case reducerHistoryIndex !== 0:
        return {
          ...state,
          pages: {
            ...state.pages,
            [state.currentPage]: {
              ...currentPage,
              reducerHistory: [
                newReducerHistory,
                ...currentPage.reducerHistory.slice(reducerHistoryIndex),
              ],
              reducerHistoryIndex: 0,
            },
          },
        };
      case currentPage.reducerHistory.length === MAX_LENGTH_HISTORY:
        const reducedHistory = currentPage.reducerHistory.slice(0, -1);

        return {
          ...state,
          pages: {
            ...state.pages,
            [state.currentPage]: {
              ...currentPage,
              reducerHistory: [newReducerHistory, ...reducedHistory],
              reducerHistoryIndex: 0,
            },
          },
        };
      default:
        return {
          ...state,
          pages: {
            ...state.pages,
            [state.currentPage]: {
              ...currentPage,
              reducerHistory: [
                newReducerHistory,
                ...currentPage.reducerHistory,
              ],
              reducerHistoryIndex: 0,
            },
          },
        };
    }
  }

  return state;
};
