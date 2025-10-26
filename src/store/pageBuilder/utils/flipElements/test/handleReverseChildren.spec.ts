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

  it(`should reverse when x and grid layout`, () => {
    // before
    const result = handleReverseChildren(['x'], {
      ...preparedElementMock,
      children: [
        { id: 'test-1', type: ElementType.frame },
        { id: 'test-2', type: ElementType.frame },
        { id: 'test-3', type: ElementType.frame },
        { id: 'test-4', type: ElementType.frame },
        { id: 'test-5', type: ElementType.frame },
        { id: 'test-6', type: ElementType.frame },
      ],
      layout: { ...preparedElementMock.layout, grid: { columns: 2, rows: 3 }, type: LayoutType.grid },
    });

    // result
    expect(result).toStrictEqual([
      { id: 'test-2', type: ElementType.frame },
      { id: 'test-1', type: ElementType.frame },
      { id: 'test-4', type: ElementType.frame },
      { id: 'test-3', type: ElementType.frame },
      { id: 'test-6', type: ElementType.frame },
      { id: 'test-5', type: ElementType.frame },
    ]);
  });

  it(`should reverse when y and grid layout`, () => {
    // before
    const result = handleReverseChildren(['y'], {
      ...preparedElementMock,
      children: [
        { id: 'test-1', type: ElementType.frame },
        { id: 'test-2', type: ElementType.frame },
        { id: 'test-3', type: ElementType.frame },
        { id: 'test-4', type: ElementType.frame },
        { id: 'test-5', type: ElementType.frame },
        { id: 'test-6', type: ElementType.frame },
      ],
      layout: { ...preparedElementMock.layout, grid: { columns: 2, rows: 3 }, type: LayoutType.grid },
    });

    // result
    expect(result).toStrictEqual([
      { id: 'test-5', type: ElementType.frame },
      { id: 'test-6', type: ElementType.frame },
      { id: 'test-3', type: ElementType.frame },
      { id: 'test-4', type: ElementType.frame },
      { id: 'test-1', type: ElementType.frame },
      { id: 'test-2', type: ElementType.frame },
    ]);
  });

  it(`should reverse when x & y and grid layout`, () => {
    // before
    const result = handleReverseChildren(['x', 'y'], {
      ...preparedElementMock,
      children: [
        { id: 'test-1', type: ElementType.frame },
        { id: 'test-2', type: ElementType.frame },
        { id: 'test-3', type: ElementType.frame },
        { id: 'test-4', type: ElementType.frame },
        { id: 'test-5', type: ElementType.frame },
        { id: 'test-6', type: ElementType.frame },
      ],
      layout: { ...preparedElementMock.layout, grid: { columns: 2, rows: 3 }, type: LayoutType.grid },
    });

    // result
    expect(result).toStrictEqual([
      { id: 'test-6', type: ElementType.frame },
      { id: 'test-5', type: ElementType.frame },
      { id: 'test-4', type: ElementType.frame },
      { id: 'test-3', type: ElementType.frame },
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
