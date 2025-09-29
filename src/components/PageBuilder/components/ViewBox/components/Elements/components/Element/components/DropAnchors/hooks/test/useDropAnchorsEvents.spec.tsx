import { renderHook } from '@testing-library/react';

// hooks
import { useDropAnchorsEvents } from '../useDropAnchorsEvents';

// mocks
import {
  elementMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  eventsMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store';

// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getProviderWrapper } from 'test';

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
const stateMock = {
  ...pageBuilderStateMock,
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    events: {
      ...eventsMock,
      possibleAnchorElementId: '1',
      possibleAnchorPosition: DropAnchorsPosition.top,
    },
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
            [elementMock.id]: {
              ...elementMock,
            },
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
            [elementStaticDataMock.id]: {
              ...elementStaticDataMock,
            },
          },
        },
      },
    },
  },
};

describe('useDropAnchorsEvents', () => {
  it(`should return view drop anchors events`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useDropAnchorsEvents('1', 0, MouseMode.default, '-1'), {
      wrapper: getProviderWrapper(store),
    });

    // result
    expect(result.current).toStrictEqual({
      anchorPos: DropAnchorsPosition.top,
      displayNextPrompt: false,
      displayPrevPrompt: true,
      isFlowVertical: true,
      isGrid: false,
      onMouseEnter: expect.any(Function),
      onMouseLeave: expect.any(Function),
    });
  });
});
