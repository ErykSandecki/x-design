// mocks
import { reducerHistoryMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { canUndoReduxHistorySelector } from '../../selectors';

describe('canUndoReduxHistorySelector', () => {
  it('should undo', () => {
    // before
    const selectorFunction = (canUndoReduxHistorySelector as any).resultFunc;

    // result
    expect(
      selectorFunction({
        reducerHistory: reducerHistoryMock,
        reducerHistoryIndex: 0,
      }),
    ).toBe(true);
  });

  it('should not undo', () => {
    // before
    const selectorFunction = (canUndoReduxHistorySelector as any).resultFunc;

    // result
    expect(
      selectorFunction({
        reducerHistory: reducerHistoryMock,
        reducerHistoryIndex: 1,
      }),
    ).toBe(false);
  });
});
