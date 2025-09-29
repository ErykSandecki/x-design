// mocks
import { childrenMock, eventsMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { isDraggableSelectorCreator } from '../../selectors';

describe('isDraggableSelectorCreator', () => {
  it('should return true', () => {
    // before
    const selectorFunction = (isDraggableSelectorCreator('-1') as any).resultFunc;

    // result
    expect(selectorFunction({ ...eventsMock, draggableElements: [{ ...childrenMock, id: '-1' }] })).toBe(true);
  });

  it('should return false', () => {
    // before
    const selectorFunction = (isDraggableSelectorCreator('-1') as any).resultFunc;

    // result
    expect(selectorFunction(eventsMock)).toBe(false);
  });
});
