import { RefObject } from 'react';

const cursorSize = 32;
const cursorImageCache = new Map<string, HTMLImageElement>();

const getCursorImage = (cursor: string): HTMLImageElement => {
  const cached = cursorImageCache.get(cursor);

  if (!cached) {
    const image = new Image();
    image.src = cursor;
    cursorImageCache.set(cursor, image);

    return image;
  }

  return cached;
};

export const getPNGUrl = (cursor: string): string => `url(${cursor}), auto`;

export const getRotatedPNGUrl = (angle: number, cursor: string): string => {
  const image = getCursorImage(cursor);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const halfCursorSize = cursorSize / 2;

  canvas.width = cursorSize;
  canvas.height = cursorSize;
  context!.translate(halfCursorSize, halfCursorSize);
  context!.rotate((angle * Math.PI) / 180);
  context!.drawImage(image, -halfCursorSize, -halfCursorSize, cursorSize, cursorSize);

  return `url(${canvas.toDataURL('image/png')}) 16 16, auto`;
};

export const toggleCursor = (contentRef: RefObject<HTMLElement>, url: string): void => {
  contentRef.current.style.cursor = url;
};

export const resetCursor = (contentRef: RefObject<HTMLElement>, cursorDefault: string): void => {
  const url = getPNGUrl(cursorDefault);
  toggleCursor(contentRef, url);
};

export const updateCursor = (angle: number, contentRef: RefObject<HTMLElement>, cursor: string): void => {
  const image = getCursorImage(cursor);

  if (image.complete) {
    toggleCursor(contentRef, getRotatedPNGUrl(angle, cursor));
  } else {
    image.onload = (): void => toggleCursor(contentRef, getRotatedPNGUrl(angle, cursor));
  }
};
