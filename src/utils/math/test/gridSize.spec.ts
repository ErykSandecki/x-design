// utils
import { gridSize } from '../gridSize';

describe('gridSize', () => {
  it(`should return gridSize`, () => {
    // before
    const result = gridSize(10, 1);

    // result
    expect(result).toStrictEqual({ columns: 1, rows: 10 });
  });
});
