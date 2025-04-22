// types
import { Anchor } from '../../enums';
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

  return {
    coordinates: {
      x: x1,
      y: y1,
    },
    height: baseHeight + y,
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

  return {
    coordinates: {
      x: x1,
      y: y1,
    },
    height: baseHeight,
    width: baseWidth + x,
  };
};

export const getRelativeCoordinates = (
  anchor: Anchor,
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
    case Anchor.north:
    case Anchor.south:
      return heightCoordinates;
    case Anchor.east:
    case Anchor.west:
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
