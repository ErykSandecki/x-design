import { noop } from 'lodash';

// mocks
import { elementMock, sizeMock } from 'test/mocks/reducer/pageBuilderMock';

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
    expect(result.type).toBe('auto');
    expect(result.unit).toBe(undefined);
    expect(result.value).toBe('auto');
  });

  it(`should apply fixed`, () => {
    // before
    const result = applyTypeSize(elementMock, 100, 'height', 'fixed');

    // result
    expect(result.type).toBe('fixed');
    expect(result.unit).toBe(undefined);
    expect(result.value).toBe(100);
  });

  it(`should apply max and remove`, () => {
    // before
    const result1 = applyTypeSize(elementMock, 100, 'height', 'max');

    // result
    expect(result1.max).toStrictEqual({ type: 'fixed', value: 100 });
    expect(result1.type).toBe('fixed');

    // before
    const result2 = applyTypeSize(
      { ...elementMock, height: { ...elementMock.height, max: { ...sizeMock, value: 100 } } },
      100,
      'height',
      'max',
    );

    // result
    expect(result2.max).toBe(undefined);
    expect(result2.type).toBe('fixed');
  });

  it(`should apply min and remove`, () => {
    // before
    const result1 = applyTypeSize(elementMock, 100, 'height', 'min');

    // result
    expect(result1.min).toStrictEqual({ type: 'fixed', value: 100 });
    expect(result1.type).toBe('fixed');

    // before
    const result2 = applyTypeSize(
      { ...elementMock, height: { ...elementMock.height, min: { ...sizeMock, value: 100 } } },
      100,
      'height',
      'min',
    );

    // result
    expect(result2.min).toBe(undefined);
    expect(result2.type).toBe('fixed');
  });

  it(`should apply unit`, () => {
    // before
    const result = applyTypeSize(elementMock, 100, 'height', 'unit');

    // result
    expect(result.type).toBe('fixed');
    expect(result.unit).toBe(Unit.percentage);
    expect(result.value).toBe(100);
  });
});
