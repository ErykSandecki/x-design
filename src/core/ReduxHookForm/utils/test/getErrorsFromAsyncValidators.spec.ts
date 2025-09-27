// types
import { TAsyncValidator, TFieldValue } from '../../types';

// utils
import { getErrorsFromAsyncValidators } from '../validators';

const asyncValidator = (value: TFieldValue): any => new Promise((resolve) => resolve(value ? 'Success' : 'Error'));

describe('getErrorsFromAsyncValidators', () => {
  it('should trigger validators & return errors', async () => {
    // before
    const validators = [(): any => asyncValidator(''), (): any => asyncValidator('value')] as Array<TAsyncValidator>;

    // action
    const result = await getErrorsFromAsyncValidators(validators, '', undefined, ((value: string) => value) as TT);

    // result
    expect(result).toStrictEqual(['Error', 'Success']);
  });
});
