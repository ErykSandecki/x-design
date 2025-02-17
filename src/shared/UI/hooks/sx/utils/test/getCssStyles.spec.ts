// types
import { ColorsTheme } from 'types';
import { Pallete } from '../../enums/pallete';

// utils
import { enumToArray } from 'utils';
import { getCssStyles } from '../utils';

describe('getCssStyles', () => {
  it('should return set of styles', () => {
    // mock
    const keys = enumToArray<string>(Pallete);

    // before
    const result = getCssStyles(
      { bg: ColorsTheme.blue1, cl: ColorsTheme.blue1 },
      keys,
    );

    // result
    expect(result).toBe(`cl: blue1;\nbg: blue1;`);
  });

  it('should return empty data', () => {
    // mock
    const keys = enumToArray<string>(Pallete);

    // before
    const result = getCssStyles({}, keys);

    // result
    expect(result).toBe('');
  });
});
