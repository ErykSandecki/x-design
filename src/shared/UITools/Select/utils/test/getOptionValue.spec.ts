// utils
import { getOptionValue } from '../getOptionValue';

describe('getOptionValue', () => {
  it('Should return value when LI', () => {
    // before
    const result = getOptionValue({ target: { getAttribute: () => 'value', tagName: 'LI' } } as any);

    // result
    expect(result).toEqual('value');
  });

  it('Should return undefined', () => {
    // before
    const result = getOptionValue({ target: { getAttribute: () => 'value', tagName: 'UL' } } as any);

    // result
    expect(result).toEqual(undefined);
  });
});
