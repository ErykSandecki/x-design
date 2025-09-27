// mocks
import { eventsMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { isDraggableSelectorCreator } from '../../selectors';

describe('isDraggableSelectorCreator', () => {
  it('should return false', () => {
    // before
    const selectorFunction = (isDraggableSelectorCreator('-1') as any).resultFunc;

    // result
    expect(selectorFunction(eventsMock)).toBe(false);
  });
});
