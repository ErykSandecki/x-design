// types
import { TValueExtended } from 'types';

export const getScoreValue = (score: TValueExtended): string => {
  if (score) {
    const { mode, value, unit } = score;

    return mode === 'fixed' ? `${value}${unit || 'px'}` : 'auto';
  }

  return '';
};
