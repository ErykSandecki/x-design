// types
import { TElement } from 'types';
import { TSetElementsSizesActionPayload } from '../../types';

export const getSizeByAspectRatio = (
  element: TElement,
  sizeType: TSetElementsSizesActionPayload['sizeType'],
  value: number,
): Pick<TElement, 'height' | 'width'> => {
  const baseWidth = (element.width.value as number) || 1;
  const baseHeight = (element.height.value as number) || 1;
  const baseRatio = baseWidth / baseHeight;

  if (sizeType === 'width') {
    return {
      height: { ...element.height, value: value / baseRatio },
      width: { ...element.width, value },
    };
  }

  return {
    height: { ...element.height, value },
    width: { ...element.width, value: value * baseRatio },
  };
};

export const getElementSizes = (
  element: TElement,
  sizeType: TSetElementsSizesActionPayload['sizeType'],
  value: TSetElementsSizesActionPayload['value'],
): Pick<TElement, 'height' | 'width'> => {
  if (element.aspectRatio) {
    return getSizeByAspectRatio(element, sizeType, value as number);
  }

  return {
    height: element.height,
    width: element.width,
    // eslint-disable-next-line sort-keys
    [sizeType]: {
      ...element[sizeType],
      value,
    },
  };
};
