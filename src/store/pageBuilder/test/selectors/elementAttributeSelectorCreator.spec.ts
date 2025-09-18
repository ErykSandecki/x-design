// mocks
import { elementAllDataMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { elementAttributeSelectorCreator } from '../../selectors';

describe('elementAttributeSelectorCreator', () => {
  it('should get attribute', () => {
    // before
    const selectorFunction = (
      elementAttributeSelectorCreator('deepLevel', elementAllDataMock.id) as any
    ).resultFunc;

    // result
    expect(
      selectorFunction({ [elementAllDataMock.id]: elementAllDataMock }),
    ).toBe(0);
  });
});
