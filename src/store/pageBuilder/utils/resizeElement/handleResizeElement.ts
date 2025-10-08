// types
import { TPageBuilderState, TResizeElementActionPayload } from '../../types';

// utils
import { getSizesCoordinates } from './getSizesCoordinates';

export const handleResizeElement = (
  baseCoordinates: TResizeElementActionPayload['baseCoordinates'],
  baseFlip: TResizeElementActionPayload['flip'],
  baseHeight: TResizeElementActionPayload['height'],
  baseWidth: TResizeElementActionPayload['width'],
  id: TResizeElementActionPayload['id'],
  mouseCoordinates: TResizeElementActionPayload['mouseCoordinates'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const element = currentPage.elements[id];
  const { aspectRatio, position } = currentPage.elements[id];

  const { height, coordinates, width } = getSizesCoordinates(
    state.events.selectedAnchorResize,
    aspectRatio,
    baseCoordinates,
    baseFlip,
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
            ...element,
            coordinates,
            height: {
              ...element.height,
              ...height,
            },
            width: {
              ...element.width,
              ...width,
            },
          },
        },
      },
    },
  };
};
