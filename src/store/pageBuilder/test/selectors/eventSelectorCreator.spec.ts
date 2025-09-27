// mocks
import { eventsMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { eventSelectorCreator } from '../../selectors';

describe('eventSelectorCreator', () => {
  it('should return coordinates', () => {
    // before
    const selectorFunction = (eventSelectorCreator('isMultipleMoving') as any).resultFunc;

    // result
    expect(selectorFunction(eventsMock)).toBe(false);
  });
});
