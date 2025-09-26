// utils
import { composeClassNames } from '../composeClassNames';

describe('composeClassNames', () => {
  // it('should compose classNames', () => {
  //   // before
  //   const result = composeClassNames('A', ['A', 'a'], ['B', 'b'], ['C']);

  //   // result
  //   expect(result).toStrictEqual({
  //     A: { modificators: { a: 'A--a' }, name: 'A' },
  //     B: { modificators: { b: 'A__B--b' }, name: 'A__B' },
  //     C: 'A__C',
  //   });
  // });

  it('should compose only parent', () => {
    // before
    const result = composeClassNames('A');

    // result
    expect(result).toStrictEqual(undefined);
  });
});
