// mocks
import { childrenMock, elementMock, layoutMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { ElementType, LayoutType } from 'types';

// utils
import { filterDraggableElements } from '../filterDraggableElements';

describe('filterDraggableElements', () => {
  it('should return filtered elements', () => {
    // before
    const result = filterDraggableElements([{ id: 'test-2', type: ElementType.frame }], {
      ...elementMock,
      children: [
        { ...childrenMock, id: 'test-2' },
        { ...childrenMock, id: 'test-3' },
      ],
    });

    // result
    expect(result).toStrictEqual([{ id: 'test-3', type: 'frame' }]);
  });

  it('should return filtered elements when grid', () => {
    // before
    const result = filterDraggableElements([{ id: 'test-2', type: ElementType.frame }], {
      ...elementMock,
      children: [
        { ...childrenMock, id: 'test-2' },
        { ...childrenMock, id: 'test-3' },
      ],
      layout: {
        ...layoutMock,
        type: LayoutType.grid,
      },
    });

    // result
    expect(result).toStrictEqual([
      { id: 'unknown', type: 'grid' },
      { id: 'test-3', type: 'frame' },
    ]);
  });
});
