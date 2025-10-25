// mocks
import { childrenMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { ElementType } from 'types';

// utils
import { getNextParentChildren } from '../getNextParentChildren';

describe('getNextParentChildren', () => {
  it('should return return prev children', () => {
    // before
    const result = getNextParentChildren(0, false, [childrenMock], false, [childrenMock]);

    // result
    expect(result).toStrictEqual([childrenMock]);
  });

  it('should return return next children', () => {
    // before
    const result = getNextParentChildren(0, false, [childrenMock, { ...childrenMock, id: 'test-2' }], true, [
      childrenMock,
    ]);

    // result
    expect(result).toStrictEqual([childrenMock, { ...childrenMock, id: 'test-2' }]);
  });

  it('should return return next children without grid', () => {
    // before
    const result = getNextParentChildren(
      0,
      true,
      [
        { ...childrenMock, type: ElementType.grid },
        { ...childrenMock, id: 'test-2' },
      ],
      true,
      [childrenMock],
    );

    // result
    expect(result).toStrictEqual([{ ...childrenMock, id: 'test-2' }]);
  });
});
