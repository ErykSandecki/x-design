import { CSSProperties } from 'react';

export const toggleBodyUserSelect = (
  value: CSSProperties['userSelect'],
): void => {
  document.body.style.userSelect = value;
};
