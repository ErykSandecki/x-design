// others
import { cssVariables } from 'constant/cssVariables';

export const getCssVariable = (
  variable: (typeof cssVariables)[keyof typeof cssVariables],
): string => `var(${variable})`;
