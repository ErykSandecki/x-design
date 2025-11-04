import { renderHook } from '@testing-library/react';

// hooks
import { useAppearanceEvents } from '../useAppearanceEvents';

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

describe('useAppearanceEvents', () => {
  it(`should return data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useAppearanceEvents(), { wrapper: getProviderWrapper(store) });

    // result
    expect(result.current).toStrictEqual({
      borderRadius: '0',
      borderRadiusMode: 'fixed',
      isMixedBorderRadius: false,
      isMixedOpacity: false,
      onBlurBorderRadius: expect.any(Function),
      onBlurOpacity: expect.any(Function),
      onChangeBorderRadius: expect.any(Function),
      onChangeOpacity: expect.any(Function),
      opacity: '100',
      opacityMode: 'fixed',
    });
  });
});
