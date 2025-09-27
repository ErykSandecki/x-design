// utils
import { getDropAnchorsPosition } from '../getDropAnchorsPosition';

describe('promptsData', () => {
  it('should return data only for horizontal', () => {
    // before
    const result = getDropAnchorsPosition(false, false);

    // result
    expect(result).toStrictEqual(['left', 'right']);
  });

  it('should return data only for vertical', () => {
    // before
    const result = getDropAnchorsPosition(true, false);

    // result
    expect(result).toStrictEqual(['bottom', 'top']);
  });

  it('should return data only all', () => {
    // before
    const result = getDropAnchorsPosition(true, true);

    // result
    expect(result).toStrictEqual(['left', 'right', 'bottom', 'top']);
  });
});
