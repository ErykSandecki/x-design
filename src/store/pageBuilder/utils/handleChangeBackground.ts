// types
import { TChangeBackgroundActionPayload, TPageBuilderState } from '../types';

export const handleChangeBackground = (
  { background, id, index }: TChangeBackgroundActionPayload,
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
        [id]: {
          ...state.pages[state.currentPage].elements[id],
          background: state.pages[state.currentPage].elements[id].background.map((value, i) =>
            index === i ? { ...value, ...background } : value,
          ),
        },
      },
    },
  },
});
