import { MouseEvent } from 'react';

export const getOptionValue = (event: MouseEvent<HTMLElement>): string | undefined => {
  const target = event.target as HTMLElement;

  if (target.tagName === 'LI') {
    return target.getAttribute('data-value') as string;
  }

  return undefined;
};
