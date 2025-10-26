// mocks
import { childrenMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';
import { ElementType } from 'types';

// utils
import { getNextParentChildren } from '../getNextParentChildren';

describe('getNextParentChildren putting', () => {
  it('should return when element is put as the first', () => {
    // before
    const result = getNextParentChildren(
      [{ ...childrenMock, id: 'test-2' }],
      0,
      [
        { ...childrenMock, id: 'test-1' },
        { ...childrenMock, id: 'test-3' },
      ],
      null,
    );

    // result
    expect(result).toStrictEqual([
      { ...childrenMock, id: 'test-2' },
      { ...childrenMock, id: 'test-1' },
      { ...childrenMock, id: 'test-3' },
    ]);
  });

  it('should return when element is put in the middle', () => {
    // before
    const result = getNextParentChildren(
      [{ ...childrenMock, id: 'test-2' }],
      1,
      [
        { ...childrenMock, id: 'test-1' },
        { ...childrenMock, id: 'test-3' },
      ],
      null,
    );

    // result
    expect(result).toStrictEqual([
      { ...childrenMock, id: 'test-1' },
      { ...childrenMock, id: 'test-2' },
      { ...childrenMock, id: 'test-3' },
    ]);
  });

  it('should return when element is put as the last', () => {
    // before
    const result = getNextParentChildren(
      [{ ...childrenMock, id: 'test-2' }],
      2,
      [
        { ...childrenMock, id: 'test-1' },
        { ...childrenMock, id: 'test-3' },
      ],
      null,
    );

    // result
    expect(result).toStrictEqual([
      { ...childrenMock, id: 'test-1' },
      { ...childrenMock, id: 'test-3' },
      { ...childrenMock, id: 'test-2' },
    ]);
  });
});

describe('getNextParentChildren putting when grid columns', () => {
  it('should return when remove grid gap', () => {
    // before
    const result = getNextParentChildren(
      [{ ...childrenMock, id: 'test-2' }],
      0,
      [
        { ...childrenMock, id: 'unknown', type: ElementType.grid },
        { ...childrenMock, id: 'test-1' },
        { ...childrenMock, id: 'test-3' },
      ],
      null,
    );

    // result
    expect(result).toStrictEqual([
      { ...childrenMock, id: 'test-2' },
      { ...childrenMock, id: 'test-1' },
      { ...childrenMock, id: 'test-3' },
    ]);
  });

  it('should return when remove grid gap but left grid gaps when exceed', () => {
    // before
    const result = getNextParentChildren(
      [{ ...childrenMock, id: 'test-2' }],
      0,
      [
        { ...childrenMock, id: 'unknown', type: ElementType.grid },
        { ...childrenMock, id: 'unknown', type: ElementType.grid },
        { ...childrenMock, id: 'test-1' },
        { ...childrenMock, id: 'test-3' },
      ],
      null,
    );

    // result
    expect(result).toStrictEqual([
      { ...childrenMock, id: 'test-2' },
      { ...childrenMock, id: 'unknown', type: ElementType.grid },
      { ...childrenMock, id: 'test-1' },
      { ...childrenMock, id: 'test-3' },
    ]);
  });

  it('should return when remove grid gap with multiple items', () => {
    // before
    const result = getNextParentChildren(
      [
        { ...childrenMock, id: 'test-2' },
        { ...childrenMock, id: 'test-4' },
      ],
      0,
      [
        { ...childrenMock, id: 'unknown', type: ElementType.grid },
        { ...childrenMock, id: 'test-1' },
        { ...childrenMock, id: 'test-3' },
      ],
      null,
    );

    // result
    expect(result).toStrictEqual([
      { ...childrenMock, id: 'test-2' },
      { ...childrenMock, id: 'test-4' },
      { ...childrenMock, id: 'test-1' },
      { ...childrenMock, id: 'test-3' },
    ]);
  });

  it('should return when remove grid gap with multiple items but left grid gaps when exceed', () => {
    // before
    const result = getNextParentChildren(
      [
        { ...childrenMock, id: 'test-2' },
        { ...childrenMock, id: 'test-4' },
      ],
      0,
      [
        { ...childrenMock, id: 'unknown', type: ElementType.grid },
        { ...childrenMock, id: 'unknown', type: ElementType.grid },
        { ...childrenMock, id: 'unknown', type: ElementType.grid },
        { ...childrenMock, id: 'unknown', type: ElementType.grid },
        { ...childrenMock, id: 'test-1' },
        { ...childrenMock, id: 'test-3' },
      ],
      null,
    );

    // result
    expect(result).toStrictEqual([
      { ...childrenMock, id: 'test-2' },
      { ...childrenMock, id: 'test-4' },
      { ...childrenMock, id: 'unknown', type: ElementType.grid },
      { ...childrenMock, id: 'unknown', type: ElementType.grid },
      { ...childrenMock, id: 'test-1' },
      { ...childrenMock, id: 'test-3' },
    ]);
  });

  it('should return when remove grid gap when put in the middle', () => {
    // before
    const result = getNextParentChildren(
      [{ ...childrenMock, id: 'test-2' }],
      1,
      [
        { ...childrenMock, id: 'unknown', type: ElementType.grid },
        { ...childrenMock, id: 'test-1' },
        { ...childrenMock, id: 'test-3' },
      ],
      null,
    );

    // result
    expect(result).toStrictEqual([
      { ...childrenMock, id: 'unknown', type: ElementType.grid },
      { ...childrenMock, id: 'test-2' },
      { ...childrenMock, id: 'test-1' },
      { ...childrenMock, id: 'test-3' },
    ]);
  });

  it('should return when remove grid gap with multiple itmes when put in the middle', () => {
    // before
    const result = getNextParentChildren(
      [
        { ...childrenMock, id: 'test-2' },
        { ...childrenMock, id: 'test-4' },
      ],
      1,
      [
        { ...childrenMock, id: 'unknown', type: ElementType.grid },
        { ...childrenMock, id: 'test-1' },
        { ...childrenMock, id: 'test-3' },
      ],
      null,
    );

    // result
    expect(result).toStrictEqual([
      { ...childrenMock, id: 'unknown', type: ElementType.grid },
      { ...childrenMock, id: 'test-2' },
      { ...childrenMock, id: 'test-4' },
      { ...childrenMock, id: 'test-1' },
      { ...childrenMock, id: 'test-3' },
    ]);
  });

  it('should return when remove grid gap when as the last but index exceed length', () => {
    // before
    const result = getNextParentChildren(
      [{ ...childrenMock, id: 'test-2' }],
      3,
      [
        { ...childrenMock, id: 'unknown', type: ElementType.grid },
        { ...childrenMock, id: 'test-1' },
        { ...childrenMock, id: 'test-3' },
      ],
      null,
    );

    // result
    expect(result).toStrictEqual([
      { ...childrenMock, id: 'test-2' },
      { ...childrenMock, id: 'test-1' },
      { ...childrenMock, id: 'test-3' },
    ]);
  });

  it('should return when remove grid gap with multiple items when as the last but index exceed length', () => {
    // before
    const result = getNextParentChildren(
      [
        { ...childrenMock, id: 'test-2' },
        { ...childrenMock, id: 'test-4' },
      ],
      3,
      [
        { ...childrenMock, id: 'unknown', type: ElementType.grid },
        { ...childrenMock, id: 'test-1' },
        { ...childrenMock, id: 'test-3' },
      ],
      null,
    );

    // result
    expect(result).toStrictEqual([
      { ...childrenMock, id: 'test-2' },
      { ...childrenMock, id: 'test-1' },
      { ...childrenMock, id: 'test-3' },
      { ...childrenMock, id: 'test-4' },
    ]);
  });

  it('should return when remove grid gap when as the last but index exceed length with anchor', () => {
    // before
    const result = getNextParentChildren(
      [{ ...childrenMock, id: 'test-2' }],
      3,
      [
        { ...childrenMock, id: 'unknown', type: ElementType.grid },
        { ...childrenMock, id: 'test-1' },
        { ...childrenMock, id: 'test-3' },
      ],
      DropAnchorsPosition.right,
    );

    // result
    expect(result).toStrictEqual([
      { ...childrenMock, id: 'unknown', type: ElementType.grid },
      { ...childrenMock, id: 'test-1' },
      { ...childrenMock, id: 'test-3' },
      { ...childrenMock, id: 'test-2' },
    ]);
  });

  it('should return when remove grid gap with multiple items when as the last but index exceed length with anchor', () => {
    // before
    const result = getNextParentChildren(
      [
        { ...childrenMock, id: 'test-2' },
        { ...childrenMock, id: 'test-4' },
      ],
      3,
      [
        { ...childrenMock, id: 'unknown', type: ElementType.grid },
        { ...childrenMock, id: 'test-1' },
        { ...childrenMock, id: 'test-3' },
      ],
      DropAnchorsPosition.right,
    );

    // result
    expect(result).toStrictEqual([
      { ...childrenMock, id: 'unknown', type: ElementType.grid },
      { ...childrenMock, id: 'test-1' },
      { ...childrenMock, id: 'test-3' },
      { ...childrenMock, id: 'test-2' },
      { ...childrenMock, id: 'test-4' },
    ]);
  });
});
