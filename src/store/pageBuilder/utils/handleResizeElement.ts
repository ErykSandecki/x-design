// types
import { TPageBuilderState, TResizeElementActionPayload } from '../types';

// utils
import { getSizesCoordinates } from './getSizesCoordinates/getSizesCoordinates';

export const handleResizeElement = (
  baseCoordinates: TResizeElementActionPayload['baseCoordinates'],
  baseHeight: TResizeElementActionPayload['height'],
  baseWidth: TResizeElementActionPayload['width'],
  id: TResizeElementActionPayload['id'],
  mouseCoordinates: TResizeElementActionPayload['mouseCoordinates'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { position } = currentPage.elements[id];

  const { height, coordinates, width } = getSizesCoordinates(
    state.events.selectedAnchorResize,
    baseCoordinates,
    baseHeight as number,
    baseWidth as number,
    mouseCoordinates,
    position,
  );

  return {
    ...state,
    pages: {
      ...state.pages,
      [state.currentPage]: {
        ...currentPage,
        elements: {
          ...currentPage.elements,
          [id]: {
            ...currentPage.elements[id],
            coordinates,
            height,
            width,
          },
        },
      },
    },
  };
};
