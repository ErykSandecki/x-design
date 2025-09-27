// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { areParentsTheSameSelector } from '../../selectors';

describe('areParentsTheSameSelector', () => {
  it('should parents be the same', () => {
    // before
    const selectorFunction = (areParentsTheSameSelector as any).resultFunc;

    // result
    expect(selectorFunction([selectedElementMock, selectedElementMock])).toBe(true);
  });

  it('should parents not be the same', () => {
    // before
    const selectorFunction = (areParentsTheSameSelector as any).resultFunc;

    // result
    expect(selectorFunction([selectedElementMock, { ...selectedElementMock, parentId: '0' }])).toBe(false);
  });

  it('should return true default', () => {
    // before
    const selectorFunction = (areParentsTheSameSelector as any).resultFunc;

    // result
    expect(selectorFunction([selectedElementMock])).toBe(true);
  });
});
