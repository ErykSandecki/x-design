// types
import { AlignmentLayout } from 'types';

// utils
import { getAlignmentLayout } from '../getAlignmentLayout';

describe('getAlignmentLayout', () => {
  it(`should return {bottomCenter}`, () => {
    // before
    const result = getAlignmentLayout(AlignmentLayout.bottomCenter);

    // result
    expect(result).toStrictEqual({
      alignItems: 'flex-end',
      justifyContent: 'center',
    });
  });

  it(`should return {bottomLeft}`, () => {
    // before
    const result = getAlignmentLayout(AlignmentLayout.bottomLeft);

    // result
    expect(result).toStrictEqual({
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
    });
  });

  it(`should return {bottomRight}`, () => {
    // before
    const result = getAlignmentLayout(AlignmentLayout.bottomRight);

    // result
    expect(result).toStrictEqual({
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    });
  });

  it(`should return {center}`, () => {
    // before
    const result = getAlignmentLayout(AlignmentLayout.center);

    // result
    expect(result).toStrictEqual({
      alignItems: 'center',
      justifyContent: 'center',
    });
  });

  it(`should return {left}`, () => {
    // before
    const result = getAlignmentLayout(AlignmentLayout.left);

    // result
    expect(result).toStrictEqual({
      alignItems: 'center',
      justifyContent: 'flex-start',
    });
  });

  it(`should return {right}`, () => {
    // before
    const result = getAlignmentLayout(AlignmentLayout.right);

    // result
    expect(result).toStrictEqual({
      alignItems: 'center',
      justifyContent: 'flex-end',
    });
  });

  it(`should return {topCenter}`, () => {
    // before
    const result = getAlignmentLayout(AlignmentLayout.topCenter);

    // result
    expect(result).toStrictEqual({
      alignItems: 'flex-start',
      justifyContent: 'center',
    });
  });

  it(`should return {topLeft}`, () => {
    // before
    const result = getAlignmentLayout(AlignmentLayout.topLeft);

    // result
    expect(result).toStrictEqual({
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    });
  });

  it(`should return {topRight}`, () => {
    // before
    const result = getAlignmentLayout(AlignmentLayout.topRight);

    // result
    expect(result).toStrictEqual({
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
    });
  });
});
