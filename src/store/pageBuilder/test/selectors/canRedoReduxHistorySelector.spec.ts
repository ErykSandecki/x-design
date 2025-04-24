// mocks
import { reducerHistoryMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { canRedoReduxHistorySelector } from '../../selectors';

describe('canRedoReduxHistorySelector', () => {
  it('should redo', () => {
    // before
    const selectorFunction = (canRedoReduxHistorySelector as any).resultFunc;

    // result
    expect(
      selectorFunction({
        reducerHistory: reducerHistoryMock,
        reducerHistoryIndex: 1,
      }),
    ).toBe(true);
  });

  it('should not redo', () => {
    // before
    const selectorFunction = (canRedoReduxHistorySelector as any).resultFunc;

    // result
    expect(
      selectorFunction({
        reducerHistory: reducerHistoryMock,
        reducerHistoryIndex: 0,
      }),
    ).toBe(false);
  });
});
