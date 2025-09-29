// mocks
import { elementMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_ALL_DATA } from '../../constants';

// store
import { mainParentIdSelectorCreator } from '../../selectors';

describe('mainParentIdSelectorCreator', () => {
  it('should return main id', () => {
    // before
    const selectorFunction = (mainParentIdSelectorCreator('test-2') as any).resultFunc;

    // result
    expect(
      selectorFunction({
        [BASE_ALL_DATA.id]: BASE_ALL_DATA,
        [elementMock.id]: {
          ...elementMock,
          children: ['test-2'],
        },
        ['test-2']: {
          ...elementMock,
          id: 'test-2',
          parentId: selectedElementMock.id,
        },
      }),
    ).toBe('test-1');
  });
});
