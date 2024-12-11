// utils
import { isTypeGuard } from '../guards';

type TType = {
  key1: string;
  key2: string;
};

type TTuple = [TType, boolean];

describe('isTypeGuard', () => {
  it('should return true when object is equal to the type', () => {
    // mock
    const type = { key1: 'key1', key2: 'key2' };

    // before
    const result = isTypeGuard<TType>(type, ['key1', 'key2']);

    // result
    expect(result).toBe(true);
  });

  it('should return false when object is not equal to the type', () => {
    // mock
    const type = { key1: 'key1' };

    // before
    const result = isTypeGuard<TType>(type, ['key1', 'key2']);

    // result
    expect(result).toBe(false);
  });

  it('should return false when object is not equal to the type', () => {
    // mock
    const type = '';

    // before
    const result = isTypeGuard<TType>(type, ['key1', 'key2']);

    // result
    expect(result).toBe(false);
  });

  it('should return true when object is equal to the tupple', () => {
    // mock
    const type = { key1: 'key1', key2: 'key2' };
    const condition = false;

    // before
    const result = isTypeGuard<TTuple>([type, condition], ['0', '1']);

    // result
    expect(result).toBe(true);
  });

  it('should return false when object is not equal to the tupple', () => {
    // mock
    const type = { key1: 'key1', key2: 'key2' };

    // before
    const result = isTypeGuard<TTuple>([type], ['0', '1']);

    // result
    expect(result).toBe(false);
  });

  it('should return false when object is not equal to the tupple', () => {
    // mock
    const type = 'type';

    // before
    const result = isTypeGuard<TTuple>(type, ['0', '1']);

    // result
    expect(result).toBe(false);
  });
});
