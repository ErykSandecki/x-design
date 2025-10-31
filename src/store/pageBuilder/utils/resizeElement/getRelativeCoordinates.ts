// types
import { AnchorResize } from 'store/pageBuilder/enums';
import { TElement } from 'types';
import { TSizeCoordinates } from 'store/pageBuilder/types';

export const getVerticalAnchorCoordinates = (
  aspectRatio: TElement['aspectRatio'],
  baseHeight: number,
  baseWidth: number,
  ratio: number,
  y: number,
): Partial<TSizeCoordinates> => {
  const offsetY = baseHeight + y;
  const height = offsetY < 0 ? 0 : offsetY;

  return {
    height: { value: height },
    width: { value: aspectRatio ? height * ratio : baseWidth },
  };
};

export const getHorizontalAnchorCoordinates = (
  aspectRatio: TElement['aspectRatio'],
  baseHeight: number,
  baseWidth: number,
  ratio: number,
  x: number,
): Partial<TSizeCoordinates> => {
  const offsetX = baseWidth + x;
  const width = offsetX < 0 ? 0 : offsetX;

  return {
    height: { value: aspectRatio ? width / ratio : baseHeight },
    width: { value: width },
  };
};

export const getRelativePositionByAspectRatio = (
  aspectRatio: boolean,
  baseHeight: number,
  baseWidth: number,
  ratio: number,
  x: number,
  y: number,
): Partial<TSizeCoordinates> => {
  let newWidth = baseWidth + x;
  let newHeight = baseHeight + y;
  let deltaX = x;
  let deltaY = y;

  if (aspectRatio) {
    if (Math.abs(deltaX) > Math.abs(deltaY * ratio)) {
      deltaY = deltaX / ratio;
    } else {
      deltaX = deltaY * ratio;
    }

    newWidth = baseWidth + deltaX;
    newHeight = baseHeight + deltaY;
  }

  return {
    height: { value: newHeight < 0 ? 0 : newHeight },
    width: { value: newWidth < 0 ? 0 : newWidth },
  };
};

export const getRelativeCoordinates = (
  anchor: AnchorResize,
  aspectRatio: TElement['aspectRatio'],
  baseCoordinates: TRectCoordinates,
  baseHeight: number,
  baseWidth: number,
  mouseCoordinates: T2DCoordinates,
): TSizeCoordinates => {
  const { x, y } = mouseCoordinates;
  const { x1, y1 } = baseCoordinates;
  const ratio = baseWidth / baseHeight;

  switch (anchor) {
    case AnchorResize.north:
    case AnchorResize.south:
      return {
        coordinates: { x: x1, y: y1 },
        ...getVerticalAnchorCoordinates(aspectRatio, baseHeight, baseWidth, ratio, y),
      } as TSizeCoordinates;
    case AnchorResize.east:
    case AnchorResize.west:
      return {
        coordinates: { x: x1, y: y1 },
        ...getHorizontalAnchorCoordinates(aspectRatio, baseHeight, baseWidth, ratio, x),
      } as TSizeCoordinates;
    default:
      return {
        coordinates: { x: x1, y: y1 },
        ...getRelativePositionByAspectRatio(aspectRatio, baseHeight, baseWidth, ratio, x, y),
      } as TSizeCoordinates;
  }
};
