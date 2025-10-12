import { renderHook } from '@testing-library/react';

// hooks
import { useMouseMoveEvent } from '../useMouseMoveEvent';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_3D, BASE_RECT } from 'shared/ZoomBox/constants';

// store
import { configureStore } from 'store';

// types
import { MouseButton } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getProviderWrapper } from 'test';

const mockCallBack = jest.fn();
const stateMock = {
  ...pageBuilderStateMock,
};

describe('useMouseMoveEvent', () => {
  it(`should trigger event default`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useMouseMoveEvent(BASE_3D, MouseMode.default, BASE_RECT, mockCallBack), {
      wrapper: getProviderWrapper(store),
    });

    // action
    result.current({ buttons: MouseButton.lmb } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
