// mocks
import { childrenMock, elementMock, layoutMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { ElementType } from 'types';

// utils
import { getCorrectGrid } from '../getCorrectGrid';

describe('getCorrectGrid', () => {
  it(`should return default grid`, () => {
    // before
    const result = getCorrectGrid(
      { columns: 2 },
      {
        ...elementMock,
        children: [childrenMock, childrenMock],
        layout: {
          ...layoutMock,
          grid: {
            columns: 2,
            rows: 1,
          },
        },
      },
    );

    // result
    expect(result).toStrictEqual({ columns: 2, rows: 1 });
  });

  it(`should return default grid when is odd`, () => {
    // before
    const result = getCorrectGrid(
      { columns: 2 },
      {
        ...elementMock,
        children: [childrenMock, childrenMock, childrenMock, { id: 'unknown', type: ElementType.grid }],
        layout: {
          ...layoutMock,
          grid: {
            columns: 2,
            rows: 2,
          },
        },
      },
    );

    // result
    expect(result).toStrictEqual({ columns: 2, rows: 2 });
  });

  it(`should fix grid`, () => {
    // before
    const result = getCorrectGrid(
      { columns: 1 },
      {
        ...elementMock,
        children: [childrenMock, childrenMock],
        layout: {
          ...layoutMock,
          grid: {
            columns: 2,
            rows: 1,
          },
        },
      },
    );

    // result
    expect(result).toStrictEqual({ columns: 1, rows: 2 });
  });
});
