import { isUndefined, keys, omitBy, pickBy } from 'lodash';

// types
import { TPageBuilderState, TResizeElementActionPayload, TStrictAxis } from '../../types';

// utils
import { getCorrectAnchor } from './getCorrectAnchor';
import { getFlipAxisToChange } from './getFlipAxisToChange';
import { getSizesCoordinates } from './getSizesCoordinates';
import { getFlippedElements } from '../flipElements/getFlippedElements';

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
  const { selectedAnchorResize: anchor } = state.events;
  const { aspectRatio, flip, position } = currentPage.elements[id];
  const correctAnchor = getCorrectAnchor(anchor, baseCoordinates, mouseCoordinates);
  const flipAxisToChange = getFlipAxisToChange(baseFlip, correctAnchor, flip, anchor, position);
  const axis = keys(pickBy(flipAxisToChange, (axis) => axis !== undefined)) as TStrictAxis;
  const flippedElements = getFlippedElements(axis, currentPage.elements, false, currentPage.selectedElements);
  const currentElement = flippedElements[id];

  const { height, coordinates, width } = getSizesCoordinates(
    state.events.selectedAnchorResize,
    aspectRatio,
    baseCoordinates,
    baseHeight as number,
    baseWidth as number,
    correctAnchor,
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
          ...flippedElements,
          [id]: {
            ...element,
            ...currentElement,
            coordinates,
            flip: {
              ...element.flip,
              ...omitBy(flipAxisToChange, isUndefined),
            },
            height: {
              ...element.height,
              mode: 'fixed',
              value: height,
            },
            width: {
              ...element.width,
              mode: 'fixed',
              value: width,
            },
          },
        },
      },
    },
  };
};
