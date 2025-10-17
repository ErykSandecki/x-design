import { mapAttributes } from '../mapAttributes';

describe('mapAttributes', () => {
  it('should skip undefined and null values', () => {
    // before
    const result = mapAttributes({
      'data-a': undefined,
      'data-b': null,
      'data-c': 'ok',
    });

    // result
    expect(result).toEqual({ 'data-c': 'ok' });
  });

  it('should skip empty strings', () => {
    // before
    const result = mapAttributes({
      'data-a': '',
      'data-b': 'test',
    });

    // result
    expect(result).toEqual({ 'data-b': 'test' });
  });

  it('should add empty attribute for boolean true', () => {
    // before
    const result = mapAttributes({
      'data-active': true,
    });

    // result
    expect(result).toEqual({ 'data-active': '' });
  });

  it('should skip boolean false', () => {
    // before
    const result = mapAttributes({
      'data-disabled': false,
      'data-enabled': true,
    });

    // result
    expect(result).toEqual({ 'data-enabled': '' });
  });

  it('should convert numbers to strings', () => {
    // before
    const result = mapAttributes({
      'data-count': 123,
    });

    // result
    expect(result).toEqual({ 'data-count': '123' });
  });

  it('should handle mixed values correctly', () => {
    // before
    const result = mapAttributes({
      'data-a': true,
      'data-b': false,
      'data-c': '',
      'data-d': undefined,
      'data-e': null,
      'data-f': 42,
      'data-g': 'ok',
    });

    // result
    expect(result).toEqual({
      'data-a': '',
      'data-f': '42',
      'data-g': 'ok',
    });
  });

  it('should handle aria-* and data-* attributes', () => {
    // before
    const result = mapAttributes({
      'aria-hidden': true,
      'data-role': 'button',
    });

    // result
    expect(result).toEqual({
      'aria-hidden': '',
      'data-role': 'button',
    });
  });
});
