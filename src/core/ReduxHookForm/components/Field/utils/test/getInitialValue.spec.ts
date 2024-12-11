// utils
import { getInitialValue } from '../getInitialValue';

describe('getInitialValue', () => {
  it('should return default value boolean=true', () => {
    // mock
    const defaultValue = true;
    const formatOnInit = undefined;
    const shouldBeEmpty = false;

    // before
    const result = getInitialValue(defaultValue, formatOnInit, shouldBeEmpty);

    // result
    expect(result).toBe(defaultValue);
  });

  it('should return init value boolean', () => {
    // mock
    const defaultValue = true;
    const formatOnInit = undefined;
    const shouldBeEmpty = true;

    // before
    const result = getInitialValue(defaultValue, formatOnInit, shouldBeEmpty);

    // result
    expect(result).toBe(false);
  });

  it('should return default value number=1', () => {
    // mock
    const defaultValue = 1;
    const formatOnInit = undefined;
    const shouldBeEmpty = false;

    // before
    const result = getInitialValue(defaultValue, formatOnInit, shouldBeEmpty);

    // result
    expect(result).toBe(defaultValue);
  });

  it('should return init value number', () => {
    // mock
    const defaultValue = 1;
    const formatOnInit = undefined;
    const shouldBeEmpty = true;

    // before
    const result = getInitialValue(defaultValue, formatOnInit, shouldBeEmpty);

    // result
    expect(result).toBe(0);
  });

  it('should return default value string="string"', () => {
    // mock
    const defaultValue = 'string';
    const formatOnInit = undefined;
    const shouldBeEmpty = false;

    // before
    const result = getInitialValue(defaultValue, formatOnInit, shouldBeEmpty);

    // result
    expect(result).toBe(defaultValue);
  });

  it('should return init value string', () => {
    // mock
    const defaultValue = 'string';
    const formatOnInit = undefined;
    const shouldBeEmpty = true;

    // before
    const result = getInitialValue(defaultValue, formatOnInit, shouldBeEmpty);

    // result
    expect(result).toBe('');
  });

  it('should return default value array<boolean>', () => {
    // mock
    const defaultValue = [true];
    const formatOnInit = undefined;
    const shouldBeEmpty = false;

    // before
    const result = getInitialValue(defaultValue, formatOnInit, shouldBeEmpty);

    // result
    expect(result).toStrictEqual(defaultValue);
  });

  it('should return init value array<boolean>', () => {
    // mock
    const defaultValue = [true];
    const formatOnInit = undefined;
    const shouldBeEmpty = true;

    // before
    const result = getInitialValue(defaultValue, formatOnInit, shouldBeEmpty);

    // result
    expect(result).toStrictEqual([false]);
  });

  it('should return default value array<string>', () => {
    // mock
    const defaultValue = ['string'];
    const formatOnInit = undefined;
    const shouldBeEmpty = false;

    // before
    const result = getInitialValue(defaultValue, formatOnInit, shouldBeEmpty);

    // result
    expect(result).toStrictEqual(defaultValue);
  });

  it('should return init value array<string>', () => {
    // mock
    const defaultValue = ['string'];
    const formatOnInit = undefined;
    const shouldBeEmpty = true;

    // before
    const result = getInitialValue(defaultValue, formatOnInit, shouldBeEmpty);

    // result
    expect(result).toStrictEqual(['']);
  });
});
