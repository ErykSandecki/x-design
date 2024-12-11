// others
import { DATA_TEST_PREFIX } from '../constants';

// types
import { E2EAttribute } from 'types/e2e';

// utils
import { getAttributes } from '../utils';

describe('getAttributes', () => {
  it('should return one attribute', () => {
    // before
    const result = getAttributes(E2EAttribute.test1, 'test-1');

    // result
    expect(result).toStrictEqual({
      [`${DATA_TEST_PREFIX}-${E2EAttribute.test1}`]: 'test-1',
    });
  });

  it('should return multiple attributes', () => {
    // before
    const result = getAttributes(
      [E2EAttribute.test1, E2EAttribute.test2],
      ['test-1', 'test-2'],
    );

    // result
    expect(result).toStrictEqual({
      [`${DATA_TEST_PREFIX}-${E2EAttribute.test1}`]: 'test-1',
      [`${DATA_TEST_PREFIX}-${E2EAttribute.test2}`]: 'test-2',
    });
  });
});
