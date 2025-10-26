// mocks
import { childrenMock, elementMock, layoutMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { ElementType, LayoutType } from 'types';

// utils
import { extendNextParentChildrenAfterGridChanged } from '../extendNextParentChildrenAfterGridChanged';

describe('extendNextParentChildrenAfterGridChanged', () => {
  it('should not modify childrens element', () => {
    // before
    extendNextParentChildrenAfterGridChanged(elementMock);

    // result
    expect(elementMock.children).toStrictEqual(elementMock.children);
  });

  it('should extend parent children when columns & rows less than children', () => {
    // mock
    const element = {
      ...elementMock,
      children: [childrenMock, childrenMock, childrenMock],
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
    extendNextParentChildrenAfterGridChanged(element);

    // result
    expect(element.children).toStrictEqual([
      childrenMock,
      childrenMock,
      childrenMock,
      ...Array.from(Array(6), () => ({ id: 'unknown', type: ElementType.grid })),
    ]);
  });
});
