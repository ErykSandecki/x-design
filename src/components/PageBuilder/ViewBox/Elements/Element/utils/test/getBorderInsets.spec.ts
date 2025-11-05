// mocks
import { insetsMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { Unit } from 'types';

// utils
import { getBorderInsets } from '../getBorderInsets';

describe('getBorderInsets', () => {
  it(`should return insets`, () => {
    // before
    const result = getBorderInsets(insetsMock);

    // result
    expect(result).toStrictEqual({
      borderBottomLeftRadius: '0px',
      borderBottomRightRadius: '0px',
      borderTopLeftRadius: '0px',
      borderTopRightRadius: '0px',
    });
  });

  it(`should return insets when unit`, () => {
    // before
    const result = getBorderInsets({
      b: { mode: 'unit', unit: Unit.percentage, value: 0 },
      l: { mode: 'unit', unit: Unit.percentage, value: 0 },
      r: { mode: 'unit', unit: Unit.percentage, value: 0 },
      t: { mode: 'unit', unit: Unit.percentage, value: 0 },
    });

    // result
    expect(result).toStrictEqual({
      borderBottomLeftRadius: '0%',
      borderBottomRightRadius: '0%',
      borderTopLeftRadius: '0%',
      borderTopRightRadius: '0%',
    });
  });
});
