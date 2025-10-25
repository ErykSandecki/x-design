import { renderHook } from '@testing-library/react';

// mocks
import { eventsMock, pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// hooks
import { useMouseEnterEvent } from '../useMouseEnterEvent';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store } from 'store/store';

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

describe('useMouseEnterEvent', () => {
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
    const { result } = renderHook(() => useMouseEnterEvent(0, MouseMode.default, '-1', mockCallBack));

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(true);
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({
      isGridDropArea: true,
      possibleIndexPosition: 0,
      possibleParent: '-1',
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
    const { result } = renderHook(() => useMouseEnterEvent(0, MouseMode.default, '-1', mockCallBack));

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
    const { result } = renderHook(() => useMouseEnterEvent(0, MouseMode.comment, '-1', mockCallBack));

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
