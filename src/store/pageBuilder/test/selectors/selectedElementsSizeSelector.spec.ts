// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { selectedElementsSizeSelector } from '../../selectors';

describe('selectedElementsSizeSelector', () => {
  it('should return length', () => {
    // before
    const selectorFunction = (selectedElementsSizeSelector as any).resultFunc;

    // result
    expect(selectorFunction([selectedElementMock])).toBe(1);
  });
});
