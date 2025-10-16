// mocks
import { elementMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_ELEMENTS } from '../../constants';

// store
import { mainParentIdSelectorCreator } from '../../selectors';

describe('mainParentIdSelectorCreator', () => {
  it('should return main id', () => {
    // before
    const selectorFunction = (mainParentIdSelectorCreator('test-2') as any).resultFunc;

    // result
    expect(
      selectorFunction({
        [BASE_ELEMENTS.id]: BASE_ELEMENTS,
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
