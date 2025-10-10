import { MouseEvent } from 'react';

// types
import { TooltipPosition } from '../../enums';

// utils
import { getPositionVertically } from '../getPositionVertically';

const testCases = [
  {
    args: {
      mouseCoordinates: { clientX: 1024, clientY: 1024 },
    },
    description: 'Should return top end',
    expectedResult: TooltipPosition.topEnd,
  },
  {
    args: {
      mouseCoordinates: { clientX: 1024, clientY: 0 },
    },
    description: 'Should return bottom end',
    expectedResult: TooltipPosition.bottomEnd,
  },
  {
    args: {
      mouseCoordinates: { clientX: 0, clientY: 1024 },
    },
    description: 'Should return top start',
    expectedResult: TooltipPosition.topStart,
  },
  {
    args: {
      mouseCoordinates: { clientX: 0, clientY: 0 },
    },
    description: 'Should return bottom start',
    expectedResult: TooltipPosition.bottomStart,
  },
];

describe('getPositionVertically', () => {
  testCases.forEach(({ args, description, expectedResult }) => {
    it(description, () => {
      // before
      const { mouseCoordinates } = args;
      const result = getPositionVertically(mouseCoordinates as MouseEvent);

      // result
      expect(result).toBe(expectedResult);
    });
  });
});
