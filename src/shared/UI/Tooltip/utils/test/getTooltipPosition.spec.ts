import { RefObject } from 'react';

// types
import { TooltipPosition } from '../../enums';

// utils
import { getTooltipPosition } from '../getTooltipPosition';

describe('getTooltipPosition', () => {
  it('should return position', () => {
    // mock
    const elementRef = {
      current: {
        getBoundingClientRect: () => ({ height: 0, width: 0, x: 0, y: 0 }),
      },
    } as RefObject<HTMLDivElement>;

    // mock
    const tooltipRef = {
      current: {
        getBoundingClientRect: () => ({ height: 0, width: 0 }),
      },
    } as RefObject<HTMLDivElement>;

    // before
    const result = getTooltipPosition(elementRef, TooltipPosition.topCenter, tooltipRef);

    // result
    expect(result).toStrictEqual({
      left: 'calc(0px - 0px + 0px)',
      top: 'calc(0px - 0px - 7px)',
    });
  });

  it('should not return position when refs are empty', () => {
    // mock
    const elementRef = {} as RefObject<HTMLDivElement>;
    const tooltipRef = {} as RefObject<HTMLDivElement>;

    // before
    const result = getTooltipPosition(elementRef, TooltipPosition.topCenter, tooltipRef);

    // result
    expect(result).toStrictEqual({});
  });
});
