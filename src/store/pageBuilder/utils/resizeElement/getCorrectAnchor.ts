// types
import { AnchorResize } from 'store/pageBuilder/enums';

export const getCorrectNorthEast = (maxHeight: number, maxWidth: number, x: number, y: number): AnchorResize => {
  switch (true) {
    case x < maxWidth * -1 && y > maxHeight:
      return AnchorResize.southWest;
    case x < maxWidth * -1:
      return AnchorResize.northWest;
    case y > maxHeight:
      return AnchorResize.southEast;
    default:
      return AnchorResize.northEast;
  }
};

export const getCorrectNorthWest = (maxHeight: number, maxWidth: number, x: number, y: number): AnchorResize => {
  switch (true) {
    case x > maxWidth && y > maxHeight:
      return AnchorResize.southEast;
    case x > maxWidth:
      return AnchorResize.northEast;
    case y > maxHeight:
      return AnchorResize.southEast;
    default:
      return AnchorResize.northWest;
  }
};

export const getCorrectSouthEast = (maxHeight: number, maxWidth: number, x: number, y: number): AnchorResize => {
  switch (true) {
    case x < maxWidth * -1 && y < maxHeight * -1:
      return AnchorResize.northWest;
    case x < maxWidth * -1:
      return AnchorResize.southWest;
    case y < maxHeight * -1:
      return AnchorResize.northEast;
    default:
      return AnchorResize.southEast;
  }
};

export const getCorrectSouthWest = (maxHeight: number, maxWidth: number, x: number, y: number): AnchorResize => {
  switch (true) {
    case x > maxWidth && y < maxHeight * -1:
      return AnchorResize.northEast;
    case x > maxWidth:
      return AnchorResize.southEast;
    case y < maxHeight * -1:
      return AnchorResize.northWest;
    default:
      return AnchorResize.southWest;
  }
};

export const getCorrectAnchor = (
  anchor: AnchorResize,
  baseCoordinates: TRectCoordinates,
  mouseCoordinates: T2DCoordinates,
): AnchorResize => {
  const { x, y } = mouseCoordinates;
  const maxWidth = Math.abs(baseCoordinates.x1 - baseCoordinates.x2);
  const maxHeight = Math.abs(baseCoordinates.y1 - baseCoordinates.y2);

  switch (anchor) {
    case AnchorResize.east:
      return x < maxWidth * -1 ? AnchorResize.west : anchor;
    case AnchorResize.north:
      return y > maxHeight ? AnchorResize.south : anchor;
    case AnchorResize.south:
      return y < maxHeight * -1 ? AnchorResize.north : anchor;
    case AnchorResize.west:
      return x > maxWidth ? AnchorResize.east : anchor;
    case AnchorResize.northEast:
      return getCorrectNorthEast(maxHeight, maxWidth, x, y);
    case AnchorResize.northWest:
      return getCorrectNorthWest(maxHeight, maxWidth, x, y);
    case AnchorResize.southEast:
      return getCorrectSouthEast(maxHeight, maxWidth, x, y);
    default:
      return getCorrectSouthWest(maxHeight, maxWidth, x, y);
  }
};
