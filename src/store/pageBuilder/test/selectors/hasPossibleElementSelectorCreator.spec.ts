// mocks
import { eventsMock, possibleElementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { hasPossibleElementSelectorCreator } from '../../selectors';

describe('hasPossibleElementSelectorCreator', () => {
  it('should return false', () => {
    // before
    const selectorFunction = (hasPossibleElementSelectorCreator('-1') as any).resultFunc;

    // result
    expect(selectorFunction({ ...eventsMock, possibleElement: possibleElementMock })).toBe(true);
  });
});
