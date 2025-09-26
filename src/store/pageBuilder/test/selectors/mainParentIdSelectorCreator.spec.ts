// mocks
import {
  elementStaticDataMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_STATIC_DATA } from '../../constants';

// store
import { mainParentIdSelectorCreator } from '../../selectors';

describe('mainParentIdSelectorCreator', () => {
  it('should return main id', () => {
    // before
    const selectorFunction = (mainParentIdSelectorCreator('test-2') as any)
      .resultFunc;

    // result
    expect(
      selectorFunction({
        [BASE_STATIC_DATA.id]: BASE_STATIC_DATA,
        [elementStaticDataMock.id]: {
          ...elementStaticDataMock,
          children: ['test-2'],
        },
        ['test-2']: {
          ...elementStaticDataMock,
          id: 'test-2',
          parentId: selectedElementMock.id,
        },
      }),
    ).toBe('test-1');
  });
});
