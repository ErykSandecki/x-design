// types
import { TT } from 'types/generic';

// utils
import { password } from '../../syncValidators';

describe('password', () => {
  it('should be valid', () => {
    // before
    const t = (key: string) => key;
    const result = password(t as TT, '!Password123456');

    // result
    expect(result).toBe('');
  });

  it('should not be valid', () => {
    // before
    const t = (key: string) => key;
    const result = password(t as TT, '');

    // result
    expect(result).toBe('formValidators.password');
  });
});
