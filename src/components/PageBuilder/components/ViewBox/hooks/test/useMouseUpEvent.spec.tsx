import { renderHook } from '@testing-library/react';

// hooks
import { useMouseUpEvent } from '../useMouseUpEvent';

// others
import { BASE_RECT } from 'shared/ZoomBox/constants';

// types
import { MouseMode } from 'types/enums/mouseMode';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useMouseUpEvent', () => {
  it(`should trigger event`, () => {
    // before
    const { result } = renderHook(() =>
      useMouseUpEvent(
        BASE_RECT,
        MouseMode.toolBeltA,
        mockCallBack,
        mockCallBack,
        mockCallBack,
      ),
    );

    // action
    result.current({} as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(4);
  });
});
