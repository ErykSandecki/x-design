// mocks
import { childrenMock, elementMock, layoutMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { ElementType, LayoutType } from 'types';

// utils
import { getPrevParentChildren } from '../getPrevParentChildren';

describe('getPrevParentChildren', () => {
  it('should return children without included to remove', () => {
    // before
    const result = getPrevParentChildren(
      [
        { ...childrenMock, id: 'test-2' },
        { ...childrenMock, id: 'test-3' },
      ],
      {
        ...elementMock,
        children: [
          { ...childrenMock, id: 'test-2' },
          { ...childrenMock, id: 'test-3' },
          { ...childrenMock, id: 'test-4' },
        ],
      },
    );

    // result
    expect(result).toStrictEqual([{ ...childrenMock, id: 'test-4' }]);
  });

  it('should return children without included to remove but with grid gaps', () => {
    // before
    const result = getPrevParentChildren(
      [
        { ...childrenMock, id: 'test-2' },
        { ...childrenMock, id: 'test-3' },
      ],
      {
        ...elementMock,
        children: [
          { ...childrenMock, id: 'test-2' },
          { ...childrenMock, id: 'test-3' },
          { ...childrenMock, id: 'test-4' },
        ],
        layout: {
          ...layoutMock,
          type: LayoutType.grid,
        },
      },
    );

    // result
    expect(result).toStrictEqual([
      { ...childrenMock, id: 'unknown', type: ElementType.grid },
      { ...childrenMock, id: 'unknown', type: ElementType.grid },
      { ...childrenMock, id: 'test-4' },
    ]);
  });
});
