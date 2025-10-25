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
      alignItems: 'flex-end',
      boxSizing: 'content-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      rowGap: '0px',
    });
  });

  it(`should return for horizontal`, () => {
    // before
    const result = getLayout({ ...layoutMock, type: LayoutType.horizontal });

    // result
    expect(result).toStrictEqual({
      alignItems: 'flex-start',
      boxSizing: 'content-box',
      columnGap: '0px',
      display: 'flex',
      justifyContent: 'flex-end',
    });
  });

  it(`should return for horizontal`, () => {
    // before
    const result = getLayout({ ...layoutMock, type: LayoutType.grid });

    // result
    expect(result).toStrictEqual({
      alignContent: 'flex-start',
      boxSizing: 'content-box',
      columnGap: '0px',
      display: 'grid',
      justifyContent: 'flex-end',
      rowGap: '0px',
    });
  });
});
