// mocks
import { childrenMock, elementMock, layoutMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { LayoutType } from 'types';

// utils
import { getGridLayout } from '../getGridLayout';

describe('getGridLayout', () => {
  it(`should return default gird`, () => {
    // before
    const result = getGridLayout(elementMock, LayoutType.freeForm);

    // result
    expect(result).toStrictEqual({ columns: 1, rows: 1 });
  });

  it(`should return grid when prev was vertical`, () => {
    // before
    const result = getGridLayout(
      {
        ...elementMock,
        children: [
          { ...childrenMock, id: 'test-2' },
          { ...childrenMock, id: 'test-3' },
          { ...childrenMock, id: 'test-4' },
        ],
        layout: { ...layoutMock, type: LayoutType.vertical },
      },
      LayoutType.grid,
    );

    // result
    expect(result).toStrictEqual({ columns: 1, rows: 3 });
  });

  it(`should return grid when prev was horizontal`, () => {
    // before
    const result = getGridLayout(
      {
        ...elementMock,
        children: [
          { ...childrenMock, id: 'test-2' },
          { ...childrenMock, id: 'test-3' },
          { ...childrenMock, id: 'test-4' },
        ],
        layout: { ...layoutMock, type: LayoutType.horizontal },
      },
      LayoutType.grid,
    );

    // result
    expect(result).toStrictEqual({ columns: 3, rows: 1 });
  });
});
