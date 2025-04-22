// types
import { TPageBuilderState, TSetElementSizesActionPayload } from '../types';

// utils
import { getSizesCoordinates } from './getSizesCoordinates/getSizesCoordinates';

export const handleSetElementSizes = (
  baseCoordinates: TSetElementSizesActionPayload['baseCoordinates'],
  baseHeight: TSetElementSizesActionPayload['height'],
  baseWidth: TSetElementSizesActionPayload['width'],
  id: TSetElementSizesActionPayload['id'],
  mouseCoordinates: TSetElementSizesActionPayload['mouseCoordinates'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const currentPage = state.pages[state.currentPage];
  const { position } = currentPage.elements.allData[id];
  const { height, coordinates, width } = getSizesCoordinates(
    state.events.selectedAnchor,
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
          allData: {
            ...currentPage.elements.allData,
            [id]: {
              ...currentPage.elements.allData[id],
              coordinates,
              height,
              width,
            },
          },
          dynamicData: {
            ...currentPage.elements.dynamicData,
            [id]: {
              ...currentPage.elements.dynamicData[id],
              coordinates,
              height,
              width,
            },
          },
        },
      },
    },
  };
};
