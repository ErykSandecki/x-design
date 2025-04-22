import html2canvas from 'html2canvas';

// others
import { SAMPLE_OFFSET } from '../constants';

// types
import { TRGBA } from 'types';

export const getCanvas = async (
  x: number,
  y: number,
): Promise<HTMLCanvasElement> =>
  await html2canvas(document.body, {
    height: 7,
    width: 7,
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    x: x - SAMPLE_OFFSET,
    y: y - SAMPLE_OFFSET,
  });

export const extractColors = async (
  event: MouseEvent,
): Promise<Array<TRGBA>> => {
  const x = event.clientX;
  const y = event.clientY;
  const canvas = await getCanvas(x, y);
  const ctx = canvas.getContext('2d');
  const pixel = ctx.getImageData(0, 0, 7, 7).data;
  const colors = [];

  for (let i = 0; i < pixel.length; i += 4) {
    colors.push({
      a: pixel[i + 3],
      b: pixel[i + 2],
      g: pixel[i + 1],
      r: pixel[i],
    });
  }

  return colors;
};
