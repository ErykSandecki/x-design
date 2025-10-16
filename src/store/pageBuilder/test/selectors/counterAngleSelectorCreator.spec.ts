// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_ELEMENTS } from '../../constants';

// store
import { counterAngleSelectorCreator } from '../../selectors';

describe('counterAngleSelectorCreator', () => {
  it('should return counter angle', () => {
    // before
    const selectorFunction = (counterAngleSelectorCreator('test-2') as any).resultFunc;

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
          parentId: elementMock.id,
        },
      }),
    ).toBe(-0);
  });

  it('should return default angle', () => {
    // before
    const selectorFunction = (counterAngleSelectorCreator('-1') as any).resultFunc;

    // result
    expect(selectorFunction({})).toBe(0);
  });
});
