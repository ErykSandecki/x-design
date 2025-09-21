import { RefObject } from 'react';

export const getPNGUrl = (cursor: string): string => `url(${cursor}), auto`;

export const getSVGUrl = (angle: number, cursor: string): string => {
  const svgRaw = `
    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'>
      <image href='${cursor}' width='32' height='32' transform='rotate(${angle} 16 16)'/>
    </svg>`;

  return `url("data:image/svg+xml,${encodeURIComponent(svgRaw)}") 16 16, auto`;
};

export const toggleCursor = (
  contentRef: RefObject<HTMLElement>,
  url: string,
) => {
  contentRef.current.style.cursor = url;
};

export const resetCursor = (
  contentRef: RefObject<HTMLElement>,
  cursorDefault: string,
): void => {
  const url = getPNGUrl(cursorDefault);
  toggleCursor(contentRef, url);
};

export const updateCursor = (
  angle: number,
  contentRef: RefObject<HTMLElement>,
  cursor: string,
): void => {
  const url = getSVGUrl(angle, cursor);
  toggleCursor(contentRef, url);
};
