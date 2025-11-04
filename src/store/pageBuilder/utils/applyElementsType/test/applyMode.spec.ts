// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { Unit } from 'types';

// utils
import { applyMode } from '../applyMode';

describe('applyMode', () => {
  it(`should apply fixed`, () => {
    // before
    const result = applyMode(elementMock, 'fixed', 'opacity', undefined);

    // result
    expect(result).toStrictEqual({ mode: 'fixed', unit: undefined, value: 100 });
  });

  it(`should apply auto`, () => {
    // before
    const result = applyMode(elementMock, 'auto', 'opacity', undefined);

    // result
    expect(result).toStrictEqual({ mode: 'auto', unit: undefined, value: 100 });
  });

  it(`should apply unit`, () => {
    // before
    const result = applyMode(elementMock, 'unit', 'opacity', Unit.percentage);

    // result
    expect(result).toStrictEqual({ mode: 'unit', unit: Unit.percentage, value: 100 });
  });

  it(`should return variable`, () => {
    // before
    const result = applyMode(elementMock, 'variable', 'opacity', undefined);

    // result
    expect(result).toStrictEqual({ mode: 'variable', unit: undefined, value: 100 });
  });
});
