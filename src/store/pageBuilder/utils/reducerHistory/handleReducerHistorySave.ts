import { cloneDeep } from 'lodash';

// others
import { MAX_LENGTH_HISTORY } from '../../constants';

// types
import { TAction } from 'types';
import { TReducerHistory, TPageBuilderState } from '../../types';

// utils
import { isRepeatedStateInHistory } from './isRepeatedStateInHistory';

export const handleReducerHistorySave = (state: TPageBuilderState, type: TAction['type']): void => {
  const currentPage = state.pages[state.currentPage];
  const { reducerHistoryIndex } = currentPage;

  const newReducerHistory: TReducerHistory = {
    areaCoordinates: cloneDeep(currentPage.areaCoordinates),
    elements: cloneDeep(currentPage.elements),
    selectedElements: cloneDeep(currentPage.selectedElements),
  };

  if (isRepeatedStateInHistory(state, type)) {
    return;
  }

  switch (true) {
    case reducerHistoryIndex !== 0:
      currentPage.reducerHistory = [newReducerHistory, ...currentPage.reducerHistory.slice(reducerHistoryIndex)];
      break;
    case currentPage.reducerHistory.length === MAX_LENGTH_HISTORY: {
      const reducedHistory = currentPage.reducerHistory.slice(0, -1);

      currentPage.reducerHistory = [newReducerHistory, ...reducedHistory];
      break;
    }
    default:
      currentPage.reducerHistory = [newReducerHistory, ...currentPage.reducerHistory];
  }

  currentPage.reducerHistoryIndex = 0;
};
