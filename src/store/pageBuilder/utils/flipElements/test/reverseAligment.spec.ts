// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';

// utils
import { reverseAligment } from '../reverseAligment';

describe('reverseAligment', () => {
  it(`should return default aligment`, () => {
    // before
    const result = reverseAligment({}, 'x');

    // result
    expect(result).toStrictEqual({});
  });

  it(`should return right when left`, () => {
    // before
    const result = reverseAligment({ horizontal: AlignmentHorizontal.left }, 'x');

    // result
    expect(result).toStrictEqual({ horizontal: 'right', vertical: undefined });
  });

  it(`should return left when right`, () => {
    // before
    const result = reverseAligment({ horizontal: AlignmentHorizontal.right }, 'x');

    // result
    expect(result).toStrictEqual({ horizontal: 'left', vertical: undefined });
  });

  it(`should return bottom when top`, () => {
    // before
    const result = reverseAligment({ vertical: AlignmentVertical.top }, 'y');

    // result
    expect(result).toStrictEqual({ horizontal: undefined, vertical: 'bottom' });
  });

  it(`should return top when bottom`, () => {
    // before
    const result = reverseAligment({ vertical: AlignmentVertical.bottom }, 'y');

    // result
    expect(result).toStrictEqual({ horizontal: undefined, vertical: 'top' });
  });
});
