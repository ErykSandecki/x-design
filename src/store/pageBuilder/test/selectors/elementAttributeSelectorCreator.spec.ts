// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { elementAttributeSelectorCreator } from '../../selectors';

describe('elementAttributeSelectorCreator', () => {
  it('should get attribute', () => {
    // before
    const selectorFunction = (elementAttributeSelectorCreator('deepLevel', elementMock.id) as any).resultFunc;

    // result
    expect(selectorFunction({ [elementMock.id]: elementMock })).toBe(0);
  });
});
