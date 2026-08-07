// types
import { TChangeBackgroundActionPayload, TPageBuilderState } from '../types';

// utils
import { extractObjectValues, isBaseParent, mapFilteredValues } from 'utils';

export const handleChangeBackground = (
  { background, id, index }: TChangeBackgroundActionPayload,
  state: TPageBuilderState,
): void => {
  const currentPage = state.pages[state.currentPage];
  const { selectedElements } = currentPage;
  const ids = extractObjectValues(selectedElements, ['id']);

  state.events.colorSampler = false;

  if (isBaseParent(id)) {
    currentPage.elements[id] = {
      ...currentPage.elements[id],
      background: currentPage.elements[id].background.map((value, i) =>
        index === i ? { ...value, ...background } : value,
      ),
    };

    return;
  }

  currentPage.elements = {
    ...currentPage.elements,
    ...mapFilteredValues(currentPage.elements, ids, (element) => ({
      ...element,
      background: element.background.map((value, i) => (index === i ? { ...value, ...background } : value)),
    })),
  };
};
