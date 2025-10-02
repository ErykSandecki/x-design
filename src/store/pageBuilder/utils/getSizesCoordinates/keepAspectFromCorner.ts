// types
import { AnchorResize } from '../../enums';
import { TSizeCoordinates } from '../../types';

export const getCorrectXY = (
  anchor: AnchorResize,
  height: number,
  targetHeight: number,
  targetWidth: number,
  width: number,
  x: number,
  y: number,
): T2DCoordinates => {
  switch (anchor) {
    case AnchorResize.northWest:
      return {
        x: x + (width - targetWidth),
        y: y + (height - targetHeight),
      };
    case AnchorResize.northEast:
      return {
        x,
        y: y + (height - targetHeight),
      };
    case AnchorResize.southWest:
      return {
        x: x + (width - targetWidth),
        y,
      };
    default:
      return { x, y };
  }
};

export const keepAspectFromCorner = (
  anchor: AnchorResize,
  aspectRatio: boolean,
  baseHeight: number,
  baseWidth: number,
  height: number,
  width: number,
  x: number,
  y: number,
): TSizeCoordinates => {
  if (aspectRatio) {
    const ratio = baseWidth / baseHeight;
    const isWidthLeading = Math.abs(width) > Math.abs(height * ratio);
    const targetHeight = isWidthLeading ? width / ratio : height;
    const targetWidth = isWidthLeading ? width : height * ratio;
    const correctedXY = getCorrectXY(anchor, height, targetHeight, targetWidth, width, x, y);

    return {
      coordinates: { x: correctedXY.x, y: correctedXY.y },
      height: { value: targetHeight },
      width: { value: targetWidth },
    };
  }

  return { coordinates: { x, y }, height: { value: height }, width: { value: width } };
};
