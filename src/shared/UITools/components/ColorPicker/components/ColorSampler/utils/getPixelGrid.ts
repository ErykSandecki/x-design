// types
import { TRGBA } from 'types';

export const getPixelGrid = (
  pixelData: Uint8ClampedArray,
  width: number,
  height: number,
  centerX: number,
  centerY: number,
  size: number = 7,
): Array<TRGBA> => {
  const half = Math.floor(size / 2);

  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => {
      const dx = col - half;
      const dy = row - half;
      const x = centerX + dx;
      const y = centerY + dy;

      if (x >= 0 && x < width && y >= 0 && y < height) {
        const index = (y * width + x) * 4;

        return {
          a: pixelData[index + 3],
          b: pixelData[index + 2],
          g: pixelData[index + 1],
          r: pixelData[index],
        };
      }

      return null;
    }),
  )
    .flat()
    .filter(
      (p): p is { r: number; g: number; b: number; a: number } => p !== null,
    );
};
