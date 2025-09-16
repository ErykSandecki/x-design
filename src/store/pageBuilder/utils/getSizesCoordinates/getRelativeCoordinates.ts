// types
import { AnchorResize } from '../../enums';
import { T2DCoordinates, TRectCoordinates } from 'types';
import { TSizeCoordinates } from '../../types';

export const getHeightCoordinates = (
  baseCoordinates: TRectCoordinates,
  baseHeight: number,
  baseWidth: number,
  mouseCoordinates: T2DCoordinates,
): TSizeCoordinates => {
  const { y } = mouseCoordinates;
  const { x1, y1 } = baseCoordinates;
  const height = baseHeight + y;

  return {
    coordinates: {
      x: x1,
      y: y1,
    },
    height: height < 0 ? 0 : height,
    width: baseWidth,
  };
};

export const getWidthCoordinates = (
  baseCoordinates: TRectCoordinates,
  baseHeight: number,
  baseWidth: number,
  mouseCoordinates: T2DCoordinates,
): TSizeCoordinates => {
  const { x } = mouseCoordinates;
  const { x1, y1 } = baseCoordinates;
  const width = baseWidth + x;

  return {
    coordinates: {
      x: x1,
      y: y1,
    },
    height: baseHeight,
    width: width < 0 ? 0 : width,
  };
};

export const getRelativeCoordinates = (
  anchor: AnchorResize,
  baseCoordinates: TRectCoordinates,
  baseHeight: number,
  baseWidth: number,
  mouseCoordinates: T2DCoordinates,
): TSizeCoordinates => {
  const heightCoordinates = getHeightCoordinates(
    baseCoordinates,
    baseHeight,
    baseWidth,
    mouseCoordinates,
  );
  const widthCoordinates = getWidthCoordinates(
    baseCoordinates,
    baseHeight,
    baseWidth,
    mouseCoordinates,
  );

  switch (anchor) {
    case AnchorResize.north:
    case AnchorResize.south:
      return heightCoordinates;
    case AnchorResize.east:
    case AnchorResize.west:
      return widthCoordinates;
    default:
      return {
        coordinates: {
          x: baseCoordinates.x1,
          y: baseCoordinates.y1,
        },
        height: heightCoordinates.height,
        width: widthCoordinates.width,
      };
  }
};
