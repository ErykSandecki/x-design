// utils
import { composeClassNames } from '../composeClassNames';

describe('composeClassNames', () => {
  it('should compose classNames', () => {
    // before
    const result = composeClassNames('A', ['A', 'a'] as const, ['B', 'b'] as const, ['C'] as const);

    // result
    expect(result).toStrictEqual({
      A: { modificators: { a: 'A--a' }, name: 'A' },
      B: { modificators: { b: 'A__B--b' }, name: 'A__B' },
      C: 'A__C',
    });
  });

  it('should compose only parent', () => {
    // before
    const result = composeClassNames('A');

    // result
    expect(result).toStrictEqual({ A: 'A' });
  });

  it('should compose without parent mofificators', () => {
    // before
    const result = composeClassNames('A', ['A'] as const, ['B', 'b'] as const, ['C'] as const);

    // result
    expect(result).toStrictEqual({
      A: 'A',
      B: { modificators: { b: 'A__B--b' }, name: 'A__B' },
      C: 'A__C',
    });
  });
});
