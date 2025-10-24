// utils
import { getValueAsText } from '../getValueAsText';

const t = ((value: string) => value) as TT;

describe('getValueAsText', () => {
  it('Should return value', () => {
    // before
    const result = getValueAsText(false, t, '', 'value');

    // result
    expect(result).toEqual('value');
  });

  it('Should return translated value', () => {
    // before
    const result = getValueAsText(false, t, 'key', 'value');

    // result
    expect(result).toEqual('key.value');
  });
});
