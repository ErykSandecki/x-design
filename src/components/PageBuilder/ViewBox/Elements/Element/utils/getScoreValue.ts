// types
import { TSize } from 'types';

export const getScoreValue = (score: TSize): string => {
  if (score) {
    const { type, value, unit } = score;

    return type === 'fixed' ? `${value}${unit || 'px'}` : 'auto';
  }

  return '';
};
