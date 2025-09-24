// mocks
import { layoutMock } from 'test/mocks/reducer/pageBuilderMock';

// types
import { LayoutType } from 'types';

// utils
import { getLayout } from '../getLayout';

describe('getLayout', () => {
  it(`should return for default`, () => {
    // before
    const result = getLayout(layoutMock);

    // result
    expect(result).toStrictEqual({});
  });

  it(`should return for vertical`, () => {
    // before
    const result = getLayout({ ...layoutMock, type: LayoutType.vertical });

    // result
    expect(result).toStrictEqual({
      display: 'flex',
      flexDirection: 'column',
    });
  });

  it(`should return for horizontal`, () => {
    // before
    const result = getLayout({ ...layoutMock, type: LayoutType.horizontal });

    // result
    expect(result).toStrictEqual({
      display: 'flex',
    });
  });

  it(`should return for horizontal`, () => {
    // before
    const result = getLayout({ ...layoutMock, type: LayoutType.grid });

    // result
    expect(result).toStrictEqual({
      display: 'grid',
    });
  });
});
