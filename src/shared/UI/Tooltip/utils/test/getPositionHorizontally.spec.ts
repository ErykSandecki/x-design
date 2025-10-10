import { MouseEvent } from 'react';

// types
import { TooltipPosition } from '../../enums';

// utils
import { getPositionHorizontally } from '../getPositionHorizontally';

const testCases = [
  {
    args: {
      mouseCoordinates: { clientX: 1024, clientY: 1024 },
    },
    description: 'Should return left end',
    expectedResult: TooltipPosition.leftEnd,
  },
  {
    args: {
      mouseCoordinates: { clientX: 1024, clientY: 0 },
    },
    description: 'Should return left start',
    expectedResult: TooltipPosition.leftStart,
  },
  {
    args: {
      mouseCoordinates: { clientX: 0, clientY: 1024 },
    },
    description: 'Should return right end',
    expectedResult: TooltipPosition.rightEnd,
  },
  {
    args: {
      mouseCoordinates: { clientX: 0, clientY: 0 },
    },
    description: 'Should return right start',
    expectedResult: TooltipPosition.rightStart,
  },
];

describe('getPositionHorizontally', () => {
  testCases.forEach(({ args, description, expectedResult }) => {
    it(description, () => {
      // before
      const { mouseCoordinates } = args;
      const result = getPositionHorizontally(mouseCoordinates as MouseEvent);

      // result
      expect(result).toBe(expectedResult);
    });
  });
});
