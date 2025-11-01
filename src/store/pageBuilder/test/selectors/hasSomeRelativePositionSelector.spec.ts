// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { hasSomeRelativePositionSelector } from '../../selectors';

describe('hasSomeRelativePositionSelector', () => {
  it('should has alignment', () => {
    // before
    const selectorFunction = (hasSomeRelativePositionSelector as any).resultFunc;

    // result
    expect(selectorFunction([{ ...selectedElementMock, position: 'relative' }])).toBe(true);
  });
});
