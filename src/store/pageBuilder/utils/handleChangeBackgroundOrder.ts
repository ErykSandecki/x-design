// types
import { TElement } from 'types';
import { TChangeBackgroundOrderActionPayload, TPageBuilderState } from '../types';

// utils
import { extractObjectValues, mapFilteredValues } from 'utils';

export const changeOrder = (
  background: TElement['background'],
  draggableItem: TChangeBackgroundOrderActionPayload['draggableItem'],
  position: TChangeBackgroundOrderActionPayload['position'],
): TElement['background'] => {
  const clonedBackground = [...background];
  const [moved] = clonedBackground.splice(draggableItem, 1);
  clonedBackground.splice(position, 0, moved);

  return clonedBackground;
};

export const handleChangeBackgroundOrder = (
  { draggableItem, position }: TChangeBackgroundOrderActionPayload,
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);
  const events = {
    ...state.events,
    colorSampler: false,
  };

  return {
    ...state,
    events,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        elements: {
          ...currentPage.elements,
          ...mapFilteredValues(currentPage.elements, ids, (element) => ({
            ...element,
            background: changeOrder(element.background, draggableItem, position),
          })),
        },
      },
    },
  };
};
