// types
import { TFlipElementsAction, TPageBuilderState } from '../types';

// utils
import { getFlippedElements } from './flipElements/getFlippedElements';

export const handleFlipElements = (
  axis: TFlipElementsAction['payload'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];

  return {
    ...state,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        elements: getFlippedElements(axis, state),
      },
    },
  };
};
