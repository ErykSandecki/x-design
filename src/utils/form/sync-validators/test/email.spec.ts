// types
import { TT } from 'types';

// utils
import { email } from '../../syncValidators';

describe('email', () => {
  it('should be valid', () => {
    // before
    const t = (key: string) => key;
    const result = email(t as TT, 'email@email.com');

    // result
    expect(result).toBe('');
  });

  it('should not be valid', () => {
    // before
    const t = (key: string) => key;
    const result = email(t as TT, '');

    // result
    expect(result).toBe('formValidators.email');
  });
});
