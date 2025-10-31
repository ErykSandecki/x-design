import { renderHook } from '@testing-library/react';

// hooks
import { useResizingEvents } from '../useResizingEvents';

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

describe('useResizingEvents', () => {
  it(`should return data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useResizingEvents(), { wrapper: getProviderWrapper(store) });

    // result
    expect(result.current).toStrictEqual({
      aspectRatio: false,
      attachedValueHeight: false,
      attachedValueWidth: false,
      element: elementMock,
      height: '100',
      isMixedHeight: false,
      isMixedWidth: false,
      onBlurHeight: expect.any(Function),
      onBlurWidth: expect.any(Function),
      onChangeHeight: expect.any(Function),
      onChangeWidth: expect.any(Function),
      valueScrubbaleInputHeight: 100,
      valueScrubbaleInputWidth: 100,
      visibleAspectRatioButton: true,
      width: '100',
    });
  });
});
