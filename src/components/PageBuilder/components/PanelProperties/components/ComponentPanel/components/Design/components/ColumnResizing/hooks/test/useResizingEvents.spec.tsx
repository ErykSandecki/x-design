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
      height: '100',
      inputHeightType: 'number',
      inputWidthType: 'number',
      isMixedHeight: false,
      isMixedWidth: false,
      isPureHeight: true,
      isPureWidth: true,
      onBlurHeight: expect.any(Function),
      onBlurWidth: expect.any(Function),
      onChangeHeight: expect.any(Function),
      onChangeWidth: expect.any(Function),
      onFocus: expect.any(Function),
      showHeightChip: undefined,
      showWidthChip: undefined,
      unitHeight: undefined,
      unitWidth: undefined,
      valueInputHeight: '100',
      valueInputWidth: '100',
      valueScrubbaleInputHeight: 100,
      valueScrubbaleInputWidth: 100,
      visibleAspectRatioButton: true,
      width: '100',
    });
  });
});
