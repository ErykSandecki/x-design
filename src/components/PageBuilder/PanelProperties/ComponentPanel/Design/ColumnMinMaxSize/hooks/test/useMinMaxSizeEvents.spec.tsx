import { renderHook } from '@testing-library/react';

// hooks
import { useMinMaxSizeEvents } from '../useMinMaxSizeEvents';

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

describe('useMinMaxSizeEvents', () => {
  it(`should return data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useMinMaxSizeEvents('max'), { wrapper: getProviderWrapper(store) });

    // result
    expect(result.current).toStrictEqual({
      attachedValueHeight: true,
      attachedValueWidth: true,
      height: '',
      heightScore: undefined,
      onBlurHeight: expect.any(Function),
      onBlurWidth: expect.any(Function),
      onChangeHeight: expect.any(Function),
      onChangeWidth: expect.any(Function),
      valueScrubbaleInputHeight: NaN,
      valueScrubbaleInputWidth: NaN,
      visibleHeight: false,
      visibleWidth: false,
      width: '',
      widthScore: undefined,
    });
  });
});
