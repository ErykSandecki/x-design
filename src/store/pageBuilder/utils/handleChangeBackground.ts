// types
import { TChangeBackgroundActionPayload, TPageBuilderState } from '../types';

export const handleChangeBackground = (
  payload: TChangeBackgroundActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => ({
  ...state,
  events: {
    ...state.events,
    colorSampler: false,
  },
  pages: {
    ...state.pages,
    [state.currentPage]: {
      ...state.pages[state.currentPage],
      elements: {
        ...state.pages[state.currentPage].elements,
        [payload.id]: {
          ...state.pages[state.currentPage].elements[payload.id],
          background: {
            ...state.pages[state.currentPage].elements[payload.id].background,
            ...payload.background,
          },
        },
      },
    },
  },
});
