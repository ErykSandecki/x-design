import { renderHook } from '@testing-library/react';

// hooks
import { usePositionEvents } from '../usePositionEvents';

// mocks
import {
  elementMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

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
          allData: {
            ['-1']: {
              ...currentPage.elements.allData['-1'],
              children: [elementMock.id],
            },
            [elementMock.id]: elementMock,
          },
          dynamicData: {
            ['-1']: {
              ...currentPage.elements.dynamicData['-1'],
              children: [elementDynamicDataMock.id],
            },
            [elementDynamicDataMock.id]: elementDynamicDataMock,
          },
          staticData: {
            ['-1']: {
              ...currentPage.elements.staticData['-1'],
              children: [elementStaticDataMock.id],
            },
            [elementStaticDataMock.id]: elementStaticDataMock,
          },
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

describe('usePositionEvents', () => {
  it(`should return data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => usePositionEvents(), { wrapper: getProviderWrapper(store) });

    // result
    expect(result.current).toStrictEqual({
      disabledAll: false,
      disabledX: false,
      disabledY: false,
      firstElement: {
        id: 'test-1',
        parentId: '-1',
        position: 'absolute',
        type: 'frame',
      },
      hasAlignmentHorizontal: false,
      hasAlignmentVertical: false,
      isMultiple: false,
      onBlurX: expect.any(Function),
      onBlurY: expect.any(Function),
      onChangeX: expect.any(Function),
      onChangeY: expect.any(Function),
      onMouseDown: expect.any(Function),
      showConstrains: false,
      typeInputX: 'number',
      typeInputY: 'number',
      x: '0',
      y: '0',
    });
  });
});
