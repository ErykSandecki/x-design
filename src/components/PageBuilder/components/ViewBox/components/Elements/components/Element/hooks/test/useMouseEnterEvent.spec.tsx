import { MouseEvent } from 'react';
import { renderHook } from '@testing-library/react';

// mocks
import {
  eventsMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// hooks
import { useMouseEnterEvent } from '../useMouseEnterEvent';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store as storeToMock } from 'store/store';

// types
import { MouseMode } from 'components/PageBuilder/enums';

const mockCallBack = jest.fn();
const stateMock = {
  ...pageBuilderStateMock,
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

describe('useMouseEnterEvent', () => {
  it(`should select parent as possible to move`, () => {
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
      useMouseEnterEvent('1', false, MouseMode.default),
    );

    // action
    result.current({} as MouseEvent);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      hoverOnElement: '1',
      possibleParent: '1',
    });
  });

  it(`should trigger only hover on element`, () => {
    // mock
    storeToMock.getState = () =>
      ({
        ...stateMock,
        [PAGE_BUILDER]: {
          ...stateMock[PAGE_BUILDER],
          events: {
            ...eventsMock,
            draggableElements: [],
          },
        },
      }) as any;

    // before
    const { result } = renderHook(() =>
      useMouseEnterEvent('1', false, MouseMode.default),
    );

    // action
    result.current({} as MouseEvent);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      hoverOnElement: '1',
    });
  });

  it(`should not trigger event`, () => {
    // mock
    storeToMock.getState = () =>
      ({
        ...stateMock,
        [PAGE_BUILDER]: {
          ...stateMock[PAGE_BUILDER],
          events: {
            ...eventsMock,
            draggableElements: [],
          },
        },
      }) as any;

    // before
    const { result } = renderHook(() =>
      useMouseEnterEvent('1', false, MouseMode.comment),
    );

    // action
    result.current({} as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
