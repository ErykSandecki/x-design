import { renderHook } from '@testing-library/react';

// hooks
import { useInsetsEvents } from '../useInsetsEvents';

// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store';

// utils
import { getProviderWrapper } from 'test';

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
const stateMock = {
  ...pageBuilderStateMock,
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    pages: {
      ...pageBuilderStateMock[PAGE_BUILDER].pages,
      ['0']: {
        ...currentPage,
        elements: {
          ...currentPage.elements,
          ['-1']: {
            ...currentPage.elements['-1'],
            children: [elementMock.id],
          },
          [elementMock.id]: elementMock,
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

describe('useInsetsEvents', () => {
  it(`should return data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useInsetsEvents('padding'), { wrapper: getProviderWrapper(store) });

    // result
    expect(result.current).toStrictEqual({
      insetAll: {
        b: '0',
        l: '0',
        r: '0',
        t: '0',
      },
      insetLR: '0',
      insetTB: '0',
      isInsetModeMerged: true,
      isMixedInsetMode: {
        b: false,
        l: false,
        r: false,
        t: false,
      },
      isMixedInsetValue: {
        b: false,
        l: false,
        r: false,
        t: false,
      },
      isMixedLRMode: false,
      isMixedLRValue: false,
      isMixedTBMode: false,
      isMixedTBValue: false,
      onBlurInset: expect.any(Function),
      onBlurInsetLR: expect.any(Function),
      onBlurInsetTB: expect.any(Function),
      onChangeInset: expect.any(Function),
      onChangeInsetLR: expect.any(Function),
      onChangeInsetTB: expect.any(Function),
      setInsetMode: expect.any(Function),
    });
  });
});
