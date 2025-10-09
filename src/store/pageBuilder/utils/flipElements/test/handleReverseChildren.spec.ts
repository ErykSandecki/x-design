// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { ElementType, LayoutType } from 'types';

// utils
import { handleReverseChildren } from '../handleReverseChildren';

const preparedElementMock = {
  ...elementMock,
  children: [
    { id: 'test-1', type: ElementType.frame },
    { id: 'test-2', type: ElementType.frame },
  ],
};

describe('reverseChildren', () => {
  it(`should reverse when x and horizontal layout`, () => {
    // before
    const result = handleReverseChildren(['x'], {
      ...preparedElementMock,
      layout: { ...preparedElementMock.layout, type: LayoutType.horizontal },
    });

    // result
    expect(result).toStrictEqual([
      { id: 'test-2', type: ElementType.frame },
      { id: 'test-1', type: ElementType.frame },
    ]);
  });

  it(`should reverse when y and vertical layout type`, () => {
    // before
    const result = handleReverseChildren(['y'], {
      ...preparedElementMock,
      layout: { ...preparedElementMock.layout, type: LayoutType.vertical },
    });

    // result
    expect(result).toStrictEqual([
      { id: 'test-2', type: ElementType.frame },
      { id: 'test-1', type: ElementType.frame },
    ]);
  });

  it(`should reverse when x and y but only for horizontal`, () => {
    // before
    const result = handleReverseChildren(['x', 'y'], {
      ...preparedElementMock,
      layout: { ...preparedElementMock.layout, type: LayoutType.horizontal },
    });

    // result
    expect(result).toStrictEqual([
      { id: 'test-2', type: ElementType.frame },
      { id: 'test-1', type: ElementType.frame },
    ]);
  });

  it(`should reverse when x and y but only for vertical`, () => {
    // before
    const result = handleReverseChildren(['x', 'y'], {
      ...preparedElementMock,
      layout: { ...preparedElementMock.layout, type: LayoutType.vertical },
    });

    // result
    expect(result).toStrictEqual([
      { id: 'test-2', type: ElementType.frame },
      { id: 'test-1', type: ElementType.frame },
    ]);
  });

  it(`should not reverse`, () => {
    // before
    const result = handleReverseChildren(['x'], {
      ...preparedElementMock,
      layout: { ...preparedElementMock.layout, type: LayoutType.vertical },
    });

    // result
    expect(result).toStrictEqual([
      { id: 'test-1', type: ElementType.frame },
      { id: 'test-2', type: ElementType.frame },
    ]);
  });
});
