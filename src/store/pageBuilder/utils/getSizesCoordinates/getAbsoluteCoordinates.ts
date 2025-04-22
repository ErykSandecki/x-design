// types
import { Anchor } from '../../enums';
import { T2DCoordinates, TRectCoordinates } from 'types';
import { TSizeCoordinates } from '../../types';

export const getEastCoordinates = (
  baseCoordinates: TRectCoordinates,
  baseHeight: number,
  baseWidth: number,
  mouseCoordinates: T2DCoordinates,
): TSizeCoordinates => {
  const { x } = mouseCoordinates;
  const { x1, x2, y1 } = baseCoordinates;
  const reverse = -x >= baseWidth;

  return {
    coordinates: {
      x: reverse ? x2 + x : x1,
      y: y1,
    },
    height: baseHeight,
    width: reverse ? x1 - (x2 + x) : baseWidth + x,
  };
};

export const getNorthCoordinates = (
  baseCoordinates: TRectCoordinates,
  baseHeight: number,
  baseWidth: number,
  mouseCoordinates: T2DCoordinates,
): TSizeCoordinates => {
  const { y } = mouseCoordinates;
  const { x1, y1, y2 } = baseCoordinates;
  const reverseY = y >= baseHeight;

  return {
    coordinates: {
      x: x1,
      y: reverseY ? y2 : y1 + y,
    },
    height: reverseY ? y - baseHeight : y2 - (y1 + y),
    width: baseWidth,
  };
};

export const getSouthCoordinates = (
  baseCoordinates: TRectCoordinates,
  baseHeight: number,
  baseWidth: number,
  mouseCoordinates: T2DCoordinates,
): TSizeCoordinates => {
  const { y } = mouseCoordinates;
  const { x1, y1, y2 } = baseCoordinates;
  const reverseY = -y >= baseHeight;

  return {
    coordinates: {
      x: x1,
      y: reverseY ? y2 + y : y1,
    },
    height: reverseY ? y1 - (y2 + y) : baseHeight + y,
    width: baseWidth,
  };
};

export const getWestCoordinates = (
  baseCoordinates: TRectCoordinates,
  baseHeight: number,
  baseWidth: number,
  mouseCoordinates: T2DCoordinates,
): TSizeCoordinates => {
  const { x } = mouseCoordinates;
  const { x1, x2, y1 } = baseCoordinates;
  const reverseX = x >= baseWidth;

  return {
    coordinates: {
      x: reverseX ? x2 : x1 + x,
      y: y1,
    },
    height: baseHeight,
    width: reverseX ? x - baseWidth : x2 - (x1 + x),
  };
};

export const getAbsoluteCoordinates = (
  anchor: Anchor,
  baseCoordinates: TRectCoordinates,
  baseHeight: number,
  baseWidth: number,
  mouseCoordinates: T2DCoordinates,
): TSizeCoordinates => {
  const eastCoordinates = getEastCoordinates(
    baseCoordinates,
    baseHeight,
    baseWidth,
    mouseCoordinates,
  );
  const northCoordinates = getNorthCoordinates(
    baseCoordinates,
    baseHeight,
    baseWidth,
    mouseCoordinates,
  );
  const southCoordinates = getSouthCoordinates(
    baseCoordinates,
    baseHeight,
    baseWidth,
    mouseCoordinates,
  );
  const westCoordinates = getWestCoordinates(
    baseCoordinates,
    baseHeight,
    baseWidth,
    mouseCoordinates,
  );

  switch (anchor) {
    case Anchor.east:
      return eastCoordinates;
    case Anchor.north:
      return northCoordinates;
    case Anchor.northEast:
      return {
        coordinates: {
          x: eastCoordinates.coordinates.x,
          y: northCoordinates.coordinates.y,
        },
        height: northCoordinates.height,
        width: eastCoordinates.width,
      };
    case Anchor.northWest:
      return {
        coordinates: {
          x: westCoordinates.coordinates.x,
          y: northCoordinates.coordinates.y,
        },
        height: northCoordinates.height,
        width: westCoordinates.width,
      };
    case Anchor.south:
      return southCoordinates;
    case Anchor.southEast:
      return {
        coordinates: {
          x: eastCoordinates.coordinates.x,
          y: southCoordinates.coordinates.y,
        },
        height: southCoordinates.height,
        width: eastCoordinates.width,
      };
    case Anchor.southWest:
      return {
        coordinates: {
          x: westCoordinates.coordinates.x,
          y: southCoordinates.coordinates.y,
        },
        height: southCoordinates.height,
        width: westCoordinates.width,
      };
    default:
      return westCoordinates;
  }
};
