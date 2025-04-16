import { fireEvent, renderHook } from '@testing-library/react';
import { RefObject } from 'react';

// hooks
import { useMouseMoveEvent } from '../useMouseMoveEvent';

// others
import { BASE_2D, BASE_3D } from 'shared/ZoomBox/constants';
import { CURSOR_STATES } from 'constant/constants';

// types
import { MouseButton, T2DCoordinates } from 'types';
import { MouseMode } from 'components/PageBuilder/enums';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  debounce: (callback: any) => (value: any) => callback(value),
}));

describe('useMouseMoveEvent', () => {
  it(`should trigger events`, () => {
    // before
    renderHook(() =>
      useMouseMoveEvent(
        BASE_3D,
        cursorPosition,
        CURSOR_STATES[4],
        [],
        MouseMode.default,
        mockCallBack,
        mockCallBack,
        mockCallBack,
      ),
    );

    // action
    fireEvent.mouseMove(window, {
      buttons: MouseButton.rmb,
      clientX: 0,
      clientY: 0,
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(3);
  });
});
