// utils
import { limitZoom } from '../handleZoom';

describe('limitZoom', () => {
  it('should return max when value is over the limit', () => {
    // before
    const result = limitZoom(0.01);

    // result
    expect(result).toBe(0.1);
  });

  it('should return max when value is over the limit', () => {
    // before
    const result = limitZoom(4);

    // result
    expect(result).toBe(3);
  });
});
