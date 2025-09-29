import { fireEvent, renderHook } from '@testing-library/react';

// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';
import { wholeStateMock } from 'test/mocks/reducer/wholeStateMock';

// hooks
import { useMouseUpEvent } from '../useMouseUpEvent';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore, store as storeToMock } from 'store';

// utils
import { getProviderWrapper } from 'test';

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages[pageBuilderStateMock[PAGE_BUILDER].currentPage];
const mockCallBack = jest.fn();

const stateMock = {
  ...pageBuilderStateMock,
};

describe('useMouseMoveEvent', () => {
  beforeAll(() => {
    // mock
    storeToMock.getState = (): any =>
      ({
        ...wholeStateMock,
        [PAGE_BUILDER]: {
          ...pageBuilderStateMock[PAGE_BUILDER],
          pages: {
            ...pageBuilderStateMock[PAGE_BUILDER].pages,
            [currentPage.id]: {
              ...currentPage,
              elements: {
                ...currentPage.elements,
                [selectedElementMock.id]: {
                  ...elementMock,
                },
              },
            },
          },
        },
      }) as any;
  });

  it(`should trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(() => useMouseUpEvent(false, 'test-1', mockCallBack, mockCallBack, mockCallBack), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.mouseUp(window);

    // result
    expect(mockCallBack.mock.calls.length).toBe(3);
  });
});
