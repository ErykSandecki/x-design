// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';

// utils
import { handleReverseAlignment } from '../handleReverseAlignment';

describe('handleReverseAlignment', () => {
  it(`should return default aligment`, () => {
    // before
    const result = handleReverseAlignment(['x'], { ...elementMock });

    // result
    expect(result).toStrictEqual({});
  });

  it(`should return right when left`, () => {
    // before
    const result = handleReverseAlignment(['x'], {
      ...elementMock,
      alignment: { ...elementMock.alignment, horizontal: AlignmentHorizontal.left },
    });

    // result
    expect(result).toStrictEqual({ horizontal: 'right', vertical: undefined });
  });

  it(`should return left when right`, () => {
    // before
    const result = handleReverseAlignment(['x'], {
      ...elementMock,
      alignment: { ...elementMock.alignment, horizontal: AlignmentHorizontal.right },
    });

    // result
    expect(result).toStrictEqual({ horizontal: 'left', vertical: undefined });
  });

  it(`should return bottom when top`, () => {
    // before
    const result = handleReverseAlignment(['y'], {
      ...elementMock,
      alignment: { ...elementMock.alignment, vertical: AlignmentVertical.top },
    });

    // result
    expect(result).toStrictEqual({ horizontal: undefined, vertical: 'bottom' });
  });

  it(`should return top when bottom`, () => {
    // before
    const result = handleReverseAlignment(['y'], {
      ...elementMock,
      alignment: { ...elementMock.alignment, vertical: AlignmentVertical.bottom },
    });

    // result
    expect(result).toStrictEqual({ horizontal: undefined, vertical: 'top' });
  });

  it(`should return [right, bottom] when [left, top]`, () => {
    // before
    const result = handleReverseAlignment(['x', 'y'], {
      ...elementMock,
      alignment: { ...elementMock.alignment, horizontal: AlignmentHorizontal.left, vertical: AlignmentVertical.top },
    });

    // result
    expect(result).toStrictEqual({ horizontal: AlignmentHorizontal.right, vertical: AlignmentVertical.bottom });
  });
});
