import { renderHook } from '@testing-library/react';

// hooks
import { useMouseMoveEvent } from '../useMouseMoveEvent';

// others
import { BASE_3D, BASE_RECT } from 'shared/ZoomBox/constants';

// types
import { MouseButton } from 'types';
import { MouseMode } from 'components/PageBuilder/enums';

const mockCallBack = jest.fn();

describe('useMouseMoveEvent', () => {
  it(`should trigger event`, () => {
    // before
    const { result } = renderHook(() =>
      useMouseMoveEvent(BASE_3D, BASE_RECT, MouseMode.toolBeltA, mockCallBack),
    );

    // action
    result.current({ buttons: MouseButton.lmb } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
