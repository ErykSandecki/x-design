import { MouseEvent } from 'react';
import { renderHook } from '@testing-library/react';

// mocks
import { eventsMock, pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

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
  useDispatch: (): any => mockCallBack,
}));

describe('useMouseLeaveEvent', () => {
  it(`should select parent as possible to move`, () => {
    // mock
    storeToMock.getState = (): any =>
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
    const { result } = renderHook(() => useMouseLeaveEvent(MouseMode.default, '-1'));

    // action
    result.current({} as MouseEvent);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      hoverOnElement: '-1',
      possibleParent: '-1',
    });
  });

  it(`should not trigger only hover on elements`, () => {
    // mock
    storeToMock.getState = (): any =>
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
    const { result } = renderHook(() => useMouseLeaveEvent(MouseMode.default, '-1'));

    // action
    result.current({} as MouseEvent);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      hoverOnElement: '-1',
    });
  });

  it(`should not trigger event`, () => {
    // mock
    storeToMock.getState = (): any =>
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
    const { result } = renderHook(() => useMouseLeaveEvent(MouseMode.comment, '-1'));

    // action
    result.current({} as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
