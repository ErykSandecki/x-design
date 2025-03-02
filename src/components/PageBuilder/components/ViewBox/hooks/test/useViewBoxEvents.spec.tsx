import { renderHook } from '@testing-library/react';

// hooks
import { useViewBoxEvents } from '../useViewBoxEvents';

// others
import { BASE_3D } from 'shared/ZoomBox/constants';

// types
import { MouseMode } from 'components/PageBuilder/enums';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

describe('useViewBoxEvents', () => {
  it(`should return view box events and data`, () => {
    // before
    const { result } = renderHook(() =>
      useViewBoxEvents(BASE_3D, MouseMode.default, mockCallBack),
    );

    // result
    expect(result.current).toStrictEqual({
      frameArea: null,
      onMouseDown: expect.any(Function),
      onMouseMove: expect.any(Function),
      onMouseUp: expect.any(Function),
    });
  });
});
