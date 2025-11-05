// types
import { TColor, TElement } from 'types';

// utils
import { hexToRgb } from 'utils';

export const getBackground = (background: TElement['background']): string =>
  background
    .filter(({ visible }) => visible)
    .map(
      ({ properties }) =>
        `linear-gradient(${hexToRgb((properties as TColor).color, parseInt((properties as TColor).alpha))}, ${hexToRgb((properties as TColor).color, parseInt((properties as TColor).alpha))})`,
    )
    .join(',');
