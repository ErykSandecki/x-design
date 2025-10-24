import { renderHook } from '@testing-library/react';

// hooks
import { useColumnAlignmentLayoutEvents } from '../useColumnAlignmentLayoutEvents';

// mocks
import { elementMock, layoutMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

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

describe('useColumnAlignmentLayoutEvents', () => {
  it(`should return data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useColumnAlignmentLayoutEvents(), { wrapper: getProviderWrapper(store) });

    // result
    expect(result.current).toStrictEqual({
      alignment: 'none',
      columnGap: '0',
      isFreeForm: true,
      isMixedBoxSizing: false,
      isMixedColumnGap: false,
      isMixedColumnRow: false,
      isMixedLayout: false,
      layout: layoutMock,
      onBlurColumnGap: expect.any(Function),
      onBlurRowGap: expect.any(Function),
      onChangeAlignment: expect.any(Function),
      onChangeColumnGap: expect.any(Function),
      onChangeRowGap: expect.any(Function),
      rowGap: '0',
      showColumnGap: false,
      showRowGap: false,
    });
  });
});
