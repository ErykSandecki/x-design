// types
import { ElementType, LayoutType } from 'types';

// utils
import { reverseChildren } from '../reverseChildren';

describe('reverseChildren', () => {
  it(`should reverse when x and grid layout type`, () => {
    // before
    const result = reverseChildren(
      'x',
      [
        { id: 'test-1', type: ElementType.frame },
        { id: 'test-2', type: ElementType.frame },
      ],
      { type: LayoutType.grid },
    );

    // result
    expect(result).toStrictEqual([
      { id: 'test-2', type: ElementType.frame },
      { id: 'test-1', type: ElementType.frame },
    ]);
  });

  it(`should reverse when y and grid layout type`, () => {
    // before
    const result = reverseChildren(
      'y',
      [
        { id: 'test-1', type: ElementType.frame },
        { id: 'test-2', type: ElementType.frame },
      ],
      { type: LayoutType.grid },
    );

    // result
    expect(result).toStrictEqual([
      { id: 'test-2', type: ElementType.frame },
      { id: 'test-1', type: ElementType.frame },
    ]);
  });

  it(`should not reverse`, () => {
    // before
    const result = reverseChildren(
      'x',
      [
        { id: 'test-1', type: ElementType.frame },
        { id: 'test-2', type: ElementType.frame },
      ],
      { type: LayoutType.vertical },
    );

    // result
    expect(result).toStrictEqual([
      { id: 'test-1', type: ElementType.frame },
      { id: 'test-2', type: ElementType.frame },
    ]);
  });
});
