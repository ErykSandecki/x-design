// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { filterSelectedElements } from '../filterSelectedElements';

describe('filterSelectedElements', () => {
  it(`should not filter when single element`, () => {
    // before
    const result = filterSelectedElements([selectedElementMock], {} as any);

    // result
    expect(result).toStrictEqual([selectedElementMock]);
  });

  it(`should filter elements`, () => {
    // before
    const result = filterSelectedElements(
      [
        selectedElementMock,
        { ...selectedElementMock, id: '2', parentId: selectedElementMock.id },
      ],
      {} as any,
    );

    // result
    expect(result).toStrictEqual([selectedElementMock]);
  });
});
