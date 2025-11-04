// types
import { AnchorResize } from '../../enums';
import { TElement } from 'types';
import { TSizeCoordinates } from '../../types';

// utils
import { getHeightByAspectRatio } from './getHeightByAspectRatio';
import { getWidthByAspectRatio } from './getWidthByAspectRatio';
import { keepAspectFromCorner } from './keepAspectFromCorner';

export const getEastCoordinates = (
  aspectRatio: TElement['aspectRatio'],
  baseCoordinates: TRectCoordinates,
  baseHeight: number,
  baseWidth: number,
  mouseCoordinates: T2DCoordinates,
): TSizeCoordinates => {
  const { x } = mouseCoordinates;
  const { x1, x2, y1 } = baseCoordinates;
  const reverse = -x >= baseWidth;
  const width = reverse ? x1 - (x2 + x) : baseWidth + x;
  const height = getHeightByAspectRatio(aspectRatio, baseHeight, baseWidth, width);

  return {
    coordinates: {
      x: reverse ? x2 + x : x1,
      y: y1,
    },
    height,
    width,
  };
};

export const getWestCoordinates = (
  aspectRatio: TElement['aspectRatio'],
  baseCoordinates: TRectCoordinates,
  baseHeight: number,
  baseWidth: number,
  mouseCoordinates: T2DCoordinates,
): TSizeCoordinates => {
  const { x } = mouseCoordinates;
  const { x1, x2, y1 } = baseCoordinates;
  const reverse = x >= baseWidth;
  const width = reverse ? x - baseWidth : x2 - (x1 + x);
  const height = getHeightByAspectRatio(aspectRatio, baseHeight, baseWidth, width);

  return {
    coordinates: {
      x: reverse ? x2 : x1 + x,
      y: y1,
    },
    height,
    width,
  };
};

export const getNorthCoordinates = (
  aspectRatio: TElement['aspectRatio'],
  baseCoordinates: TRectCoordinates,
  baseHeight: number,
  baseWidth: number,
  mouseCoordinates: T2DCoordinates,
): TSizeCoordinates => {
  const { y } = mouseCoordinates;
  const { x1, y1, y2 } = baseCoordinates;
  const reverse = y >= baseHeight;
  const height = reverse ? y - baseHeight : y2 - (y1 + y);
  const width = getWidthByAspectRatio(aspectRatio, baseHeight, baseWidth, height);

  return {
    coordinates: {
      x: x1,
      y: reverse ? y2 : y1 + y,
    },
    height,
    width,
  };
};

export const getSouthCoordinates = (
  aspectRatio: TElement['aspectRatio'],
  baseCoordinates: TRectCoordinates,
  baseHeight: number,
  baseWidth: number,
  mouseCoordinates: T2DCoordinates,
): TSizeCoordinates => {
  const { y } = mouseCoordinates;
  const { x1, y1, y2 } = baseCoordinates;
  const reverse = -y >= baseHeight;
  const height = reverse ? y1 - (y2 + y) : baseHeight + y;
  const width = getWidthByAspectRatio(aspectRatio, baseHeight, baseWidth, height);

  return {
    coordinates: {
      x: x1,
      y: reverse ? y2 + y : y1,
    },
    height,
    width,
  };
};

export const getAbsoluteCoordinates = (
  anchor: AnchorResize,
  aspectRatio: TElement['aspectRatio'],
  baseCoordinates: TRectCoordinates,
  baseHeight: number,
  baseWidth: number,
  correctAnchor: AnchorResize,
  mouseCoordinates: T2DCoordinates,
): TSizeCoordinates => {
  const eastCoordinates = getEastCoordinates(aspectRatio, baseCoordinates, baseHeight, baseWidth, mouseCoordinates);
  const westCoordinates = getWestCoordinates(aspectRatio, baseCoordinates, baseHeight, baseWidth, mouseCoordinates);
  const northCoordinates = getNorthCoordinates(aspectRatio, baseCoordinates, baseHeight, baseWidth, mouseCoordinates);
  const southCoordinates = getSouthCoordinates(aspectRatio, baseCoordinates, baseHeight, baseWidth, mouseCoordinates);

  switch (anchor) {
    case AnchorResize.east:
      return eastCoordinates;
    case AnchorResize.north:
      return northCoordinates;
    case AnchorResize.south:
      return southCoordinates;
    case AnchorResize.northEast:
      return keepAspectFromCorner(
        aspectRatio,
        baseHeight,
        baseWidth,
        correctAnchor,
        northCoordinates.height,
        eastCoordinates.width,
        eastCoordinates.coordinates.x,
        northCoordinates.coordinates.y,
      );
    case AnchorResize.northWest:
      return keepAspectFromCorner(
        aspectRatio,
        baseHeight,
        baseWidth,
        correctAnchor,
        northCoordinates.height,
        westCoordinates.width,
        westCoordinates.coordinates.x,
        northCoordinates.coordinates.y,
      );
    case AnchorResize.southEast:
      return keepAspectFromCorner(
        aspectRatio,
        baseHeight,
        baseWidth,
        correctAnchor,
        southCoordinates.height,
        eastCoordinates.width,
        eastCoordinates.coordinates.x,
        southCoordinates.coordinates.y,
      );
    case AnchorResize.southWest:
      return keepAspectFromCorner(
        aspectRatio,
        baseHeight,
        baseWidth,
        correctAnchor,
        southCoordinates.height,
        westCoordinates.width,
        westCoordinates.coordinates.x,
        southCoordinates.coordinates.y,
      );
    default:
      return westCoordinates;
  }
};
