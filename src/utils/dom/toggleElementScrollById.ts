import { CSSProperties } from 'react';

export const toggleElementScrollById = (
  id: string,
  overflow: CSSProperties['overflow'],
): void => {
  const element = document.getElementById(id);

  if (element) {
    element.style.overflow = overflow!;
  }
};
