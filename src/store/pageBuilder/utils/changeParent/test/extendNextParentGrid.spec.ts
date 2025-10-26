// mocks
import { childrenMock, elementMock, layoutMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';
import { LayoutType } from 'types';

// utils
import { extendNextParentGrid } from '../extendNextParentGrid';

describe('extendNextParentGrid', () => {
  it('should not modify grid', () => {
    // before
    extendNextParentGrid(elementMock, null);

    // result
    expect(elementMock.layout.grid).toStrictEqual(elementMock.layout.grid);
  });

  it('should extend rows when missing cells but no anchor', () => {
    // mock
    const element = {
      ...elementMock,
      children: Array.from(Array(10), () => childrenMock),
      layout: {
        ...layoutMock,
        grid: {
          columns: 3,
          rows: 3,
        },
        type: LayoutType.grid,
      },
    };

    // before
    extendNextParentGrid(element, null);

    // result
    expect(element.layout.grid).toStrictEqual({ columns: 3, rows: 4 });
  });

  it('should extend columns when missing cells but no anchor', () => {
    // mock
    const element = {
      ...elementMock,
      children: Array.from(Array(10), () => childrenMock),
      layout: {
        ...layoutMock,
        grid: {
          columns: 4,
          rows: 3,
        },
        type: LayoutType.grid,
      },
    };

    // before
    extendNextParentGrid(element, null);

    // result
    expect(element.layout.grid).toStrictEqual({ columns: 4, rows: 3 });
  });

  it('should extend rows when missing cells but anchor is bottom', () => {
    // mock
    const element = {
      ...elementMock,
      children: Array.from(Array(13), () => childrenMock),
      layout: {
        ...layoutMock,
        grid: {
          columns: 4,
          rows: 3,
        },
        type: LayoutType.grid,
      },
    };

    // before
    extendNextParentGrid(element, DropAnchorsPosition.bottom);

    // result
    expect(element.layout.grid).toStrictEqual({ columns: 4, rows: 4 });
  });

  it('should extend rows when missing cells but anchor is top', () => {
    // mock
    const element = {
      ...elementMock,
      children: Array.from(Array(13), () => childrenMock),
      layout: {
        ...layoutMock,
        grid: {
          columns: 4,
          rows: 3,
        },
        type: LayoutType.grid,
      },
    };

    // before
    extendNextParentGrid(element, DropAnchorsPosition.top);

    // result
    expect(element.layout.grid).toStrictEqual({ columns: 4, rows: 4 });
  });

  it('should extend cloumns when missing cells but anchor is left', () => {
    // mock
    const element = {
      ...elementMock,
      children: Array.from(Array(13), () => childrenMock),
      layout: {
        ...layoutMock,
        grid: {
          columns: 3,
          rows: 4,
        },
        type: LayoutType.grid,
      },
    };

    // before
    extendNextParentGrid(element, DropAnchorsPosition.left);

    // result
    expect(element.layout.grid).toStrictEqual({ columns: 4, rows: 4 });
  });

  it('should extend cloumns when missing cells but anchor is right', () => {
    // mock
    const element = {
      ...elementMock,
      children: Array.from(Array(13), () => childrenMock),
      layout: {
        ...layoutMock,
        grid: {
          columns: 3,
          rows: 4,
        },
        type: LayoutType.grid,
      },
    };

    // before
    extendNextParentGrid(element, DropAnchorsPosition.right);

    // result
    expect(element.layout.grid).toStrictEqual({ columns: 4, rows: 4 });
  });
});
