import { renderHook } from '@testing-library/react';

// mocks
import { eventsMock, pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// hooks
import { useMouseLeaveEvent } from '../useMouseLeaveEvent';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store } from 'store';

// types
import { MouseMode } from 'types/enums/mouseMode';

const mockCallBack = jest.fn();
const stateMock = {
  ...pageBuilderStateMock,
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useMouseLeaveEvent', () => {
  beforeAll(() => {
    // mock
    window.store = store;
  });

  it(`should trigger event`, () => {
    // mock
    window.store.getState = (): any =>
      ({
        ...stateMock,
        [PAGE_BUILDER]: {
          ...stateMock[PAGE_BUILDER],
          events: {
            ...eventsMock,
            draggableElements: ['1'],
          },
        },
      }) as any;

    // before
    const { result } = renderHook(() => useMouseLeaveEvent(MouseMode.default, mockCallBack));

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(false);
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({
      isGridDropArea: false,
      possibleIndexPosition: null,
    });
  });

  it(`should not trigger event when empty selected elements`, () => {
    // mock
    window.store.getState = (): any =>
      ({
        ...stateMock,
        [PAGE_BUILDER]: {
          ...stateMock[PAGE_BUILDER],
          events: {
            ...eventsMock,
          },
        },
      }) as any;

    // before
    const { result } = renderHook(() => useMouseLeaveEvent(MouseMode.default, mockCallBack));

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it(`should not trigger when mouse mode is different`, () => {
    // mock
    window.store.getState = (): any =>
      ({
        ...stateMock,
        [PAGE_BUILDER]: {
          ...stateMock[PAGE_BUILDER],
          events: {
            ...eventsMock,
          },
        },
      }) as any;

    // before
    const { result } = renderHook(() => useMouseLeaveEvent(MouseMode.comment, mockCallBack));

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
