// types
import { TSyncValidator } from '../../types';

// utils
import { getErrorsFromSyncValidators } from '../validators';

describe('getErrorsFromSyncValidators', () => {
  const syncValidator = (value: any): any => (value ? 'Success' : 'Error');

  it('should trigger validators & return errors', () => {
    // before
    const validators = [(): any => syncValidator(''), (): any => syncValidator('value')] as Array<TSyncValidator>;

    // action
    const result = getErrorsFromSyncValidators(validators, '', undefined, ((value: string) => value) as TT);

    // result
    expect(result).toStrictEqual(['Error', 'Success']);
  });
});
