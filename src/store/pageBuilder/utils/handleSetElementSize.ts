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
  const { height, positionAbsolute, width } = getSizesCoordinates(
    state.events.selectedAnchor,
    baseCoordinates,
    baseHeight,
    baseWidth,
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
          height,
          positionAbsolute,
          width,
        },
      },
      dynamicData: {
        ...state.elements.dynamicData,
        [id]: {
          ...state.elements.dynamicData[id],
          height,
          positionAbsolute,
          width,
        },
      },
    },
  };
};
