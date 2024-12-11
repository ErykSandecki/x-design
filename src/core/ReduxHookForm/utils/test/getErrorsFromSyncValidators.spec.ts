// types
import { TSyncValidator } from '../../types';
import { TT } from 'types/generic';

// utils
import { getErrorsFromSyncValidators } from '../validators';

describe('getErrorsFromSyncValidators', () => {
  const syncValidator = (value: any) => (value ? 'Success' : 'Error');

  it('should trigger validators & return errors', () => {
    // before
    const validators = [
      () => syncValidator(''),
      () => syncValidator('value'),
    ] as Array<TSyncValidator>;

    // action
    const result = getErrorsFromSyncValidators(
      validators,
      '',
      undefined,
      ((value: string) => value) as TT,
    );

    // result
    expect(result).toStrictEqual(['Error', 'Success']);
  });
});
