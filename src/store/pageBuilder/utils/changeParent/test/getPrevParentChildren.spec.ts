// mocks
import { childrenMock, elementMock, layoutMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { ElementType, LayoutType } from 'types';

// utils
import { getPrevParentChildren } from '../getPrevParentChildren';

describe('getPrevParentChildren', () => {
  it('should return filtered elements', () => {
    // before
    const result = getPrevParentChildren([{ id: 'test-2', type: ElementType.frame }], false, {
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
    const result = getPrevParentChildren([{ id: 'test-2', type: ElementType.frame }], true, {
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
