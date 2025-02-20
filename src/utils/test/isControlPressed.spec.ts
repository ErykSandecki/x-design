// utils
import { isControlPressed } from 'utils/isControlPressed';

describe('isControlPressed', () => {
  it('should be preesed for windows', () => {
    // before
    const result = isControlPressed({
      ctrlKey: true,
      metaKey: false,
    } as MouseEvent);

    // result
    expect(result).toBe(true);
  });

  it('should be preesed for macos', () => {
    // before
    const result = isControlPressed({
      ctrlKey: false,
      metaKey: true,
    } as MouseEvent);

    // result
    expect(result).toBe(true);
  });

  it('should not bre preesed', () => {
    // before
    const result = isControlPressed({
      ctrlKey: false,
      metaKey: false,
    } as MouseEvent);

    // result
    expect(result).toBe(false);
  });
});
