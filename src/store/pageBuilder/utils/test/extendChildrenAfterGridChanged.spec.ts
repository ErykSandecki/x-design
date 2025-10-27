// mocks
import { childrenMock, elementMock, layoutMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { ElementType, LayoutType } from 'types';

// utils
import { extendChildrenAfterGridChanged } from '../extendChildrenAfterGridChanged';

describe('extendChildrenAfterGridChanged', () => {
  it('should not modify childrens element', () => {
    // before
    extendChildrenAfterGridChanged(elementMock);

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
    extendChildrenAfterGridChanged(element);

    // result
    expect(element.children).toStrictEqual([
      childrenMock,
      childrenMock,
      childrenMock,
      ...Array.from(Array(6), () => ({ id: 'unknown', type: ElementType.grid })),
    ]);
  });
});
