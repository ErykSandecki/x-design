// types
import { TPageBuilderState } from '../../types';

export const handleReducerHistoryRedo = (state: TPageBuilderState): void => {
  const currentPage = state.pages[state.currentPage];
  const { reducerHistory } = currentPage;
  const reducerHistoryIndex = currentPage.reducerHistoryIndex - 1;
  const { areaCoordinates, elements, selectedElements } = reducerHistory[reducerHistoryIndex];

  currentPage.areaCoordinates = areaCoordinates;
  currentPage.elements = elements;
  currentPage.selectedElements = selectedElements;
  currentPage.reducerHistoryIndex = reducerHistoryIndex;
};
