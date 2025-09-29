import { noop } from 'lodash';

// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { Unit } from 'types';

// utils
import { applyTypeSize } from '../applyTypeSize';

describe('applyTypeSize', () => {
  beforeAll(() => {
    // mock
    document.getElementById = (): any => ({ querySelector: noop }) as any;
    window.getComputedStyle = (): any => ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;
  });

  it(`should apply auto`, () => {
    // before
    const result = applyTypeSize(elementMock, 100, 'height', 'auto');

    // result
    expect(result.unit).toBe(undefined);
    expect(result.value).toBe('auto');
  });

  it(`should apply fixed`, () => {
    // before
    const result = applyTypeSize(elementMock, 100, 'height', 'fixed');

    // result
    expect(result.unit).toBe(undefined);
    expect(result.value).toBe(100);
  });

  it(`should apply max and remove`, () => {
    // before
    const result1 = applyTypeSize(elementMock, 100, 'height', 'max');

    // result
    expect(result1.max).toBe(100);

    // before
    const result2 = applyTypeSize(
      { ...elementMock, height: { ...elementMock.height, max: 100 } },
      100,
      'height',
      'max',
    );

    // result
    expect(result2.max).toBe(undefined);
  });

  it(`should apply min and remove`, () => {
    // before
    const result1 = applyTypeSize(elementMock, 100, 'height', 'min');

    // result
    expect(result1.min).toBe(100);

    // before
    const result2 = applyTypeSize(
      { ...elementMock, height: { ...elementMock.height, min: 100 } },
      100,
      'height',
      'min',
    );

    // result
    expect(result2.min).toBe(undefined);
  });

  it(`should apply unit`, () => {
    // before
    const result = applyTypeSize(elementMock, 100, 'height', 'unit');

    // result
    expect(result.unit).toBe(Unit.percentage);
    expect(result.value).toBe(100);
  });
});
