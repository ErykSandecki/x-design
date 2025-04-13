// mocks
import { eventsMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { isHoverSelectorCreator } from '../../selectors';

describe('isHoverSelectorCreator', () => {
  it('should return false', () => {
    // before
    const selectorFunction = (isHoverSelectorCreator('-1') as any).resultFunc;

    // result
    expect(selectorFunction(eventsMock)).toBe(true);
  });
});
