// mocks
import { elementMock, sizeMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { Unit } from 'types';

// utils
import { applyTypeSizeMinMax } from '../applyTypeSizeMinMax';

describe('applyTypeSizeMinMax', () => {
  it(`should apply fixed`, () => {
    // before
    const result = applyTypeSizeMinMax(
      {
        ...elementMock,
        height: {
          ...sizeMock,
          min: {
            ...sizeMock,
            value: 0,
          },
        },
      },
      'min',
      100,
      'height',
      'fixed',
    );

    // result
    expect(result.value).toBe(100);
  });

  it(`should apply auto`, () => {
    // before
    const result = applyTypeSizeMinMax(
      {
        ...elementMock,
        height: {
          ...sizeMock,
          min: {
            ...sizeMock,
            value: 0,
          },
        },
      },
      'min',
      100,
      'height',
      'auto',
    );

    // result
    expect(result.type).toBe('auto');
    expect(result.unit).toBe(undefined);
    expect(result.value).toBe('auto');
  });

  it(`should apply auto`, () => {
    // before
    const result = applyTypeSizeMinMax(
      {
        ...elementMock,
        height: {
          ...sizeMock,
          min: {
            ...sizeMock,
            value: 0,
          },
        },
      },
      'min',
      100,
      'height',
      'unit',
    );

    // result
    expect(result.type).toBe('fixed');
    expect(result.unit).toBe(Unit.percentage);
    expect(result.value).toBe(100);
  });
});
