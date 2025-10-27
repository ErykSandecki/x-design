// mocks
import { childrenMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { ElementType } from 'types';

// utils
import { getCorrectChildren } from '../getCorrectChildren';

describe('getCorrectChildren', () => {
  it(`should return default children`, () => {
    // before
    const result = getCorrectChildren([childrenMock, childrenMock], { columns: 1, rows: 2 });

    // result
    expect(result).toStrictEqual([childrenMock, childrenMock]);
  });

  it(`should return with adding missing`, () => {
    // before
    const result = getCorrectChildren([childrenMock, childrenMock], { columns: 2, rows: 2 });

    // result
    expect(result).toStrictEqual([
      childrenMock,
      childrenMock,
      { id: 'unknown', type: ElementType.grid },
      { id: 'unknown', type: ElementType.grid },
    ]);
  });
});
