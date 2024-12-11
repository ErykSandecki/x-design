import { CSSProperties } from 'react';

export const toggleBodyScroll = (value: CSSProperties['overflow']): void => {
  document.body.style.overflow = value!;
};
