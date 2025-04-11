// types
import { TPageBuilderState, TSetElementSizesActionPayload } from '../types';

// utils
import { getSizesCoordinates } from './getSizesCoordinates';

export const handleSetElementSizes = (
  baseCoordinates: TSetElementSizesActionPayload['baseCoordinates'],
  baseHeight: TSetElementSizesActionPayload['height'],
  baseWidth: TSetElementSizesActionPayload['width'],
  id: TSetElementSizesActionPayload['id'],
  mouseCoordinates: TSetElementSizesActionPayload['mouseCoordinates'],
  state: TPageBuilderState,
): TPageBuilderState => {
  const {
    height,
    coordinates: position,
    width,
  } = getSizesCoordinates(
    state.events.selectedAnchor,
    baseCoordinates,
    baseHeight as number,
    baseWidth as number,
    mouseCoordinates,
  );

  return {
    ...state,
    elements: {
      ...state.elements,
      allData: {
        ...state.elements.allData,
        [id]: {
          ...state.elements.allData[id],
          coordinates: position,
          height,
          width,
        },
      },
      dynamicData: {
        ...state.elements.dynamicData,
        [id]: {
          ...state.elements.dynamicData[id],
          coordinates: position,
          height,
          width,
        },
      },
    },
  };
};
