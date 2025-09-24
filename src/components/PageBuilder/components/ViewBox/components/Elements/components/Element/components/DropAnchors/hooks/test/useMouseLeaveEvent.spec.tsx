import { MouseEvent } from 'react';
import { renderHook } from '@testing-library/react';

// mocks
import {
  eventsMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// hooks
import { useMouseLeaveEvent } from '../useMouseLeaveEvent';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store as storeToMock } from 'store/store';

// types
import { MouseMode } from 'types/enums/mouseMode';

const mockCallBack = jest.fn();
const stateMock = {
  ...pageBuilderStateMock,
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

describe('useMouseLeaveEvent', () => {
  it(`should trigger event`, () => {
    // mock
    storeToMock.getState = () =>
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
    const { result } = renderHook(() =>
      useMouseLeaveEvent('1', MouseMode.default),
    );

    // action
    result.current({} as MouseEvent);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      possibleAnchorElementId: '-1',
      possibleAnchorPosition: null,
      possibleIndexPosition: null,
    });
  });

  it(`should not trigger event when empty selected elements`, () => {
    // mock
    storeToMock.getState = () =>
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
    const { result } = renderHook(() =>
      useMouseLeaveEvent('1', MouseMode.default),
    );

    // action
    result.current({} as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it(`should not trigger when mouse mode is different`, () => {
    // mock
    storeToMock.getState = () =>
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
    const { result } = renderHook(() =>
      useMouseLeaveEvent('1', MouseMode.comment),
    );

    // action
    result.current({} as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
